import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../features/auth/authThunk';
import { authSelector } from '../features/auth/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector(authSelector);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };
  useEffect(() => {
    if (!loading && !error && currentUser) {
      navigate('/');
      toast.success('User logged in successfully');
    } else if (error) {
      toast.error('Error logging in user');
    }
  }, [loading, error, navigate, currentUser]);
  return (
    <Box
      bgColor={'brand.darkPurple'}
      width={'full'}
      flexGrow={1}
      p={'2rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <VStack
        bgColor={'brand.lightPurple'}
        borderRadius={'20px'}
        w={'500px'}
        spacing={'2rem'}
        p={'3rem'}
      >
        <Heading color='brand.neutral'>Sign In</Heading>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
          }}
        >
          <Input
            placeholder='Email'
            variant={'filled'}
            bg={'brand.violet'}
            color={'brand.black'}
            _placeholder={'brand.neutral'}
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Password'
            variant={'filled'}
            bg={'brand.violet'}
            color={'brand.black'}
            _placeholder={'brand.neutral'}
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            colorScheme='pink'
            type='submit'
            disabled={loading}
            isLoading={loading}
            loadingText='Signing In'
          >
            Sign In
          </Button>
        </form>
        <Link to={'/signup'}>
          <Button variant={'ghost'} colorScheme='pink' color={'brand.violet'}>
            Sign Up Instead
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};
export default SignIn;
