# Title: Job Portal

# Introduction + Scenario:

In the context of a job portal development project, your role as a developer involves enhancing several core features. This project focuses on the job-related functionalities and introduces a 'like' system for both jobs and user profiles.

# Objectives:

1. Job Schema:

a. Create a schema for jobs in the "src/features/jobs/schema" directory.
Fields:
title (string, mandatory): This field should store the job title.
description (string, mandatory): This field is for the job description.
company (string, mandatory): Use this field to store the name of the company posting the job.
salary (number, mandatory): Store the job's salary in this field.
applicants (ObjectID reference to 'User', mandatory): This field links to applicants as references in the 'User' collection. 2. Application Schema:

b. Create a schema for recording job applications in the same "src/features/jobs/schema" directory.
Fields:
jobId (ObjectID reference to 'Job', mandatory): Store the job the applicant is applying for.
userId (ObjectID reference to 'User', mandatory): Identify the applicant. 3. Like Schema:

c. Create a schema to record likes, allowing users to express interest in both jobs and user profiles.
Fields:
user (mongoose ObjectId, mandatory): Reference 'User' to identify the user who likes.
likeable (mongoose ObjectId, mandatory): Reference the item being liked.
on_model (string, mandatory): Specify whether the like is for a 'User' or a 'Job'. 4. Controllers for Job Feature:

2. Job Controllers:
   a. Implement the following controllers for the job feature and their corresponding repository functions or create custom functions:
   postJob: Responsible for creating new job posts. This functionality is exclusively available to users of type 'recruiter.' 5. Controller for Job Applications:

   b. Implement the 'applyJob' controller, enabling users of all types (e.g., "student," "fresher," "experienced," and "recruiter") to apply for jobs. Ensure that users cannot apply for the same job multiple times, and provide appropriate error messages. 6. Controllers for Like Feature:

   c. Implement controllers for the like feature, enabling users to:
   like: Like a job or the profile of another applicant.

   Good-to-Have Feature:
   getLikes: This feature enables the retrieval of likes for a specific job or user profile, ensuring that user data is accurately populated from MongoDB.

# Expected Output:

Video Link: https://drive.google.com/drive/folders/18qqnaJruHD1yTe-S-1R2utJWu7OlYFfz?usp=sharing

# Route and Query Parameters:

For liking a job, use the following route:

1. Route: POST /codingninjas/api/likes/like
   Query Parameters:
   model: Accepts only 'Job'.
   id: Should contain the ObjectID of the job to be liked.

2. For liking a user profile, use the following route:

Route: POST /codingninjas/api/likes/like
Query Parameters:
model: Accepts only 'User'.
id: Should contain the ObjectID of the user profile to be liked.

# Resources:

Consult the Mongoose documentation for schema creation.

# Notes/Hints:

1. Explore the implemented JWT authentication middleware for user identification and authentication.
2. Access the logged-in user's ObjectID from the req object for user identification.
3. Implement robust error handling mechanisms to prevent duplicate job applications.
4. Ensure that user data is populated correctly when fetching likes for jobs and user profiles.
