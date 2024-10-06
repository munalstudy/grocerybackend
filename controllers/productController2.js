const Product = require('../models/productModel2');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch products'});
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.getById(id);
        if (!product) return res.status(404).json({error: 'Product not found'});
        res.json(product);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch product'});
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const {name, price, smallDetails, bigDescription, subcategoryId} = req.body;

    let image = req.file ? req.file.path : null;
    if (image != null) {
        image = `${req.protocol}://${req.get('host')}/Website/` + image;
    }

    if (!name || !price || !smallDetails || !subcategoryId) {
        return res.status(400).json({error: 'Missing required product fields'});
    }

    try {
        await Product.create(name, price, smallDetails, bigDescription, image, subcategoryId);
        res.status(201).json({message: 'Product added successfully'});
    } catch (err) {
        res.status(500).json({error: 'Failed to add product'});
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, smallDetails, bigDescription, categoryId, subcategoryId} = req.body;

    if (!name || !price || !smallDetails) {
        return res.status(400).json({error: 'Missing required product fields'});
    }

    let image = req.file ? req.file.path : null;
    if (image != null) {
        image = `${req.protocol}://${req.get('host')}/Website/` + image;
    }

    try {
        await Product.update(id, {name, price, subcategoryId, smallDetails, bigDescription, image});
        res.json({message: 'Product updated successfully'});
    } catch (err) {
        res.status(500).json({error: 'Failed to update product'});
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        await Product.delete(id);
        res.json({message: 'Product deleted successfully'});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete product'});
    }
};
