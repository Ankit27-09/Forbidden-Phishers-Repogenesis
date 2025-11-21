import { prisma } from '../client';

export const getEmployerByEmail = async (email: string) => {
  const employer = await prisma.employer.findUnique({
    where: {
      email,
    },
  });

  return employer;
};

export const getEmployerById = async (employerId: string) => {
  const employer = await prisma.employer.findUnique({
    where: {
      id: employerId,
    },
  });

  return employer;
};

export const getEmployerEmailVerificationToken = async (token: string) => {
  const verificationToken = await prisma.employerEmailVerificationToken.findUnique({
    where: {
      token,
    },
  });

  return verificationToken;
};

export const getEmployerEmailVerificationTokenById = async (employerId: string) => {
  const verificationToken = await prisma.employerEmailVerificationToken.findUnique({
    where: {
      employerId,
    },
  });

  return verificationToken;
};

export const getEmployerPasswordVerificationToken = async (token: string) => {
  const verificationToken = await prisma.employerPasswordResetToken.findUnique({
    where: {
      token,
    },
  });

  return verificationToken;
};

export const getEmployerPasswordVerificationTokenById = async (employerId: string) => {
  const verificationToken = await prisma.employerPasswordResetToken.findUnique({
    where: {
      employerId,
    },
  });

  return verificationToken;
};
