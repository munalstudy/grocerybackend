const db = require('../config/db');

const Category = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },
    getIdByName: (name) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id FROM categories WHERE name = ?', [name], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },
    create: (name) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }, update: (id, name) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = Category;
