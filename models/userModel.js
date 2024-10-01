const db = require('../config/db');

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const createUser = (username, passwordHash, email) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)',
            [username, passwordHash, email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
    });
};

module.exports = {
    getUserByUsername,
    createUser
};
