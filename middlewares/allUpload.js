import multer from 'multer';
import path from 'path';

// Storage location & filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'allUploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const allUpload = multer({ storage });

export default allUpload;