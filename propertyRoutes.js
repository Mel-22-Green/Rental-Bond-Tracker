const express = require('express');
const { addProperty, getProperties, updateProperty, deleteProperty } = require('../controllers/propertyController');
const router = express.Router();

router.post('/add', addProperty);
router.get('/', getProperties);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;