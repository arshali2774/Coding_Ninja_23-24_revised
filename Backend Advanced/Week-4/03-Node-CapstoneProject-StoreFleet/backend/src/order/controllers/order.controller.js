// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from '../model/order.repository.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    // Set the "paidAt" field to the current date and time
    const paidAt = new Date();

    // Calculate the deliveredAt date as one week (7 days) after the paidAt date
    const deliveredAt = new Date(paidAt.getTime() + 7 * 24 * 60 * 60 * 1000);

    const orderData = {
      shippingInfo: req.body.shippingInfo,
      orderedItems: req.body.orderedItems,
      user: req.user._id,
      paymentInfo: req.body.paymentInfo,
      paidAt,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,

      deliveredAt,
    };

    const newOrder = await createNewOrderRepo(orderData);

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
