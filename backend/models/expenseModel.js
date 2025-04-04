import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Food", "Transport", "Shopping", "Utilities", "Other"],
    required: true,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
