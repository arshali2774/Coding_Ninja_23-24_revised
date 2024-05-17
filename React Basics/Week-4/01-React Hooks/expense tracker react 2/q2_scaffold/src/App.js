import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo/ExpenseInfo';
import ExpenseList from './components/ExpenseList/ExpenseList';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Create function to add an expense
  const addExpense = (expenseText, expenseAmount) => {
    const newExpense = {
      id: expenses.length + 1,
      text: expenseText,
      amount: expenseAmount,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };
  // Create function to delete an expense
  const deleteExpense = (index) => {
    setExpenses((prevExpenses) => {
      // Filter out the expense with the given index
      const updatedExpenses = prevExpenses.filter((expense, i) => i !== index);
      return updatedExpenses;
    });
  };

  return (
    <>
      <h2 className='mainHeading'>Expense Tracker</h2>
      <div className='App'>
        <ExpenseForm addExpense={addExpense} />
        <div className='expenseContainer'>
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </>
  );
}

export default App;
