const pool = require('../config/db');

const uploadDocument = async (req, res) => {
    const user_id = req.user?.user_id || 1;
    const { title } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await pool.query(
            `INSERT INTO documents 
            (user_id, title, file_name, file_path, file_type, file_size)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                user_id,
                title || req.file.originalname,
                req.file.originalname,
                req.file.path,
                req.file.mimetype,
                req.file.size
            ]
        );

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: result.rows[0]
        });

    } catch (error) {
        console.error('UPLOAD DOCUMENT ERROR:', error);
        res.status(500).json({ error: error.message });
    }
};

const getDocuments = async (req, res) => {
    const user_id = req.user?.user_id || 1;

    try {
        const result = await pool.query(
            `SELECT * FROM documents 
             WHERE user_id = $1 
             ORDER BY uploaded_at DESC`,
            [user_id]
        );

        res.json(result.rows);

    } catch (error) {
        console.error('GET DOCUMENTS ERROR:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `DELETE FROM documents WHERE document_id = $1`,
            [id]
        );

        res.json({ message: 'Document deleted successfully' });

    } catch (error) {
        console.error('DELETE DOCUMENT ERROR:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument
};
