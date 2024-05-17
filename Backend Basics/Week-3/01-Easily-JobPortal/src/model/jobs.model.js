import ApplicantsModel from './applicant.model.js';

export default class JobsModel {
  constructor(
    id,
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
  ) {
    this.id = id;
    this.active = active;
    this.companyName = companyName;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.salary = salary;
    this.skills = skills;
    this.applyBy = applyBy;
    this.numberOfOpenings = numberOfOpenings;
    this.currentApplicants = currentApplicants;
    this.jobPosted = jobPosted;
  }

  static add(
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
  ) {
    const newJob = new JobsModel(
      jobs.length + 1,
      active,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      skills,
      applyBy,
      numberOfOpenings,
      [],
      jobPosted
    );
    console.log(newJob);
    jobs.push(newJob);
  }
  static getJobs() {
    return jobs;
  }
  static getJobDetails(id) {
    return jobs.find((job) => job.id === id);
  }
  static updateJob(id, updatedData) {
    const jobToUpdate = jobs.find((job) => job.id === id);
    if (!jobToUpdate) {
      throw new Error('Job not found');
    }
    Object.assign(jobToUpdate, updatedData);
    return jobToUpdate;
  }
  static deleteJob(id) {
    console.log(id);
    const indexToDelete = jobs.findIndex((job) => job.id === id);
    if (indexToDelete === -1) {
      throw new Error('Job not found');
    }

    const deletedJob = jobs.splice(indexToDelete, 1)[0];

    return deletedJob;
  }

  static addApplicantToJob(jobId, applicantData) {
    const jobToUpdate = jobs.find((job) => job.id === jobId);
    if (!jobToUpdate) {
      throw new Error('Job not found');
    }
    const { name, email, contact, resumePath } = applicantData;
    const applicantId = Date.now();
    applicantData.id = applicantId;
    ApplicantsModel.add(applicantId, name, email, contact, resumePath);

    jobToUpdate.currentApplicants.push(applicantData);
    return jobToUpdate;
  }
  static getApplicants(jobId) {
    const jobToFind = jobs.find((job) => job.id === jobId);
    if (!jobToFind) {
      throw new Error('Job not found');
    }
    return jobToFind.currentApplicants;
  }
  static getApplicantById(jobId, applicantId) {
    const jobToFind = jobs.find((job) => job.id === jobId);
    if (!jobToFind) {
      throw new Error('Job not found');
    }
    const applicantToFind = jobToFind.currentApplicants.find(
      (applicant) => applicant.id === applicantId
    );
    if (!applicantToFind) {
      throw new Error('Applicant not found');
    }
    return applicantToFind;
  }
}

var jobs = [
  {
    id: 1,
    active: true,
    companyName: 'Coding Ninja',
    jobCategory: 'Tech',
    jobDesignation: 'SDE',
    jobLocation: 'Gurgaon HR IND Remote',
    salary: '14-20 lpa',
    skills: ['ReactJS', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
    applyBy: '30 Aug 2023',
    numberOfOpenings: 5,
    currentApplicants: [],
    jobPosted: ['4/12/2023', '2:32:33 AM'],
  },
  {
    id: 2,
    active: true,
    companyName: 'Go Digit',
    jobCategory: 'Tech',
    jobDesignation: 'Angular Developer',
    jobLocation: 'Pune IND On-Site',
    salary: '6-10 lpa',
    skills: ['AngularJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
    applyBy: '30 Aug 2023',
    numberOfOpenings: 7,
    currentApplicants: [],
    jobPosted: ['4/12/2023', '2:32:33 AM'],
  },
  {
    id: 3,
    active: false,
    companyName: 'Juspay',
    jobCategory: 'Tech',
    jobDesignation: 'SDE',
    jobLocation: 'Banglore IND',
    salary: '20-26 lpa',
    skills: ['AngularJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
    applyBy: '30 Aug 2023',
    numberOfOpenings: 3,
    currentApplicants: [],
    jobPosted: ['4/12/2023', '2:32:33 AM'],
  },
];
