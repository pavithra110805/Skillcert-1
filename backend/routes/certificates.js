const express = require('express');
const router = express.Router();

// @route   GET api/certificates
// @desc    Get all certificates
// @access  Public
router.get('/', (req, res) => {
    res.send('Get all certificates');
});

// @route   POST api/certificates
// @desc    Create a certificate
// @access  Private
router.post('/', (req, res) => {
    res.send('Create certificate');
});

module.exports = router;
