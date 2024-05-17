// Please don't change the pre-written code
// Import the necessary modules here

import ProductModel from '../models/ProductModel.js';

const productModel = new ProductModel();
export default class productController {
  index = (req, res) => {
    res.render('index', { products: productModel.getAllProducts() });
  };

  search = (req, res) => {
    // Write your code here
    const { name } = req.body;
    console.log(name);
    const filteredProduct = productModel
      .getAllProducts()
      .filter((pdt) => pdt.name === name);
    res.render('index', { products: filteredProduct });
  };
}
