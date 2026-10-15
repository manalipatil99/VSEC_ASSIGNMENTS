import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../App.css";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const product = location.state?.product || {};

    const [name, setName] = useState(product.name || "");
    const [price, setPrice] = useState(product.price ?? "");
    const [category, setCategory] = useState(product.category || "");
    const [quantity, setQuantity] = useState(product.quantity ?? "");
    const [editId, setEditId] = useState(product._id || "");

    const API = "http://localhost:5000/products";

    const clearForm = () => {
        setName("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setEditId("");

        navigate("/dashboard", {
            replace: true,
            state: null
        });
    };

    const saveProduct = async (e) => {
        e.preventDefault();

        const productData = {
            name: name.trim(),
            price: Number(price),
            category: category.trim(),
            quantity: Number(quantity)
        };

        if (
            !/^[A-Za-z][A-Za-z0-9 ]*$/.test(productData.name) ||
            !/^[A-Za-z][A-Za-z ]*$/.test(productData.category) ||
            !Number.isFinite(productData.price) ||
            productData.price <= 0 ||
            !Number.isInteger(productData.quantity) ||
            productData.quantity < 0
        ) {
            alert("Please enter valid product details!");
            return;
        }

        try {
            const url = editId ? API + "/" + editId : API;
            const method = editId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to save product!");
            }

            if (editId) {
                alert("Product updated successfully!");
            } else {
                alert("Product added successfully!");
            }

            clearForm();

        } catch (error) {
            alert(error.message || "Unable to connect to backend!");
        }
    };

    return (
        <div className="container">
            <h1>Product Management System</h1>

            <button
                className="logout"
                onClick={() => navigate("/login")}
            >
                Logout
            </button>

            <h2>{editId ? "Update Product" : "Add Product"}</h2>

            <form onSubmit={saveProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    pattern="[A-Za-z][A-Za-z0-9 ]*"
                    required
                />

                            <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    pattern="[A-Za-z][A-Za-z ]*"
                    required
                />

        
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />



                <button type="submit">
                    {editId ? "Update Product" : "Add Product"}
                </button>

                {editId && (
                    <button type="button" onClick={clearForm}>
                        Cancel
                    </button>
                )}
            </form>

            <button onClick={() => navigate("/products")}>
                View Product Output
            </button>
        </div>
    );
}

export default Dashboard;