import express from "express";
import expenseRouter from "./src/features/expense/expense.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/expenses", expenseRouter);

export default app;
