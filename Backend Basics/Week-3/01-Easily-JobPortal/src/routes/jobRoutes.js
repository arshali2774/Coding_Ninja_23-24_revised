import express from 'express';
import JobsModel from '../model/jobs.model.js';
import {
  validate,
  validateApplicant,
  validateJob,
} from '../middleware/validation.middleware.js';
import moment from 'moment';
import upload from '../middleware/multer.middleware.js';
import ApplicantsModel from '../model/applicant.model.js';

const router = express.Router();

router.get('/', (req, res) => {
  const userName = req.session?.userName;

  res.render('jobs', { AllJobs: JobsModel.getJobs(), userName });
});

// Create a new job listing
router.post('/', validateJob, validate, (req, res) => {
  // Implement logic to create a new job listing
  const {
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    numberOfOpenings,
    skills,
    applyBy,
  } = req.body;
  const currentDate = moment();
  const date = currentDate.format('DD MMMM YYYY');
  const time = currentDate.format('h:mm:ss A');
  let active = true;
  const currentApplicants = 0;
  const jobPosted = [date, time];
  JobsModel.add(
    active,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    skills,
    applyBy,
    numberOfOpenings,
    currentApplicants,
    jobPosted
  );
  res.redirect('/jobs');
});

// Retrieve a specific job listing by ID
router.get('/:id', (req, res) => {
  // Implement logic to retrieve a specific job listing by ID
  const userName = req.session?.userName;
  const id = Number(req.params.id);
  const jobDetails = JobsModel.getJobDetails(id);
  res.render('jobsSingle', { jobDetails: jobDetails, userName });
});

// Update a specific job listing by ID
router.put('/:id', (req, res) => {
  // Implement logic to update a specific job listing by ID
  const jobId = req.params.id;
  const updatedJobData = req.body; // Assuming updated job data is sent in the request body
  // Update job listing in database
  JobsModel.updateJob(jobId, updatedJobData);
  // Send response
  res.sendStatus(204); // No content - successful updat
});

// Delete a specific job listing by ID
router.delete('/:id', (req, res) => {
  // Implement logic to delete a specific job listing by ID
  const id = Number(req.params.id);
  JobsModel.deleteJob(id);
  res.sendStatus(204);
});

// Retrieve all applicants for a specific job listing
router.get('/:id/applicants', (req, res) => {
  // Implement logic to retrieve all applicants for a specific job listing
  const id = Number(req.params.id);
  const applicants = JobsModel.getApplicants(id);
  res.json(applicants);
});

// Add a new applicant to a specific job listing
router.post(
  '/:id/applicants',
  upload.single('resume'),
  validateApplicant,
  validate,
  (req, res) => {
    // Implement logic to add a new applicant to a specific job listing
    const id = Number(req.params.id);
    const { name, email, contact } = req.body;
    const { path } = req.file;
    JobsModel.addApplicantToJob(id, { name, email, contact, resumePath: path });
    res.redirect('/jobs');
  }
);

// Retrieve a specific applicant by ID for a job listing
router.get('/:id/applicants/:applicantId', (req, res) => {
  // Implement logic to retrieve a specific applicant by ID for a job listing
  const id = Number(req.params.id);
  const applicantId = Number(req.params.applicantId);
  res.json(JobsModel.getApplicantById(id, applicantId));
});

// Update a specific applicant by ID for a job listing
router.put('/:id/applicants/:applicantId', (req, res) => {
  // Implement logic to update a specific applicant by ID for a job listing
});

// Delete a specific applicant by ID for a job listing
router.delete('/:id/applicants/:applicantId', (req, res) => {
  // Implement logic to delete a specific applicant by ID for a job listing
});

// Render the update form for a specific job listing
router.get('/:id/update', (req, res) => {
  // Implement logic to render the update form for a specific job listing
  const userName = req.session.userName;
  const id = Number(req.params.id);
  const {
    companyName,
    jobCategory,
    jobDesignation,
    jobLocation,
    salary,
    skills,
    applyBy,
    numberOfOpenings,
  } = JobsModel.getJobDetails(id);
  res.render('jobsUpdate', {
    userName,
    id,
    companyName,
    jobCategory,
    jobDesignation,
    jobLocation,
    salary,
    skills,
    applyBy,
    numberOfOpenings,
  });
});

// Update a specific job listing by ID
router.post('/:id/update', (req, res) => {
  // Implement logic to update a specific job listing by ID
  const updatedData = req.body;
  const id = Number(req.params.id);
  JobsModel.updateJob(id, updatedData);
  res.redirect(`/jobs/${id}`);
});

// Delete a specific job listing by ID
router.get('/:id/delete', (req, res) => {
  // Implement logic to delete a specific job listing by ID
  const id = Number(req.params.id);
  JobsModel.deleteJob(id);
  res.redirect('/jobs');
});

export default router;
