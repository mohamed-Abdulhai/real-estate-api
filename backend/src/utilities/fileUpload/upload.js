import mongoose from 'mongoose';
import multer from 'multer';
import { AppError } from '../error/error.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + new mongoose.Types.ObjectId() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Only images are allowed', 400, 'failed'), false);
  }
};

export const upload = multer({ storage, fileFilter });
