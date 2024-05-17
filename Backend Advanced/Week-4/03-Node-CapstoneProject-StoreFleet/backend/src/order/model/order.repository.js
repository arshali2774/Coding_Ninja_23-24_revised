import OrderModel from './order.schema.js';

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  try {
    const order = await OrderModel.create(data);
    return order;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to create a new order');
  }
};
