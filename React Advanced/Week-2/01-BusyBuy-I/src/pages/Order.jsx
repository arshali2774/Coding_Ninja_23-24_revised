import {
  Box,
  Heading,
  Spinner,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useOrderContext } from '../context/orderContext';

const Order = () => {
  const { orders, ordersLoading, ordersError } = useOrderContext();
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
      {ordersLoading ? (
        <Spinner color='brand.neutral' size={'xl'} thickness='5px' />
      ) : ordersError ? (
        <Heading color={'brand.neutral'}>Error Fetching Order</Heading>
      ) : orders.length <= 0 ? (
        <Heading color={'brand.neutral'}>No Orders Yet!</Heading>
      ) : (
        <VStack
          divider={<StackDivider borderColor='brand.lightPurple' />}
          spacing={4}
          h={'calc(100vh - 81px - 4rem)'}
          overflowY={'auto'}
          w={'full'}
          px={'18rem'}
        >
          {orders.map((o) => (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={'2rem'}
              key={o.timestamp}
              bgColor={'brand.lightPurple'}
              w='full'
              borderRadius={'10px'}
              p={'1rem'}
            >
              <Heading color={'brand.neutral'} size={'lg'}>
                {o.date}
              </Heading>
              <TableContainer>
                <Table variant='simple' color={'brand.neutral'}>
                  <Thead>
                    <Tr>
                      <Th color={'brand.black'}>Title</Th>
                      <Th isNumeric color={'brand.black'}>
                        Price
                      </Th>
                      <Th isNumeric color={'brand.black'}>
                        Quantity
                      </Th>
                      <Th isNumeric color={'brand.black'}>
                        Total Price
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {o.items.map((i) => (
                      <Tr key={i.cartItemId}>
                        <Td>{i.title}</Td>
                        <Td isNumeric>${i.price.toFixed(2)}</Td>
                        <Td isNumeric>{i.quantity}</Td>
                        <Td isNumeric>${(i.price * i.quantity).toFixed(2)}</Td>
                      </Tr>
                    ))}
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td isNumeric>${o.totalAmount.toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};
export default Order;
