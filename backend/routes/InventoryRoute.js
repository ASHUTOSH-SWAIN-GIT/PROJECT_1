const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/Controllers');

// Routes
router.get('/', InventoryController.getAllItems);
router.get('/:id', InventoryController.getItemById);
router.post('/', InventoryController.addItem);
router.put('/:id', InventoryController.updateItem);
router.delete('/:id', InventoryController.deleteItem);

module.exports = router;
