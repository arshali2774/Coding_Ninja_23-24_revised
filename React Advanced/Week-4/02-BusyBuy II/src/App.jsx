/* eslint-disable react/prop-types */
import Navbar from './components/Navbar';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useSelector } from 'react-redux';
import { authSelector } from './features/auth/authSlice';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector(authSelector);
  return currentUser ? children : <Navigate to='/' />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/cart',
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
        },
        {
          path: '/order',
          element: (
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          ),
        },
        {
          path: '/signin',
          element: <SignIn />,
        },
        { path: '/signup', element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
