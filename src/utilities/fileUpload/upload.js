import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const objectId = new mongoose.Types.ObjectId();
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        cb(null, `${objectId}-${timestamp}${fileExtension}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};



const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 },
    fileFilter: fileFilter
});

export { upload };