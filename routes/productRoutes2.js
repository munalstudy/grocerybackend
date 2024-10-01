const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const productController = require('../controllers/productController2');
const upload = require('../middleware/uploadMiddleware');
// const {create} = require("../controllers/productController");  // For file uploads

// const express = require('express');
// const router = express.Router();
// const { create, getAll, getById, upload } = require('../controllers/productController');
// const authenticateToken = require('../middleware/authMiddleware');

// router.post('/products', authenticateToken, upload.single('image'), create);
// router.get('/public/products', getAll);
// router.get('/public/products/:id', getById);



router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
// router.post('/', authenticateToken, upload.single('image'), create);
router.post('/', authenticateToken, upload.single('image'), productController.addProduct);
router.put('/:id', authenticateToken, upload.single('image'), productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
