// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here

import { fetchAllProducts, rateProductModel } from '../model/product.model.js';

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: 'getOneProduct working' });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: 'addProduct working' });
};
export const rateProduct = (req, res, next) => {
  // Write your code here
  const userID = Number(req.query.userID);
  const productID = Number(req.query.productID);
  const rating = Number(req.query.rating);
  try {
    if (userID && productID && rating) {
      const product = rateProductModel(productID, userID, rating);
      return res.status(200).json({ success: true, product });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
