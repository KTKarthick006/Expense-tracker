import Budget from "../models/budgetModel.js";

// Create Budget
export const createBudget = async (req, res) => {
  const { amount, category, startDate, endDate } = req.body;
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    const budget = new Budget({ userId, amount, category, startDate, endDate });
    await budget.save();
    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating budget", error: error.message });
  }
};

// Get All Budgets for the User
export const getBudgets = async (req, res) => {
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    const budgets = await Budget.find({ userId });
    res.status(200).json(budgets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching budgets", error: error.message });
  }
};

// Update Budget
export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, category, startDate, endDate } = req.body;
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId },
      { amount, category, startDate, endDate },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating budget", error: error.message });
  }
};

// Delete Budget
export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    const budget = await Budget.findOneAndDelete({ _id: id, userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting budget", error: error.message });
  }
};
