const Subcategory = require('../models/subcategoryModel');
const Category = require('../models/categoryModel');
// Get all subcategories
exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.getAll();
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};

exports.getByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategories = await Subcategory.getByCategoryId(id);
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};

// Add a new subcategory
exports.addSubcategory = async (req, res) => {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) return res.status(400).json({ error: 'Subcategory name and categoryId are required' });

    try {
        await Subcategory.create(name, categoryId);
        res.status(201).json({ message: 'Subcategory added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add subcategory' });
    }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
    const { id } = req.params;
    const { name, categoryName } = req.body;
    const categoryId = await Category.getIdByName(categoryName);
    if (!name || !categoryId) return res.status(400).json({ error: 'Subcategory name and categoryId are required' });

    try {
        await Subcategory.update(id, name, categoryId.id);
        res.json({ message: 'Subcategory updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
};

// Delete subcategory
exports.deleteSubcategory = async (req, res) => {
    const { id } = req.params;

    try {
        await Subcategory.delete(id);
        res.json({ message: 'Subcategory deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete subcategory' });
    }
};
