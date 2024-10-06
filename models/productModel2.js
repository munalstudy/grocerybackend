const db = require('../config/db');

const Product = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT products.id, products.name, products.price, products.small_details, products.big_description, ' +
                'products.image_path, subcategories.id AS subcategoryId,subcategories.name AS subcategory, categories.id as categoryId,categories.name as category FROM products, subcategories, categories ' +
                'WHERE products.subcategory_id = subcategories.id AND ' +
                'subcategories.category_id = categories.id', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT products.id, products.name, products.price, products.small_details, products.big_description, products.image_path, subcategories.name as subcategory, categories.name as category FROM products ' +
                'JOIN subcategories on products.subcategory_id = subcategories.id ' +
                'JOIN categories on subcategories.category_id = categories.id WHERE products.id = ? ', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },
    create: (name, price, smallDetails, bigDescription, image, subcategoryId) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO products (subcategory_id, name, price, small_details, big_description, image_path) VALUES (?, ?, ?, ?, ?, ?)',
                [subcategoryId, name, price, smallDetails, bigDescription, image],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results.insertId);
                }
            );
        });
    },
    update: (id, data) => {
        return new Promise((resolve, reject) => {

            if (data.image != null) {
                db.query(
                    'UPDATE products SET name = ?, price = ?, small_details = ?, big_description = ?, image_path = ? WHERE id = ?',
                    [data.name, data.price, data.smallDetails, data.bigDescription, data.image, id],
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    }
                );
            } else {
                db.query(
                    'UPDATE products SET name = ?, price = ?, subcategory_id = ?, small_details = ?, big_description = ? WHERE id = ?',
                    [data.name, data.price, data.subcategoryId, data.smallDetails, data.bigDescription, id],
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    }
                );
            }
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = Product;
