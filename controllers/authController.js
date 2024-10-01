const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../models/userModel');
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { username, password, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        await createUser(username, passwordHash, email);
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Login error');
    }
};

module.exports = { register, login };
