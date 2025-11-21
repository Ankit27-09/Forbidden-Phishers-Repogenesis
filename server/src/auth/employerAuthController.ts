import { NextFunction, Request, Response } from 'express';
import { prisma } from '../client';
import createHttpError from 'http-errors';
import {
  getEmployerByEmail,
  getEmployerById,
  getEmployerEmailVerificationToken,
  getEmployerEmailVerificationTokenById,
  getEmployerPasswordVerificationTokenById,
} from '../helpers/employerData';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/generateTokens';
import { generateVerificationToken } from '../helpers/generateVerificationToken';
import { AuthRequest } from '../types/authType';
import {
  sendEmployerPasswordResetEmail,
  sendEmployerVerificationEmail,
} from '../utils/sendEmail';
import pkg from 'jsonwebtoken';

const { verify } = pkg;

const employerSignup = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, organization, phone } = req.body;

  try {
    const existingEmployer = await prisma.employer.findUnique({
      where: {
        email,
      },
    });

    if (existingEmployer) {
      const error = createHttpError(400, 'Employer account already exists with this email');
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = await prisma.employer.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        organization,
        phone,
      },
    });

    if (newEmployer) {
      const verificationToken = generateVerificationToken();

      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24);

      await prisma.employerEmailVerificationToken.create({
        data: {
          employerId: newEmployer.id,
          token: verificationToken,
          expireAt: tokenExpiration,
        },
      });

      await sendEmployerVerificationEmail(newEmployer.email, verificationToken);
      res
        .status(200)
        .json({
          message: 'Sent verification email to employer',
          isVerified: false,
          success: true,
        });
      return;
    }

    return next(
      createHttpError(500, 'Unexpected error occurred while creating employer account')
    );
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, 'Error while processing your request'));
  }
};

const employerSignin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, organization } = req.body;

    const employer = await getEmployerByEmail(email);

    if (!employer) {
      res.status(404).json({ message: 'Employer account with this email not found' });
      return;
    }

    // Verify organization name matches
    if (employer.organization !== organization) {
      return next(createHttpError(400, 'Invalid credentials or organization name'));
    }

    if (!employer.emailVerified) {
      const existingToken = await getEmployerEmailVerificationTokenById(employer.id);

      if (existingToken) {
        await prisma.employerEmailVerificationToken.delete({
          where: { employerId: employer.id },
        });
      }

      const verificationToken = generateVerificationToken();

      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24);

      await prisma.employerEmailVerificationToken.create({
        data: {
          employerId: employer.id,
          token: verificationToken,
          expireAt: tokenExpiration,
        },
      });

      await sendEmployerVerificationEmail(employer.email, verificationToken);
      res
        .status(200)
        .json({
          message: 'Sent verification email',
          isVerified: false,
          success: true,
        });
      return;
    }

    if (!employer.password) {
      return next(createHttpError(400, 'Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, employer.password as string);

    if (!isMatch) {
      return next(createHttpError(400, 'Invalid credentials'));
    }

    const { accessToken, refreshToken } = generateTokens(employer.id);

    res.cookie('employerRefreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.json({ accessToken, isVerified: true, success: true });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error while processing your request'));
  }
};

const employerVerifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;

  try {
    const verificationToken = await getEmployerEmailVerificationToken(token);

    if (verificationToken) {
      const employer = await getEmployerById(verificationToken?.employerId);

      if (employer?.emailVerified) {
        res
          .status(200)
          .json({
            Code: 'ALREADY_VERIFIED',
            message: 'Email Already Verified',
            success: true,
          });
        return;
      }

      const now = new Date();
      if (now > verificationToken.expireAt) {
        return next(
          createHttpError(
            400,
            "We couldn't verify your email. The link may have expired or is invalid."
          )
        );
      }

      await prisma.employer.update({
        where: {
          id: verificationToken.employerId,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      res
        .status(200)
        .json({
          Code: 'VERIFIED',
          message: 'Email Verified Successfully',
          success: true,
        });
    } else {
      return next(
        createHttpError(
          400,
          "We couldn't verify your email. The link may have expired or is invalid."
        )
      );
    }
  } catch (err) {
    console.log(err);

    return next(
      createHttpError(400, 'Unknown error occurred during token verification.')
    );
  }
};

const employerGenerateResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const employer = await getEmployerByEmail(email);

    if (!employer) {
      res.status(200).json({ message: 'Email not registered' });
      return;
    }

    const existingToken = await getEmployerPasswordVerificationTokenById(employer.id);

    if (existingToken) {
      await prisma.employerPasswordResetToken.delete({
        where: {
          employerId: employer.id,
        },
      });
    }

    const resetToken = generateVerificationToken();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);

    await prisma.employerPasswordResetToken.create({
      data: {
        employerId: employer.id,
        token: resetToken,
        expireAt: tokenExpiration,
      },
    });

    await sendEmployerPasswordResetEmail(email, resetToken);
    res
      .status(200)
      .json({ message: 'Sent Password reset link to registered email.' });
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(400, 'An Unknown error occurred during password reset')
    );
  }
};

const employerResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const resetToken = await prisma.employerPasswordResetToken.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken) {
      return next(createHttpError(400, 'Invalid reset token'));
    }

    if (password !== confirmPassword) {
      return next(createHttpError(400, 'Password does not match'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.employer.update({
      where: {
        id: resetToken.employerId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.employerPasswordResetToken.update({
      where: {
        token,
      },
      data: {
        isUsed: true,
      },
    });

    res.status(200).json({ Code: 'RESET_SUCCESSFUL', success: true });
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(400, 'An Unknown error occurred during password reset.')
    );
  }
};

const employerVerifyResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  try {
    const resetToken = await prisma.employerPasswordResetToken.findUnique({
      where: {
        token,
      },
    });

    const now = new Date();

    if (!resetToken || now > resetToken.expireAt || resetToken.isUsed) {
      res.status(200).json({ Code: 'INVALID_TOKEN', success: true });
      return;
    }

    res.status(200).json({ Code: 'VALID_TOKEN', success: true });
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(
        400,
        'An Unknown error occurred during token verification.'
      )
    );
  }
};

const employerRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employerRefreshToken } = req.cookies;

    if (!employerRefreshToken) {
      return next(createHttpError(403, 'No refresh token provided'));
    }

    verify(
      employerRefreshToken,
      process.env.REFRESH_JWT_SECRET!,
      async (err: Error | null, decoded: any) => {
        if (err || !decoded) {
          return next(createHttpError(403, 'Invalid or expired refresh token'));
        }

        const employer = await getEmployerById(decoded.id);
        if (!employer) {
          return next(createHttpError(403, 'Employer not found'));
        }

        const { accessToken } = generateTokens(employer.id);

        res.json({ 
          accessToken, 
          employer: { 
            firstName: employer.firstName,
            lastName: employer.lastName,
            organization: employer.organization 
          }
        });
      }
    );
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error refreshing token'));
  }
};

export {
  employerSignup,
  employerSignin,
  employerVerifyEmail,
  employerGenerateResetToken,
  employerResetPassword,
  employerVerifyResetToken,
  employerRefreshToken,
};
