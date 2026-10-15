const express = require("express"); //Express helps us create a backend server and handle requests.
const mongoose = require("mongoose");
const cors = require("cors"); //CORS allows the frontend to make requests to the backend when permitted by the server's CORS settings.

const app = express();
app.use(cors());      //app.use() registers middleware.
//cors() enables CORS for incoming requests.
app.use(express.json()); //This allows Express to read JSON data sent by the frontend.

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/productDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err.message));

// Product Model
const Product = mongoose.model("Product", {
name: { type: String, required: true },
price: { type: Number, required: true, min: 0.01 },
category: { type: String, required: true },
quantity: {
type: Number,
required: true,
min: 0,
validate: {
validator: Number.isInteger,
message: "Quantity must be a whole number"
}
}
});

// Validate Product
function validateProduct(req, res, next) {
const { name, price, category, quantity } = req.body;


if (typeof name !== "string" ||
    !/^[A-Za-z][A-Za-z0-9 ]*$/.test(name.trim()))
    return res.status(400).json({ message: "Enter a valid product name" });

if (typeof category !== "string" ||
    !/^[A-Za-z][A-Za-z ]*$/.test(category.trim()))
    return res.status(400).json({
        message: "Category must contain letters and spaces only"
    });

if (typeof price !== "number" ||
    !Number.isFinite(price) || price <= 0)
    return res.status(400).json({
        message: "Price must be greater than zero"
    });

if (typeof quantity !== "number" ||
    !Number.isInteger(quantity) || quantity < 0)
    return res.status(400).json({
        message: "Quantity must be a non-negative whole number"
    });

next();


}

// CREATE: Add Product
app.post("/products", validateProduct, async (req, res) => {
try {
res.status(201).json(await Product.create(req.body));
} catch (err) {
res.status(500).json({ message: "Unable to add product" });
}
});

// READ: Get Products
app.get("/products", async (req, res) => {
try {
res.json(await Product.find());
} catch (err) {
res.status(500).json({ message: "Unable to fetch products" });
}
});

// UPDATE: Edit Product
app.put("/products/:id", validateProduct, async (req, res) => {
try {
const product = await Product.findByIdAndUpdate(
req.params.id, req.body, { new: true, runValidators: true }
);


    if (!product)
        return res.status(404).json({ message: "Product not found" });

    res.json(product);
} catch (err) {
    res.status(400).json({ message: "Unable to update product" });
}


});

// DELETE: Remove Product
app.delete("/products/:id", async (req, res) => {
try {
const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
        return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
} catch (err) {
    res.status(400).json({ message: "Unable to delete product" });
}

});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
