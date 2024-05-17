// Please don't change the pre-written code
// Import the necessary modules here

import { ObjectId } from 'mongodb';
import { getClient, getDB } from '../../config/mongodb.js';

const collectionName = 'students';

class studentRepository {
  async addStudent(studentData) {
    const db = getDB();
    await db.collection(collectionName).insertOne(studentData);
  }

  async getAllStudents() {
    const db = getDB();
    const students = await db.collection(collectionName).find({}).toArray();
    return students;
  }

  //You need to implement methods below:
  // Start Writing your code
  async createIndexes() {
    try {
      const db = getDB();
      const collection = db.collection(collectionName);
      await collection.createIndex({ name: 1 });
      await collection.createIndex({ age: 1, grade: -1 });
    } catch (error) {
      console.log(error);
    }
  }

  async getStudentsWithAverageScore() {
    try {
      const db = getDB();
      const collection = db.collection(collectionName);
      const pipeline = [
        {
          $unwind: '$assignments',
        },
        {
          $group: {
            _id: '$name',
            averageScore: { $avg: '$assignments.score' },
          },
        },
        {
          $project: {
            name: '$_id', // Rename _id to name
            averageScore: 1, // Include averageScore
            _id: 0, // Exclude _id
          },
        },
      ];
      const result = await collection.aggregate(pipeline).toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getQualifiedStudentsCount() {
    try {
      const db = getDB();
      const collection = db.collection(collectionName);
      const pipeline = [
        {
          $match: {
            age: { $gt: 9 }, // Age greater than 9
            grade: { $lte: 'B' }, // Grade less than or equal to 'B'
            'assignments.title': 'Math', // Assignment titled 'Math'
            'assignments.score': { $gte: 60 }, // Score of 60 or higher
          },
        },
        {
          $count: 'count', // Count the matching documents
        },
      ];
      const result = await collection.aggregate(pipeline).toArray();

      return result.length > 0 ? result[0].count : 0;
    } catch (error) {
      console.log(error);
    }
  }

  async updateStudentGrade(studentId, extraCreditPoints) {
    const db = getDB();
    const client = getClient();
    const session = client.startSession();
    try {
      session.startTransaction();
      const collection = db.collection(collectionName);
      const student = await collection.findOne({ _id: studentId });
      let totalScore = 0;
      student.assignments.forEach((assignment) => {
        totalScore += assignment.score;
      });
      totalScore += extraCreditPoints;
      const averageScoreWithExtraCredit =
        totalScore / student.assignments.length;
      let grade;
      if (averageScoreWithExtraCredit >= 90) {
        grade = 'A';
      } else if (averageScoreWithExtraCredit >= 80) {
        grade = 'B';
      } else if (averageScoreWithExtraCredit >= 70) {
        grade = 'C';
      } else if (averageScoreWithExtraCredit >= 60) {
        grade = 'D';
      } else {
        grade = 'F';
      }
      await collection.updateOne(
        { _id: studentId },
        { $set: { grade: grade } },
        { session }
      );
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      throw new Error(error);
    }
  }
}

export default studentRepository;
