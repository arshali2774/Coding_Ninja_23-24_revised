import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Heading,
  Image,
  Spinner,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCartContext } from '../context/cartContext';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    updateQuantity,
    totalItems,
    totalAmount,
    cartsLoading,
    cartsError,
    removeCartItem,
    addOrder,
  } = useCartContext();
  return (
    <Box
      bgColor={'brand.darkPurple'}
      width={'100%'}
      flexGrow={1}
      p={'2rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {cartsLoading ? (
        <Spinner color='brand.neutral' size={'xl'} thickness='5px' />
      ) : cartsError ? (
        <Heading color={'brand.neutral'}>Error Fetching Cart</Heading>
      ) : cart.length <= 0 ? (
        <Heading color={'brand.neutral'}>Cart Is Empty!</Heading>
      ) : (
        <Box w={'full'}>
          <VStack
            divider={<StackDivider borderColor='brand.lightPurple' />}
            spacing={4}
            align='stretch'
            overflow={'auto'}
            h={'calc(100vh - 81px - 12rem)'}
            px={'5rem'}
          >
            {cart.map((c) => (
              <Box
                minH='150px'
                bg='brand.neutral'
                key={c.cartItemId}
                borderRadius={'10px'}
                p={'1rem'}
              >
                <HStack h={'full'}>
                  <Image
                    src={c.image}
                    alt={c.title}
                    borderRadius='lg'
                    h={'full'}
                    w={'100px'}
                    objectFit={'contain'}
                    objectPosition={'left'}
                  />
                  <Box>
                    <Heading
                      as={'h6'}
                      size={'s'}
                      alignSelf={'flex-start'}
                      noOfLines={2}
                      maxWidth={'400px'}
                    >
                      {c.title}
                    </Heading>
                    <Stat color={'brand.lightPurple'}>
                      <StatLabel>Price</StatLabel>
                      <StatNumber>${c.price.toFixed(2)}</StatNumber>
                    </Stat>
                  </Box>

                  <ButtonGroup
                    ml={'auto'}
                    colorScheme='pink'
                    alignItems={'center'}
                    spacing={4}
                  >
                    <Button
                      p={0}
                      borderRadius={'50%'}
                      size={'md'}
                      onClick={() =>
                        updateQuantity(c.cartItemId, c.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </Button>

                    <Text fontSize={'xl'} color={'brand.black'}>
                      {c.quantity}
                    </Text>
                    <Button
                      p={0}
                      borderRadius={'50%'}
                      size={'md'}
                      onClick={() =>
                        updateQuantity(c.cartItemId, c.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </Button>
                    <Divider
                      orientation='vertical'
                      borderColor='brand.lightPurple'
                      h={'50px'}
                    />
                    <Button
                      colorScheme='red'
                      onClick={() => removeCartItem(c.cartItemId)}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                </HStack>
              </Box>
            ))}
          </VStack>
          <HStack mt={'2rem'} px={'20rem'}>
            <Stat color={'brand.neutral'}>
              <StatLabel>Total Price</StatLabel>
              <StatNumber>${totalAmount.toFixed(2)}</StatNumber>
              <StatHelpText>Total Items: {totalItems}</StatHelpText>
            </Stat>
            <Divider borderColor={'brand.lightPurple'} />
            <Link to={'/order'}>
              <Button colorScheme='pink' onClick={() => addOrder(cart)}>
                Purchase
              </Button>
            </Link>
          </HStack>
        </Box>
      )}
    </Box>
  );
};
export default Cart;
