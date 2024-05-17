import { useState, useReducer } from 'react';
import './App.css';

// components imports
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo/ExpenseInfo';
import ExpenseList from './components/ExpenseList/ExpenseList';

// react toasts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import firebase methods here
import { db } from './firebaseInit';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD_EXPENSE': {
      return {
        expenses: [payload.expense, ...state.expenses],
      };
    }
    case 'REMOVE_EXPENSE': {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };
    }
    case 'UPDATE_EXPENSE': {
      const expensesDuplicate = state.expenses;
      expensesDuplicate[payload.expensePos] = payload.expense;
      return {
        expenses: expensesDuplicate,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  const addExpense = async (expense) => {
    // add expense to firestore here
    try {
      const docRef = await addDoc(collection(db, 'expenses'), expense);
      dispatch({
        type: 'ADD_EXPENSE',
        // add the new document id to the payload expense object below
        payload: { expense: { ...expense, id: docRef.id } },
      });
      toast.success('Expense added successfully.');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: { id } });
  };

  const resetExpenseToUpdate = () => {
    setExpenseToUpdate(null);
  };

  const updateExpense = async (expense) => {
    try {
      // Find the index of the expense to be updated in the expenses array
      const expensePos = state.expenses.findIndex(
        (exp) => exp.id === expense.id
      );

      // If expensePos is -1, it means the expense was not found in the array
      if (expensePos === -1) {
        toast.error('Expense not found.');
        return;
      }

      // Update the expense in Firestore
      await setDoc(doc(db, 'expenses', expense.id), expense);

      // Dispatch the 'UPDATE_EXPENSE' action to update the local state
      dispatch({
        type: 'UPDATE_EXPENSE',
        payload: { expensePos, expense },
      });

      toast.success('Expense updated successfully.');
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Failed to update expense.');
    }
    // const expensePos = state.expenses
    //   .map(function (exp) {
    //     return exp.id;
    //   })
    //   .indexOf(expense.id);

    // if (expensePos === -1) {
    //   return false;
    // }

    // // update expense in firestore here

    // dispatch({ type: 'UPDATE_EXPENSE', payload: { expensePos, expense } });
    // toast.success('Expense updated successfully.');
  };

  return (
    <>
      <ToastContainer />
      <h2 className='mainHeading'>Expense Tracker</h2>
      <div className='App'>
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseToUpdate={resetExpenseToUpdate}
        />
        <div className='expenseContainer'>
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
