const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.send('get all inventory item');
});


router.get('/:id', (req, res) => {
    res.send('get a single item from the inventory');   
});

router.post('/', (req, res) => {    
    res.send('add item to the inventory');
});

router.put('/:id', (req, res) => {
    res.send('update item in the inventory');
});

router.delete('/:id', (req, res) => {
    res.send('delete item from the inventory');
});

module.exports = router;