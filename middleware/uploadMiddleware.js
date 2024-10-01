const multer = require('multer');
const path = require('path'); // Import path module to handle file extensions

// Setup multer storage and file filter
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            // Get the file extension
            const fileExtension = path.extname(file.originalname);
            // Create the new filename with the extension
            cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        }
    }),
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
