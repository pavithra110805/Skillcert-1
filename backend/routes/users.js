const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    res.send('Get all users');
});

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
    res.send('Register user');
});

module.exports = router;
