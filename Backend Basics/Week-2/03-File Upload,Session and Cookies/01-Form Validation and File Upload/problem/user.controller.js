export const renderUploadForm = (req, res) => {
  res.render('upload-form', { user: null });
};

export const registerUser = (req, res) => {
  const { name, email } = req.body;
  const { filename } = req.file;
  res.status(200).render('upload-form', { user: { name, email, filename } });
};
