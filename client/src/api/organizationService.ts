import axiosInstance from '../config/axiosInstance';

// Job API endpoints
export const jobAPI = {
  // Create a new job posting
  createJob: async (jobData: {
    title: string;
    jobType: 'in-office' | 'remote' | 'hybrid';
    location: string;
    skills: string;
    description: string;
    ctc: string;
    openings: number;
  }) => {
    const response = await axiosInstance.post('/organisation/jobs', jobData);
    return response.data;
  },

  // Get all jobs for organization
  getOrganizationJobs: async () => {
    const response = await axiosInstance.get('/organisation/jobs');
    return response.data;
  },

  // Get specific job by ID
  getJobById: async (id: string) => {
    const response = await axiosInstance.get(`/organisation/jobs/${id}`);
    return response.data;
  },

  // Update job
  updateJob: async (id: string, jobData: {
    title: string;
    jobType: 'in-office' | 'remote' | 'hybrid';
    location: string;
    skills: string;
    description: string;
    ctc: string;
    openings: number;
  }) => {
    const response = await axiosInstance.put(`/organisation/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (id: string) => {
    const response = await axiosInstance.delete(`/organisation/jobs/${id}`);
    return response.data;
  }
};

// Internship API endpoints
const internshipAPI = {
  // Create a new internship posting
  createInternship: async (internshipData: {
    title: string;
    jobType: 'in-office' | 'remote' | 'hybrid';
    location: string;
    skills: string;
    description: string;
    stipend: string;
    duration: '1-month' | '2-months' | '3-months' | '6-months';
    openings: number;
  }) => {
    const response = await axiosInstance.post('/organisation/internships', internshipData);
    return response.data;
  },

  // Get all internships for organization
  getOrganizationInternships: async () => {
    const response = await axiosInstance.get('/organisation/internships');
    return response.data;
  },

  // Get specific internship by ID
  getInternshipById: async (id: string) => {
    const response = await axiosInstance.get(`/organisation/internships/${id}`);
    return response.data;
  },

  // Update internship
  updateInternship: async (id: string, internshipData: {
    title: string;
    jobType: 'in-office' | 'remote' | 'hybrid';
    location: string;
    skills: string;
    description: string;
    stipend: string;
    duration: '1-month' | '2-months' | '3-months' | '6-months';
    openings: number;
  }) => {
    const response = await axiosInstance.put(`/organisation/internships/${id}`, internshipData);
    return response.data;
  },

  // Delete internship
  deleteInternship: async (id: string) => {
    const response = await axiosInstance.delete(`/organisation/internships/${id}`);
    return response.data;
  }
};

// Combined API for active jobs and internships
const activePositionsAPI = {
  // Get all active jobs and internships
  getActivePositions: async () => {
    const response = await axiosInstance.get('/organisation/active-positions');
    return response.data;
  }
};

// Export all APIs
export { jobAPI as default, internshipAPI, activePositionsAPI };