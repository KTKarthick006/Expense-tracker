import Expense from "../models/expenseModel.js";
import nodemailer from "nodemailer";

// Generate Monthly Report and Send Email
export const generateMonthlyReport = async (req, res) => {
  const userId = req.session.user.id;
  const email = req.session.user.email;

  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const reportContent = `
      <h1>Monthly Expense Report</h1>
      <p>Total Expenses: $${totalExpenses}</p>
      <ul>${expenses
        .map((e) => `<li>${e.title}: $${e.amount}</li>`)
        .join("")}</ul>
    `;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Monthly Expense Report",
      html: reportContent,
    });

    res
      .status(200)
      .json({ message: "Report generated and emailed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
};
