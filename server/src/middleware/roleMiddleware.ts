import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { AuthRequest } from '../types/authType';
import { getUserById } from '../helpers/data';

// Middleware to check if user has required role
export const requireRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      
      if (!authReq.user || !authReq.user.id) {
        return next(createHttpError(401, 'Unauthorized'));
      }

      const user = await getUserById(authReq.user.id);
      
      if (!user) {
        return next(createHttpError(404, 'User not found'));
      }

      if (!allowedRoles.includes(user.role)) {
        return next(createHttpError(403, 'Access denied. Insufficient permissions.'));
      }

      next();
    } catch (error) {
      console.log(error);
      return next(createHttpError(500, 'Error checking user permissions'));
    }
  };
};

// Specific role middlewares
export const requireCandidate = requireRole(['CANDIDATE']);
export const requireOrganisation = requireRole(['ORGANISATION']);
export const requireAnyRole = requireRole(['CANDIDATE', 'ORGANISATION']);