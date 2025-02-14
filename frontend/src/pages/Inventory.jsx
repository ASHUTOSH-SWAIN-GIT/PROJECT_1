import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import "../pages/css/Inventory.css";

const Inventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    note: "",
  });

  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inventory`);
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredItems(items);
      return;
    }

    const fuse = new Fuse(items, {
      keys: ["name", "category", "note"],
      threshold: 0.3,
    });

    const results = fuse.search(query).map((result) => result.item);
    setFilteredItems(results);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/${editingItem._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/inventory`, formData);
      }
      setFormData({ name: "", quantity: "", price: "", category: "", note: "" });
      setEditingItem(null);
      fetchInventory();
    } catch (error) {
      console.error("Error adding/updating inventory:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="inventory-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="nav-brand">Inventory</h2>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
          <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="inventory-header-container">
        <h2 className="inventory-header">Inventory Management</h2>

        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          
        </div>
      </div>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" name="name" className="input-field" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
          <input type="number" name="quantity" className="input-field" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="number" name="price" className="input-field" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input type="text" name="category" className="input-field" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="text" name="note" className="input-field" placeholder="Note" value={formData.note} onChange={handleChange}  />
        </div>
        <button type="submit" className="submit-btn">{editingItem ? "Update Item" : "Add Item"}</button>
      </form>

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
            {currentItems.map((item) => (
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
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="no-results">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="page-btn">
          ⬅ Previous
        </button>
        <span className="page-number">Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= filteredItems.length} className="page-btn">
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Inventory;