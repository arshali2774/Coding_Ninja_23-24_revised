// Do not change the pre-written code.
// Make the necessary imports here.
import fs from 'fs';

export const writeBlog = (filePath, name) => {
  // Write your code here.
  try {
    fs.appendFileSync(filePath, name);
  } catch (error) {
    console.error('Error writing blog:', error);
  }
};

export const publishBlog = (filePath) => {
  // Write your code here.
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error publishing blog:', error);
    return null;
  }
};
