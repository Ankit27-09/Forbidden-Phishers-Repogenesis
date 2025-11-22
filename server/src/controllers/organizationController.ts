import { NextFunction, Response, Request } from 'express';
import { prisma } from '../client';
import createHttpError from 'http-errors';
import { AuthRequest } from '../types/authType';
import { z } from 'zod';

// Validation schemas
const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  jobType: z.enum(['in-office', 'remote', 'hybrid']),
  location: z.string().min(1, 'Location is required'),
  skills: z.string().min(1, 'Skills are required'),
  description: z.string().min(1, 'Description is required').max(2500, 'Description must be less than 2500 characters'),
  ctc: z.string().min(1, 'CTC is required'),
  openings: z.number().int().min(1, 'At least 1 opening is required')
});

const internshipSchema = z.object({
  title: z.string().min(1, 'Internship title is required'),
  jobType: z.enum(['in-office', 'remote', 'hybrid']),
  location: z.string().min(1, 'Location is required'),
  skills: z.string().min(1, 'Skills are required'),
  description: z.string().min(1, 'Description is required').max(2500, 'Description must be less than 2500 characters'),
  stipend: z.string().min(1, 'Stipend is required'),
  duration: z.enum(['1-month', '2-months', '3-months', '6-months']),
  openings: z.number().int().min(1, 'At least 1 opening is required')
});

// Helper function to map frontend job types to database enum
const mapJobTypeToEnum = (jobType: string) => {
  const mapping = {
    'in-office': 'IN_OFFICE',
    'remote': 'REMOTE',
    'hybrid': 'HYBRID'
  } as const;
  return mapping[jobType as keyof typeof mapping];
};

// Job Controllers
const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const validatedData = jobSchema.parse(req.body);
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    // Verify user is an organization
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.role !== 'ORGANISATION') {
      const error = createHttpError(403, 'Only organizations can post jobs');
      return next(error);
    }

    // Transform the data for Prisma
    const jobData = {
      ...validatedData,
      jobType: mapJobTypeToEnum(validatedData.jobType),
      organisationId: userId
    };

    const job = await prisma.job.create({
      data: jobData,
      include: {
        organisation: {
          select: {
            id: true,
            organization: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = createHttpError(400, 'Validation failed', {
        details: error.issues
      });
      return next(validationError);
    }
    next(error);
  }
};

const createInternship = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const validatedData = internshipSchema.parse(req.body);
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    // Verify user is an organization
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.role !== 'ORGANISATION') {
      const error = createHttpError(403, 'Only organizations can post internships');
      return next(error);
    }

    // Transform the data for Prisma
    const internshipData = {
      ...validatedData,
      jobType: mapJobTypeToEnum(validatedData.jobType),
      organisationId: userId
    };

    const internship = await prisma.internship.create({
      data: internshipData,
      include: {
        organisation: {
          select: {
            id: true,
            organization: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Internship posted successfully',
      data: internship
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = createHttpError(400, 'Validation failed', {
        details: error.issues
      });
      return next(validationError);
    }
    next(error);
  }
};

const getOrganizationJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const jobs = await prisma.job.findMany({
      where: { 
        organisationId: userId,
        isActive: true 
      },
      include: {
        applications: {
          include: {
            candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Add computed fields for frontend
    const jobsWithStats = jobs.map(job => ({
      ...job,
      applicants: job._count.applications,
      shortlisted: job.applications.filter(app => app.status === 'SHORTLISTED').length,
      postedDate: job.createdAt
    }));

    res.json({
      success: true,
      data: jobsWithStats
    });
  } catch (error) {
    next(error);
  }
};

const getOrganizationInternships = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const internships = await prisma.internship.findMany({
      where: { 
        organisationId: userId,
        isActive: true 
      },
      include: {
        applications: {
          include: {
            candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Add computed fields for frontend
    const internshipsWithStats = internships.map(internship => ({
      ...internship,
      applicants: internship._count.applications,
      shortlisted: internship.applications.filter(app => app.status === 'SHORTLISTED').length,
      postedDate: internship.createdAt
    }));

    res.json({
      success: true,
      data: internshipsWithStats
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const { id } = req.params;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const job = await prisma.job.findFirst({
      where: { 
        id,
        organisationId: userId 
      },
      include: {
        applications: {
          include: {
            candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
              }
            }
          }
        },
        organisation: {
          select: {
            id: true,
            organization: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!job) {
      const error = createHttpError(404, 'Job not found');
      return next(error);
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const getInternshipById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const { id } = req.params;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const internship = await prisma.internship.findFirst({
      where: { 
        id,
        organisationId: userId 
      },
      include: {
        applications: {
          include: {
            candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
              }
            }
          }
        },
        organisation: {
          select: {
            id: true,
            organization: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!internship) {
      const error = createHttpError(404, 'Internship not found');
      return next(error);
    }

    res.json({
      success: true,
      data: internship
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const { id } = req.params;
    const validatedData = jobSchema.parse(req.body);
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const existingJob = await prisma.job.findFirst({
      where: { 
        id,
        organisationId: userId 
      }
    });

    if (!existingJob) {
      const error = createHttpError(404, 'Job not found');
      return next(error);
    }

    // Transform the data for Prisma
    const jobData = {
      ...validatedData,
      jobType: mapJobTypeToEnum(validatedData.jobType)
    };

    const updatedJob = await prisma.job.update({
      where: { id },
      data: jobData,
      include: {
        organisation: {
          select: {
            id: true,
            organization: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = createHttpError(400, 'Validation failed', {
        details: error.issues
      });
      return next(validationError);
    }
    next(error);
  }
};

const updateInternship = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const { id } = req.params;
    const validatedData = internshipSchema.parse(req.body);
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const existingInternship = await prisma.internship.findFirst({
      where: { 
        id,
        organisationId: userId 
      }
    });

    if (!existingInternship) {
      const error = createHttpError(404, 'Internship not found');
      return next(error);
    }

    // Transform the data for Prisma
    const internshipData = {
      ...validatedData,
      jobType: mapJobTypeToEnum(validatedData.jobType)
    };

    const updatedInternship = await prisma.internship.update({
      where: { id },
      data: internshipData,
      include: {
        organisation: {
          select: {
            id: true,
            organization: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Internship updated successfully',
      data: updatedInternship
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = createHttpError(400, 'Validation failed', {
        details: error.issues
      });
      return next(validationError);
    }
    next(error);
  }
};

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const { id } = req.params;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const existingJob = await prisma.job.findFirst({
      where: { 
        id,
        organisationId: userId 
      }
    });

    if (!existingJob) {
      const error = createHttpError(404, 'Job not found');
      return next(error);
    }

    // Soft delete by setting isActive to false
    await prisma.job.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const deleteInternship = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const { id } = req.params;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const existingInternship = await prisma.internship.findFirst({
      where: { 
        id,
        organisationId: userId 
      }
    });

    if (!existingInternship) {
      const error = createHttpError(404, 'Internship not found');
      return next(error);
    }

    // Soft delete by setting isActive to false
    await prisma.internship.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get all jobs and internships combined for the active jobs page
const getActiveJobsAndInternships = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;
    const userId = _req.user?.id;

    if (!userId) {
      const error = createHttpError(401, 'User not authenticated');
      return next(error);
    }

    const [jobs, internships] = await Promise.all([
      prisma.job.findMany({
        where: { 
          organisationId: userId,
          isActive: true 
        },
        include: {
          _count: {
            select: {
              applications: true
            }
          },
          applications: {
            where: {
              status: 'SHORTLISTED'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.internship.findMany({
        where: { 
          organisationId: userId,
          isActive: true 
        },
        include: {
          _count: {
            select: {
              applications: true
            }
          },
          applications: {
            where: {
              status: 'SHORTLISTED'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);

    // Format data for the ActiveJobs component
    const formattedJobs = jobs.map(job => ({
      id: job.id,
      title: job.title,
      type: 'Job' as const,
      location: job.location,
      applicants: job._count.applications,
      shortlisted: job.applications.length,
      postedDate: formatPostedDate(job.createdAt)
    }));

    const formattedInternships = internships.map(internship => ({
      id: internship.id,
      title: internship.title,
      type: 'Internship' as const,
      location: internship.location,
      applicants: internship._count.applications,
      shortlisted: internship.applications.length,
      postedDate: formatPostedDate(internship.createdAt)
    }));

    const activePositions = [...formattedJobs, ...formattedInternships]
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

    res.json({
      success: true,
      data: activePositions
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to format posted date
const formatPostedDate = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return '1 day ago';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 14) {
    return '1 week ago';
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} weeks ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
};

export {
  createJob,
  createInternship,
  getOrganizationJobs,
  getOrganizationInternships,
  getJobById,
  getInternshipById,
  updateJob,
  updateInternship,
  deleteJob,
  deleteInternship,
  getActiveJobsAndInternships
};