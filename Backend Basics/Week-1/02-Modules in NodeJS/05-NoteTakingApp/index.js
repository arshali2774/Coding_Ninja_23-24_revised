// Please don't change the pre-written code
// Import the necessary modules here
const fs = require('fs');
const Solution = () => {
  // Write your code here
  fs.writeFileSync('notes.txt', 'The world has enough coders');
  const contents = fs.readFileSync('notes.txt', 'utf-8');
  console.log(contents);
  fs.appendFileSync('notes.txt', ' BE A CODING NINJA!');
  const updatedContents = fs.readFileSync('notes.txt', 'utf-8');
  console.log(updatedContents);
};
Solution();
module.exports = Solution;
