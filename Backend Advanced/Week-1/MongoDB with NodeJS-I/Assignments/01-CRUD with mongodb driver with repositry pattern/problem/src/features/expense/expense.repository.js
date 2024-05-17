import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';
class ExpenseRepository {
  constructor() {
    this.collectionName = 'expenses'; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      await collection.insertOne(expense);
      return expense;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const expense = await collection.findOne({ _id: new ObjectId(id) });
      return expense;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const expenses = await collection.find({}).toArray();
      return expenses;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      await collection.updateOne({ _id: id }, { $addToSet: { tags: tag } });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const expenses = await collection.find(criteria).toArray();
      return expenses;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default ExpenseRepository;
