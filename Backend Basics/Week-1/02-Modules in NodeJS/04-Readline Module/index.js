// Import required module
const readline = require('readline');
const qInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const Solution = () => {
  // Write your code here
  qInterface.question('Enter number 1', (num1) => {
    qInterface.question('Enter number 2', (num2) => {
      const n1 = Number(num1);
      const n2 = Number(num2);
      if (n1 > n2) {
        console.log(n1);
      } else {
        console.log(n2);
      }
    });
  });
};

Solution();
module.exports = Solution;
