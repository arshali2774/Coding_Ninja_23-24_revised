import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../features/auth/authSlice';
import { signUpUser } from '../features/auth/authThunk';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector(authSelector);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpUser({ name, email, password }));
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
        <Heading color='brand.neutral'>Sign Up</Heading>
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
            placeholder='Name'
            variant={'filled'}
            bg={'brand.violet'}
            color={'brand.black'}
            _placeholder={'brand.neutral'}
            required
            type='text'
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='Email'
            variant={'filled'}
            bg={'brand.violet'}
            color={'brand.black'}
            _placeholder={'brand.neutral'}
            required
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Password'
            variant={'filled'}
            bg={'brand.violet'}
            color={'brand.black'}
            _placeholder={'brand.neutral'}
            required
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            colorScheme='pink'
            type='submit'
            disabled={loading}
            isLoading={loading}
            loadingText={'Signing Up'}
          >
            Sign Up
          </Button>
        </form>
        <Link to={'/signin'}>
          <Button variant={'ghost'} colorScheme='pink' color={'brand.violet'}>
            Already Registered? Sign In Instead
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};
export default SignUp;
