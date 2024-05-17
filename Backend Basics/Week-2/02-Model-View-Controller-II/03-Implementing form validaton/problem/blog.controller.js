// Please don't change the pre-written code

export const validateBlog = (req, res) => {
  // Write your code here
  const { title, description, image } = req.body;
  let errors = [];
  if (title.length <= 3 || title.trim() === '') {
    errors.push('Please enter a title');
  }
  if (description.length <= 10 || description.trim() === '') {
    errors.push('Please enter description');
  }
  try {
    const validUrl = new URL(image);
  } catch (error) {
    errors.push('Please enter a valid url');
  }
  console.log(errors);
  if (errors.length > 0) {
    return res.status(401).render('addBlog', { errors, success: false });
  }

  res.status(201).render('addBlog', { errors: null, success: true });
};
export const renderBlogForm = (req, res) => {
  res.render('addBlog', { errors: null, success: false });
};
