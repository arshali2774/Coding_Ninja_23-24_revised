// Please don't change the pre-written code
// Import the necessary modules here

import { ErrorHandler } from '../../../utils/errorHandler.js';
import {
  addNewProductRepo,
  deleProductRepo,
  findProductRepo,
  getAllProductsRepo,
  getProductDetailsRepo,
  getTotalCountsOfProduct,
  updateProductRepo,
} from '../model/product.repository.js';
import ProductModel from '../model/product.schema.js';

export const addNewProduct = async (req, res, next) => {
  try {
    const product = await addNewProductRepo({
      ...req.body,
      createdBy: req.user._id,
    });
    if (product) {
      res.status(201).json({ success: true, product });
    } else {
      return next(new ErrorHandler(400, 'some error occured!'));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const {
      keyword,
      category,
      'price[gte]': minPrice,
      'price[lte]': maxPrice,
      'rating[gte]': minRating,
      'rating[lte]': maxRating,
      page,
      pageSize,
    } = req.query;

    // Construct query object for search
    const query = {};
    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }
    if (minRating !== undefined && maxRating !== undefined) {
      query.rating = { $gte: minRating, $lte: maxRating };
    } else if (minRating !== undefined) {
      query.rating = { $gte: minRating };
    } else if (maxRating !== undefined) {
      query.rating = { $lte: maxRating };
    }

    // Pagination
    const currentPage = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * limit;

    // Fetch products
    const products = await getAllProductsRepo(query, skip, limit);

    // Total count of products
    const totalProducts = await getTotalCountsOfProduct(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      products,
      totalPages,
      currentPage,
      totalProducts,
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await updateProductRepo(req.params.id, req.body);
    if (updatedProduct) {
      res.status(200).json({ success: true, updatedProduct });
    } else {
      return next(new ErrorHandler(400, 'Product not found!'));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await deleProductRepo(req.params.id);
    if (deletedProduct) {
      res.status(200).json({ success: true, deletedProduct });
    } else {
      return next(new ErrorHandler(400, 'Product not found!'));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const productDetails = await getProductDetailsRepo(req.params.id);
    if (productDetails) {
      res.status(200).json({ success: true, productDetails });
    } else {
      return next(new ErrorHandler(400, 'Product not found!'));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const rateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const user = req.user._id;
    const name = req.user.name;
    const review = {
      user,
      name,
      rating: Number(rating),
      comment,
    };
    if (!rating) {
      return next(new ErrorHandler(400, "rating can't be empty"));
    }
    const product = await findProductRepo(productId);
    if (!product) {
      return next(new ErrorHandler(400, 'Product not found!'));
    }
    const findRevieweIndex = product.reviews.findIndex((rev) => {
      return rev.user.toString() === user.toString();
    });
    if (findRevieweIndex >= 0) {
      product.reviews.splice(findRevieweIndex, 1, review);
    } else {
      product.reviews.push(review);
    }
    let avgRating = 0;
    product.reviews.forEach((rev) => {
      avgRating += rev.rating;
    });
    const updatedRatingOfProduct = avgRating / product.reviews.length;
    product.rating = updatedRatingOfProduct;
    await product.save({ validateBeforeSave: false });
    res
      .status(201)
      .json({ success: true, msg: 'thx for rating the product', product });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const getAllReviewsOfAProduct = async (req, res, next) => {
  try {
    const product = await findProductRepo(req.params.id);
    if (!product) {
      return next(new ErrorHandler(400, 'Product not found!'));
    }
    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const deleteReview = async (req, res, next) => {
  // Insert the essential code into this controller wherever necessary to resolve issues related to removing reviews and updating product ratings.
  try {
    const { productId, reviewId } = req.query;
    if (!productId || !reviewId) {
      return next(
        new ErrorHandler(
          400,
          'pls provide productId and reviewId as query params'
        )
      );
    }
    const product = await findProductRepo(productId);
    if (!product) {
      return next(new ErrorHandler(400, 'Product not found!'));
    }
    const reviews = product.reviews;

    const isReviewExistIndex = reviews.findIndex((rev) => {
      return rev._id.toString() === reviewId.toString();
    });
    if (isReviewExistIndex < 0) {
      return next(new ErrorHandler(400, "review doesn't exist"));
    }

    const reviewToBeDeleted = reviews[isReviewExistIndex];
    const loggedInUserId = req.user._id.toString();
    // Check if the logged-in user is the owner of the review
    if (reviewToBeDeleted.user.toString() !== loggedInUserId) {
      return next(
        new ErrorHandler(403, 'You are not authorized to delete this review')
      );
    }
    reviews.splice(isReviewExistIndex, 1);
    // Update the product's rating
    let totalRating = 0;
    reviews.forEach((rev) => {
      totalRating += rev.rating;
    });
    product.rating = totalRating / reviews.length || 0;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      msg: 'review deleted successfully',
      deletedReview: reviewToBeDeleted,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};
