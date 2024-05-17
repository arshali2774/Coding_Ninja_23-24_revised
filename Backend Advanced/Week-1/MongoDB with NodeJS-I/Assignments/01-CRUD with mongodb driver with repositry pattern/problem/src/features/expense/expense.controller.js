import ExpenseRepository from './expense.repository.js';

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const newExpense = req.body; // Assuming request body contains the new expense
      const addedExpense = await this.expenseRepository.addExpense(newExpense);
      res.status(201).json(addedExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const expenseId = req.params.id; // Assuming expense ID is passed as a parameter
      const expense = await this.expenseRepository.getOne(expenseId);
      if (!expense) {
        res.status(404).json({ message: 'Expense not found' });
      } else {
        res.status(200).json(expense);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const expenseId = Number(req.params.id); // Assuming expense ID is passed as a parameter
      const tag = req.body.tag; // Assuming tag to be added is sent in the request body
      const success = await this.expenseRepository.addTagToExpense(
        expenseId,
        tag
      );
      if (success) {
        res.status(200).json({ message: 'Tag added successfully' });
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const { minAmount, maxAmount, isRecurring } = req.query;
      // Prepare filter criteria based on query parameters
      const criteria = {};
      if (minAmount !== undefined) {
        criteria.amount = { $gte: parseFloat(minAmount) };
      }
      if (maxAmount !== undefined) {
        criteria.amount = { ...criteria.amount, $lte: parseFloat(maxAmount) };
      }
      if (isRecurring !== undefined) {
        criteria.isRecurring = isRecurring.toLowerCase() === 'true';
      }
      // If no filter criteria provided, return all expenses
      if (Object.keys(criteria).length === 0) {
        const allExpenses = await this.expenseRepository.getAllExpenses();
        return res.status(200).json(allExpenses);
      }
      // Filter expenses based on the criteria
      const filteredExpenses = await this.expenseRepository.filterExpenses(
        criteria
      );
      res.status(200).json(filteredExpenses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
}
