import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import expenseRoutes from "../routes/expenseRoutes.js";

dotenv.config();
const port = process.env.PORT ;


const app = express();
app.use(express.json());
app.use("/api/expenses", expenseRoutes);


// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  connectDB();
});
