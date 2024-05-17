import './App.css';
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseInfo from './components/ExpenseInfo/ExpenseInfo';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <h2 className='mainHeading'>Expense Tracker</h2>
      <div className='App'>
        {/* Render expense form here */}
        <ExpenseForm setExpenses={setExpenses} expenses={expenses} />
        <div className='expenseContainer'>
          {/* Render Expense Info here
            Render Expense List here */}
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </>
  );
};
export default App;
