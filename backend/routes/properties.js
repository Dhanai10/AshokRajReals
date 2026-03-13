const express = require('express');
const router = express.Router();
const { getProperties, createProperty, deleteProperty } = require('../controllers/propertiesController');
const { upload } = require('../models/cloudinary');

router.get('/', getProperties);
router.post('/', upload.single('image'), createProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
