import { Button, HStack, Heading, IconButton, VStack } from '@chakra-ui/react';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingBag as ShoppingBagIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../features/auth/authSlice';
import { logoutUser } from '../features/auth/authThunk';
const Navbar = () => {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector(authSelector);
  // when clicked on a logout button handle the logout functionality
  const handleLogout = async () => {
    dispatch(logoutUser());
    if (!currentUser && !error) {
      toast.success('User logged out successfully');
    } else if (error) {
      toast.error('Error logging out user');
    }
  };
  return (
    <VStack spacing={0} height={'100vh'}>
      <HStack
        bgColor={'brand.violet'}
        width={'100%'}
        height={'81px'}
        px={'4rem'}
      >
        <IconButton mr={'1rem'} colorScheme='pink' icon={<StoreIcon />} />
        <Heading as={'h5'} flexGrow={1} color={'white'} pb={'8px'}>
          Busy Buy
        </Heading>
        <HStack spacing={8}>
          <NavLink to={'/'}>
            {({ isActive }) =>
              isActive ? (
                <Button leftIcon={<HomeIcon />} colorScheme='pink'>
                  Home
                </Button>
              ) : (
                <Button
                  leftIcon={<HomeIcon />}
                  colorScheme='pink'
                  variant={'ghost'}
                >
                  Home
                </Button>
              )
            }
          </NavLink>
          {currentUser && (
            <>
              {' '}
              <NavLink to={'/order'}>
                {({ isActive }) =>
                  isActive ? (
                    <Button leftIcon={<ShoppingBagIcon />} colorScheme='pink'>
                      Order
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<ShoppingBagIcon />}
                      colorScheme='pink'
                      variant={'ghost'}
                    >
                      Order
                    </Button>
                  )
                }
              </NavLink>
              <NavLink to={'/cart'}>
                {({ isActive }) =>
                  isActive ? (
                    <Button leftIcon={<ShoppingCartIcon />} colorScheme='pink'>
                      Cart
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<ShoppingCartIcon />}
                      colorScheme='pink'
                      variant={'ghost'}
                    >
                      Cart
                    </Button>
                  )
                }
              </NavLink>
            </>
          )}
          {currentUser ? (
            <Button
              leftIcon={<LogoutIcon />}
              colorScheme='pink'
              variant={'ghost'}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <NavLink to={'/signin'}>
              {({ isActive }) =>
                isActive ? (
                  <Button leftIcon={<LoginIcon />} colorScheme='pink'>
                    Login
                  </Button>
                ) : (
                  <Button
                    leftIcon={<LoginIcon />}
                    colorScheme='pink'
                    variant={'ghost'}
                  >
                    Login
                  </Button>
                )
              }
            </NavLink>
          )}
        </HStack>
      </HStack>
      <Outlet />
    </VStack>
  );
};
export default Navbar;
