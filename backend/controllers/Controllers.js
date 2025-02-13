const Inventory = require('../models/InventoryModel.js');
const mongoose = require('mongoose');

// Get all inventory items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new inventory item
exports.addItem = async (req, res) => {
    try {
        const { name, quantity, price, category, note } = req.body;
        const newItem = new Inventory({ name, quantity, price, category, note });
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing inventory item
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item updated successfully', updatedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an inventory item
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
