const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', authenticateToken, categoryController.addCategory);
router.put('/:id', authenticateToken, categoryController.updateCategory);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;
