import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/css/Inventory.css";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Stores search results
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    note: "",
  });

  const [editingItem, setEditingItem] = useState(null);

  // ✅ Fetch Inventory Items
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/inventory");
      setItems(response.data);
      setFilteredItems(response.data); // Initialize filteredItems with all items
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.note.toLowerCase().includes(query)
    );

    setFilteredItems(filtered);
  };

  // ✅ Add or Update Inventory Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:4000/api/inventory/${editingItem._id}`, formData);
      } else {
        await axios.post("http://localhost:4000/api/inventory", formData);
      }
      setFormData({ name: "", quantity: "", price: "", category: "", note: "" });
      setEditingItem(null);
      fetchInventory();
    } catch (error) {
      console.error("Error adding/updating inventory:", error);
    }
  };

  // ✅ Edit Inventory Item
  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
  };

  // ✅ Delete Inventory Item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header-container">
        <h2 className="inventory-header">Inventory Management</h2>

        {/* ✅ Search Box */}
        <input
          type="text"
          className="search-box"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        
      </div>

      {/* ✅ Inventory Form */}
      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" name="name" className="input-field" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
          <input type="number" name="quantity" className="input-field" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="number" name="price" className="input-field" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input type="text" name="category" className="input-field" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="text" name="note" className="input-field" placeholder="Note" value={formData.note} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">{editingItem ? "Update Item" : "Add Item"}</button>
      </form>

      {/* ✅ Inventory Table */}
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.note}</td>
                <td className="action-btns">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="6" className="no-results">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
