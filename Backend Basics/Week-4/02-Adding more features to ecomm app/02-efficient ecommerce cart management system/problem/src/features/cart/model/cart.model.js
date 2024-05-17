// Please don't change the pre-written code
// Import the necessary modules here

let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
  if (!productId) {
    throw new Error('productId undefined');
  }
  if (!quantity) {
    throw new Error('quantity undefined');
  }
  const cartItem = cartItems.find(
    (cart) => cart.productId === productId && cart.userId === userId
  );
  if (cartItem) {
    cartItem.quantity = cartItem.quantity + quantity;
  } else {
    const newCartItem = new cartModel(userId, productId, quantity);
    cartItems.push(newCartItem);
  }
  return cartItems.filter((cart) => cart.userId === userId);
};

export const removeFromCart = (userId, cartItemId) => {
  // Write your code here
  if (!cartItemId) {
    throw new Error('cartItemId undefined');
  }
  const cartItemIndex = cartItems.findIndex(
    (cart) => cart.id === cartItemId && cart.userId === userId
  );
  if (cartItemIndex === -1) {
    throw new Error('operation not allowed');
  }
  const cartItem = cartItems[cartItemIndex];
  cartItems.splice(cartItemIndex, 1);
  return cartItem;
};
