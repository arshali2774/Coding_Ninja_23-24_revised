import ProductModel from './product.schema.js';

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (query, skip, limit) => {
  return await ProductModel.find(query).skip(skip).limit(limit);
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async (query) => {
  return await ProductModel.countDocuments(query);
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
