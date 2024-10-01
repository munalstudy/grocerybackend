const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes2');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/Website/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);      // Product CRUD operations
app.use('/api/categories', categoryRoutes);   // Category CRUD operations
app.use('/api/subcategories', subcategoryRoutes); // Subcategory CRUD operations

// Server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
