// Please don't change the pre-written code
// Import the necessary modules here

import { getAllUsers } from '../../user/model/user.model.js';

let id = 3;
const products = [
  { id: 1, name: 'iphone', price: 100000 },
  { id: 2, name: 'oneplus', price: 50000 },
  { id: 3, name: 'samsung', price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

export const rateProductModel = (productId, userId, rating) => {
  // Write your code here
  if (rating < 0 || rating > 5) {
    throw new Error('rating should be b/w 0 and 5');
  }
  const user = getAllUsers().find((u) => u.id === userId);
  if (!user) {
    throw new Error('user not found');
  }
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error('product not found');
  }
  if (!product.ratings) {
    product.ratings = [];
    product.ratings.push({ userId, rating });
  } else {
    const index = product.ratings.findIndex((r) => r.userId === userId);
    if (index >= 0) {
      product.ratings[index] = { userId, rating };
    } else {
      product.ratings.push({ userId, rating });
    }
  }
  return product;
};
