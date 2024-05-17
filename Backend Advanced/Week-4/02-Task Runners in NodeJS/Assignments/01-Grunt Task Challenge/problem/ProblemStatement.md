## Title: 
Grunt Task Challenge - Text Replacement

### Introduction:
Suppose you're working on a web development project for a client who maintains a large website with numerous HTML files. The client has requested that you make several global changes throughout the entire website. This includes updating company contact information, such as a phone number or email, which is consistently repeated in various HTML files.

To tackle this task efficiently, you decide to use Grunt, a popular JavaScript task runner that should replace specific text patterns in the HTML file.

### Objectives:

- Define a task named 'replace' within the Grunt configuration.

- Configure the 'replace' task to operate on the 'src/index.html' file.

- The 3rd objective needs to be modified as:
- Set the 'patterns' option to replace all occurrences of the text 'ninjacoding.com' with 'codingninjas.com'. Ensure that you use the desired regular expression.

- Save the modified HTML file to the 'build' directory while maintaining the original filename.

### Output:

All occurrences of 'ninjacoding.com' should be replaced by 'codingninjas.com' as shown below in the 'build/index.html' file.
 
https://files.codingninjas.in/gulp-replace-32199.png

### Resources:

Grunt Plugins: https://gruntjs.com/plugins


### Notes:
- There should be one index.html file present in the src directory. 

- The folder structure should remain unchanged. 


