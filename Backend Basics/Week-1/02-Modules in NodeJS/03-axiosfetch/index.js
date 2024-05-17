// Please do not change the prewritten code
const axios = require('axios');
const URL = 'https://api.codingninjas.com/api/v3/event_tags';
const Solution = async () => {
  // Write your code here
  try {
    const res = await axios.get(URL);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
Solution();
module.exports = Solution;
