const pool = require('../config/db');

// Add property
const addProperty = async (req, res) => {
    const {
        address, landlord_name, landlord_phone, landlord_email,
        agent_name, agent_phone, lease_start, lease_end, is_current
    } = req.body;
    const user_id = req.user?.user_id || 1; // Will be replaced with actual user from JWT

    try {
        const result = await pool.query(
            `INSERT INTO properties (user_id, address, landlord_name, landlord_phone, 
             landlord_email, agent_name, agent_phone, lease_start, lease_end, is_current) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             RETURNING *`,
            [user_id, address, landlord_name, landlord_phone, landlord_email,
                agent_name, agent_phone, lease_start, lease_end, is_current]
        );

        // Log audit
        await pool.query(
            `INSERT INTO audit_logs (user_id, action_type, module, description) 
             VALUES ($1, $2, $3, $4)`,
            [user_id, 'CREATE', 'Property', `Added property at ${address}`]
        );

        res.status(201).json({ message: 'Property added successfully', property: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all properties for a user
const getProperties = async (req, res) => {
    const user_id = req.user?.user_id || 1;

    try {
        const result = await pool.query(
            'SELECT * FROM properties WHERE user_id = $1 ORDER BY created_at DESC',
            [user_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update property
const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { address, landlord_name, landlord_phone, lease_end, is_current } = req.body;

    try {
        const result = await pool.query(
            `UPDATE properties SET address = $1, landlord_name = $2, 
             landlord_phone = $3, lease_end = $4, is_current = $5 
             WHERE property_id = $6 RETURNING *`,
            [address, landlord_name, landlord_phone, lease_end, is_current, id]
        );

        res.json({ message: 'Property updated successfully', property: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete property
const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM properties WHERE property_id = $1', [id]);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addProperty, getProperties, updateProperty, deleteProperty };