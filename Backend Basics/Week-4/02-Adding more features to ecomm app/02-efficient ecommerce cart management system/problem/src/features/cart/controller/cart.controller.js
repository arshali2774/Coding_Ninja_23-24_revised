// Please don't change the pre-written code
// Import the necessary modules here

import { addToCart, removeFromCart } from '../model/cart.model.js';

export const addToCartController = (req, res) => {
  // Write your code here
  const { productId, quantity } = req.query;
  const userId = Number(req.userId);
  if (!userId) {
    return res.status(401).json({ success: false, msg: 'login to continue' });
  }
  try {
    const cartItems = addToCart(userId, Number(productId), Number(quantity));
    return res.status(200).json({ success: true, item: cartItems });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const removeFromCartController = (req, res) => {
  // Write your code here
  const itemId = Number(req.params.itemId);
  const userId = Number(req.userId);
  if (!userId) {
    return res.status(401).json({ success: false, msg: 'login to continue' });
  }
  try {
    const deletedItem = removeFromCart(userId, itemId);
    return res
      .status(200)
      .json({ success: true, deletedCartItem: deletedItem });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
