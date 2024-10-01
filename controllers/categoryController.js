const Category = require('../models/categoryModel');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Add a new category
exports.addCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    try {
        await Category.create(name);
        res.status(201).json({ message: 'Category added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add category' });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log(req.body);
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    try {
        await Category.update(id, name);
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await Category.delete(id);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
