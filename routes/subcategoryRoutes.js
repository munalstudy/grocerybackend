const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const subcategoryController = require('../controllers/subcategoryController');

router.get('/', subcategoryController.getSubcategories);
router.get('/getByCategoryId/:id', subcategoryController.getByCategoryId);
router.post('/', authenticateToken, subcategoryController.addSubcategory);
router.put('/:id', authenticateToken, subcategoryController.updateSubcategory);
router.delete('/:id', authenticateToken, subcategoryController.deleteSubcategory);

module.exports = router;
