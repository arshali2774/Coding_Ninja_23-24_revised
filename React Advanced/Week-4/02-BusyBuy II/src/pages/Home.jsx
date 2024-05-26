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

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterProducts,
  productSelector,
  updateFilter,
} from '../features/product/productSlice';
import { useEffect } from 'react';
import { addToCartThunk } from '../features/cart/cartThunk';

const Home = () => {
  const {
    productsLoading,
    productsError,
    filteredProducts,
    filters: {
      text,
      price,
      mensClothing,
      womensClothing,
      jewelery,
      electronics,
    },
  } = useSelector(productSelector);

  const dispatch = useDispatch();

  const updateFilters = (e) => {
    if (e?.target?.name === undefined) {
      dispatch(updateFilter({ name: 'price', value: e }));
    } else if (e.target.name === 'text') {
      dispatch(updateFilter({ name: e.target.name, value: e.target.value }));
    } else {
      dispatch(updateFilter({ name: e.target.name, value: e.target.checked }));
    }
  };
  useEffect(() => {
    dispatch(filterProducts());
  }, [
    text,
    price,
    mensClothing,
    womensClothing,
    jewelery,
    electronics,
    dispatch,
  ]);

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
              onChange={updateFilters}
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
                onChangeEnd={updateFilters}
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
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={updateFilters}
                  name='mensClothing'
                >
                  Mens Clothing
                </Checkbox>
                <Checkbox
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={updateFilters}
                  name='womensClothing'
                >
                  Womens Clothing
                </Checkbox>
                <Checkbox
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={updateFilters}
                  name='jewelery'
                >
                  Jewellry
                </Checkbox>
                <Checkbox
                  w={'full'}
                  color={'brand.neutral'}
                  onChange={updateFilters}
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
          {productsLoading ? (
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
                          onClick={() => dispatch(addToCartThunk(pdt))}
                        >
                          Buy now
                        </Button>
                      </Link>
                      <Button
                        variant='ghost'
                        colorScheme='pink'
                        onClick={() => dispatch(addToCartThunk(pdt))}
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
