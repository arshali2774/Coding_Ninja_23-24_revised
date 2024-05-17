import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    const { title, amount, date, isRecurring, tags } = req.body;
    console.log(title, amount, date, isRecurring, tags);

    const expenseToCreate = new ExpenseModel(
      title,
      amount,
      date,
      isRecurring,
      tags
    );

    try {
      await this.expenseRepository.addExpense(expenseToCreate);
      res.status(201).send(expenseToCreate);
    } catch (err) {
      console.log("expense err is", err);
      res.status(500).send("Error creating expense.");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await this.expenseRepository.getOne(id);

      if (!expense) {
        res.status(404).send("Expense not found.");
      } else {
        res.status(200).send(expense);
      }
    } catch (err) {
      res.status(500).send("Error retrieving expense.");
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      res.status(200).send(expenses);
    } catch (err) {
      res.status(500).send("Error retrieving expenses.");
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;

    try {
      await this.expenseRepository.addTagToExpense(id, tag);
      res.status(200).send("Tag added successfully.");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding tag to expense.");
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.filterExpenses(req.query);
      res.status(200).send(expenses);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error filtering expenses.");
    }
  };

  // -----------Above is previous code-------------

  // Update an expense's tag
  updateTag = async (req, res) => {
    try {
      const { id } = req.params;
      const { oldTag, newTag } = req.body;
      await this.expenseRepository.updateTagInExpense(id, oldTag, newTag);
      res.status(200).send("Tag updated successfully.");
    } catch (error) {
      res.status(500).send("Error updating tag.");
    }
  };

  // Delete a tag from an expense
  deleteTag = async (req, res) => {
    try {
      const { id } = req.params;
      const { tag } = req.query;
      console.log(id, tag);
      await this.expenseRepository.deleteTagFromExpense(id, tag);
      res.status(200).send("Tag deleted successfully.");
    } catch (error) {
      res.status(500).send("Error deleting tag.");
    }
  };
}
