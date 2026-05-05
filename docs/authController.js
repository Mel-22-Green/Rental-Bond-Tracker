const pool = require('../config/db');
const md5 = require('md5');

// User Registration
const register = async (req, res) => {
    const { full_name, email, password, phone } = req.body;

    try {
        // Check if user exists
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // MD5 encryption of password
        const encryptedPassword = md5(password);

        // Insert new user
        const result = await pool.query(
            `INSERT INTO users (full_name, email, password, phone) 
             VALUES ($1, $2, $3, $4) RETURNING user_id, full_name, email`,
            [full_name, email, encryptedPassword, phone]
        );

        // Log audit trail
        await pool.query(
            `INSERT INTO audit_logs (user_id, action_type, module, description, ip_address) 
             VALUES ($1, $2, $3, $4, $5)`,
            [result.rows[0].user_id, 'CREATE', 'User Account', 'User registered successfully', req.ip]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const encryptedPassword = md5(password);

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, encryptedPassword]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Update last login
        await pool.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1',
            [user.user_id]
        );

        // Log audit trail
        await pool.query(
            `INSERT INTO audit_logs (user_id, action_type, module, description, ip_address) 
             VALUES ($1, $2, $3, $4, $5)`,
            [user.user_id, 'LOGIN', 'Authentication', 'User logged in successfully', req.ip]
        );

        res.json({
            message: 'Login successful',
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { register, login };