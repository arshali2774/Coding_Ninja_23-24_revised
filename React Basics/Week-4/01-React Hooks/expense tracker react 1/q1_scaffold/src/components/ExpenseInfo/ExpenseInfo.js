import React from 'react';
import styles from './ExpenseInfo.module.css';

const ExpenseInfo = ({ expenses }) => {
  const totalIncome = expenses
    .filter((expense) => expense.amount > 0)
    .reduce((acc, expense) => acc + expense.amount, 0);
  const totalExpense = expenses
    .filter((expense) => expense.amount < 0)
    .reduce((acc, expense) => acc + expense.amount, 0);
  console.log(totalIncome, totalExpense);

  const balance = totalIncome + totalExpense;
  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>${balance}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id='money-plus' className={`${styles.money} ${styles.plus}`}>
            +${totalIncome}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id='money-minus' className={`${styles.money} ${styles.minus}`}>
            -${totalExpense}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ExpenseInfo;
