import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  CheckboxGroup,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useProductsContext } from '../context/productsContext';
import { useFilterContext } from '../context/filterContext';
import { useCartContext } from '../context/cartContext';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Home = () => {
  const { productsLoading, productsError } = useProductsContext();
  const { cartsLoading } = useCartContext();
  const {
    filteredProducts,
    updateFilters,
    filters: { text, price },
  } = useFilterContext();
  const { addToCart } = useCartContext();
  const { loading } = useAuthContext();
  return (
    <Box bgColor={'brand.darkPurple'} width={'100%'} flexGrow={1} p={'2rem'}>
      <HStack h={'full'}>
        <Box w={'250px'} h='full'>
          <Container display={'flex'} flexDirection={'column'} gap={'1rem'}>
            <Input
              variant={'filled'}
              placeholder='Search'
              _placeholder={{ color: 'brand.neutral' }}
              bgColor={'brand.violet'}
              color={'brand.neutral'}
              name='text'
              value={text}
              onChange={(e) => updateFilters(e, null)}
            />
            <Heading as={'h6'} size={'md'} color={'brand.neutral'}>
              Filters
            </Heading>

            <FormControl display={'flex'} flexDirection={'column'}>
              <FormLabel color={'brand.neutral'}>Price: ${price}</FormLabel>
              <Slider
                aria-label='slider-ex-2'
                colorScheme='pink'
                defaultValue={1000}
                max={1000}
                min={1}
                name='price'
                onChangeEnd={(val) => updateFilters(null, val)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <CheckboxGroup colorScheme='pink'>
              <VStack w={'full'}>
                <Checkbox
                  value="men's clothing"
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={(e) => updateFilters(e, null)}
                  name='mensClothing'
                >
                  Mens Clothing
                </Checkbox>
                <Checkbox
                  value="women's clothing"
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={(e) => updateFilters(e, null)}
                  name='womensClothing'
                >
                  Womens Clothing
                </Checkbox>
                <Checkbox
                  value='jewelery'
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={(e) => updateFilters(e, null)}
                  name='jewelery'
                >
                  Jewellry
                </Checkbox>
                <Checkbox
                  value='electronics'
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={(e) => updateFilters(e, null)}
                  name='electronics'
                >
                  Electronics
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </Container>
        </Box>
        <Box
          w={'full'}
          h={'calc(100vh - 81px - 4rem)'}
          overflow={'auto'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {productsLoading || loading ? (
            <Spinner color='brand.neutral' size={'xl'} thickness='5px' />
          ) : productsError ? (
            <Heading color={'brand.neutral'}>Error Fetching Products</Heading>
          ) : filteredProducts.length <= 0 ? (
            <Heading color={'brand.neutral'}>
              No products matches your search
            </Heading>
          ) : (
            <SimpleGrid
              minChildWidth='260px'
              spacing='30px'
              p={'1rem'}
              w={'full'}
              h={'full'}
            >
              {filteredProducts.map((pdt) => (
                <Card bg='brand.neutral' key={pdt.id}>
                  <CardBody>
                    <Image
                      src={pdt.image}
                      alt={pdt.title}
                      borderRadius='lg'
                      h={'300px'}
                      w={'full'}
                      objectFit={'contain'}
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md' noOfLines={2} color={'brand.black'}>
                        {pdt.title}
                      </Heading>
                      <Text noOfLines={3} color={'brand.black'}>
                        {pdt.description}
                      </Text>
                      <Text
                        color='brand.lightPurple'
                        fontWeight={'bold'}
                        fontSize='2xl'
                      >
                        ${pdt.price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='8'>
                      <Link to={'/cart'}>
                        <Button
                          variant='solid'
                          colorScheme='pink'
                          onClick={() => addToCart(pdt)}
                        >
                          Buy now
                        </Button>
                      </Link>

                      <Button
                        variant='ghost'
                        colorScheme='pink'
                        isLoading={cartsLoading}
                        loadingText={'Adding'}
                        onClick={() => addToCart(pdt)}
                      >
                        Add to cart
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </HStack>
    </Box>
  );
};
export default Home;
