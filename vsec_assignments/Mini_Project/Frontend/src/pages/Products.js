import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css";

function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const API = "http://localhost:5000/products";

    const getProducts = async () => {
        try {
            const response = await fetch(API);

            if (!response.ok) {
                throw new Error("Unable to fetch products!");
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            alert("Cannot connect to backend!");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(API + "/" + id, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Unable to delete product!");
            }

            await getProducts();

            alert("Product deleted successfully!");
        } catch (error) {
            alert(error.message || "Unable to delete product!");
        }
    };

    const editProduct = (product) => {
        navigate("/dashboard", {
            state: { product }
        });
    };

    return (
        <div className="container">
            <h1>Product Output</h1>

            <button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </button>

            <button onClick={getProducts}>
                Refresh Products
            </button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
    <td>{product._id}</td>
    <td>{product.name}</td>
    <td>₹{product.price}</td>
    <td>{product.category}</td>
    <td>{product.quantity}</td>

                            <td>
                                <button
                                    onClick={() => editProduct(product)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && (
                <p>No products found.</p>
            )}
        </div>
    );
}

export default Products;