import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // Write your code here
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

export default multer({ storage });
