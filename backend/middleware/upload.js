const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');
const path = require('path');
const fs = require('fs');

// Configure Cloudinary if credentials are provided
const hasCloudinaryConfig = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET;

if (hasCloudinaryConfig) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

// Memory storage for multer (we'll upload to Cloudinary or save locally)
const storage = multer.memoryStorage();

// Custom storage that uploads to Cloudinary or saves locally
const uploadToCloudinary = (buffer, folder = 'restaurant-dishes') => {
    return new Promise((resolve, reject) => {
        // Use upload_stream with buffer directly
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'image',
                transformation: [{ width: 800, height: 600, crop: 'limit' }]
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        
        // Create readable stream from buffer
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        stream.pipe(uploadStream);
    });
};

// Local file storage fallback
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const saveLocally = (buffer, filename) => {
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    return `/uploads/${filename}`;
};

// Multer configuration
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Middleware to handle file upload (Cloudinary or local)
const handleUpload = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        if (hasCloudinaryConfig) {
            // Upload to Cloudinary
            const result = await uploadToCloudinary(req.file.buffer);
            req.file.url = result.secure_url;
            req.file.publicId = result.public_id;
        } else {
            // Save locally
            const filename = `${Date.now()}-${req.file.originalname}`;
            const url = saveLocally(req.file.buffer, filename);
            req.file.url = url;
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { upload, handleUpload };