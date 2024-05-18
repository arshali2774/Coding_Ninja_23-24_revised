import './styles.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { List } from './pages/List';
import { Contact } from './pages/Contact';
import { ItemDetails } from './pages/ItemDetails';
import { NotFound } from './pages/NotFound';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // create high-level protected route below
  // Higher-order component for protected routes
  function ProtectedRoute({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to='/' />;
  }
  // protect the routes for the contact, list and item details pages
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home loggedIn={isLoggedIn} setLoggedin={setIsLoggedIn} />,
        },
        {
          path: '/contact',
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: '/list',
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Outlet /> {/* Placeholder for nested routes */}
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <List />,
            },
            {
              path: ':itemId',
              element: <ItemDetails />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}
