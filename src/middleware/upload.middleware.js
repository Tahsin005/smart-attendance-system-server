import multer from "multer";

// configure multer with memory storage
const storage = multer.memoryStorage();

// file filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// configure multer with 5MB limit
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

// export single file upload middleware for 'image' field
export const uploadSingleImage = upload.single("image");
