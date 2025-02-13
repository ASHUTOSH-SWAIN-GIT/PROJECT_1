const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/profile', (req, res) => {
    res.send('get all user profile');
});

router.post('/login', (req, res) => {
    res.send('login user');   
});

router.post('/register', (req, res) => {
    res.send('register user');
})

module.exports = router;