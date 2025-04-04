import Expense from "../models/expenseModel.js";

//  Add Expense
export const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const userId = req.session.user.id;

  try {
    const expense = new Expense({ userId, title, amount, category, date });
    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

// Get All Expenses
export const getExpenses = async (req, res) => {
  const userId = req.session.user.id;

  try {
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

// Filter Expenses
export const filterExpenses = async (req, res) => {
  const { category, startDate, endDate } = req.query;
  const userId = req.session.user.id;

  try {
    const filter = { userId };
    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const expenses = await Expense.find(filter);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error filtering expenses", error });
  }
};
