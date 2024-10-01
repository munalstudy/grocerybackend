const db = require('../config/db');

const Subcategory = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT subcategories.id, subcategories.name, categories.name AS categoryName 
                FROM subcategories 
                JOIN categories ON subcategories.category_id = categories.id
            `, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM subcategories WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },
    getByCategoryId: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM subcategories WHERE category_id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    create: (name, categoryId) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO subcategories (name, category_id) VALUES (?, ?)', [name, categoryId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    update: (id, name, categoryId) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?', [name, categoryId, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM subcategories WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = Subcategory;
