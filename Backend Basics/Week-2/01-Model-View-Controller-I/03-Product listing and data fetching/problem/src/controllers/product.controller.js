// Please don't change the pre-written code
// Import the necessary modules here

import ProductModel from '../models/product.model.js';

export default class ProductController {
  // Initialize ProductModel instance
  constructor() {
    this.productModel = new ProductModel();
  }
  getProducts = (req, res) => {
    //  Write your code here
    // Fetch products data from the model
    const products = this.productModel.fetchProducts();
    // Respond with the fetched product data
    res.render('product', { products });
  };
}
