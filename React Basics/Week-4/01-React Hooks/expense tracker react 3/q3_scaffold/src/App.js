import { useReducer, useState } from 'react';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo/ExpenseInfo';
import ExpenseList from './components/ExpenseList/ExpenseList';
import './App.css';

function App() {
  // Remove the useState hook and replace it with useReducer hook
  // Implement the functionality to add and remove the transaction in reducer function
  // const [expenses, setExpenses] = useState([]);
  const expenseReducer = (state, action) => {
    switch (action.type) {
      case 'addExpense':
        return [action.expense, ...state];
      case 'deleteExpense':
        return state.filter((expense) => expense.id !== action.index);
      default:
        return [];
    }
  };
  const [expense, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expense) => {
    dispatch({ type: 'addExpense', expense });
  };
  // Create function to delete an expense
  const deleteExpense = (index) => {
    dispatch({ type: 'deleteExpense', index });
  };

  return (
    <>
      <h2 className='mainHeading'>Expense Tracker</h2>
      <div className='App'>
        <ExpenseForm addExpense={addExpense} />
        <div className='expenseContainer'>
          <ExpenseInfo expenses={expense} />
          <ExpenseList expenses={expense} deleteExpense={deleteExpense} />
        </div>
      </div>
    </>
  );
}

export default App;
