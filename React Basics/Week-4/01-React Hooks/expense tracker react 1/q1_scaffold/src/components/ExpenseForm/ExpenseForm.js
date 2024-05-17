import React from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = ({ setExpenses, expenses }) => {
  const handleformSubmit = (e) => {
    e.preventDefault();
    const expenseText = e.target.expenseText.value;
    const expenseAmount = Number(e.target.expenseAmount.value);
    const newExpense = {
      id: expenses.length + 1,
      text: expenseText,
      amount: expenseAmount,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    e.target.expenseText.value = '';
    e.target.expenseAmount.value = '';
  };
  return (
    <form className={styles.form} onSubmit={handleformSubmit}>
      <h3>Add new transaction</h3>
      <label htmlFor='expenseText'>Text</label>
      <input
        id='expenseText'
        className={styles.input}
        type='text'
        placeholder='Enter text...'
        required
        name='expenseText'
      />
      <div>
        <label htmlFor='expenseAmount'>Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id='expenseAmount'
        type='number'
        placeholder='Enter amount...'
        required
        name='expenseAmount'
      />
      <button className={styles.submitBtn}>Add Transaction</button>
    </form>
  );
};
export default ExpenseForm;
