// Please don't change the pre-written code
// Import the necessary modules here
import axios from 'axios';
export const userModel = async () => {
  // Write your code here
  const res = await axios.get('https://dummyjson.com/users');
  return res.data.users;
};
