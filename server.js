
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 60000,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Headphones",
    price: 2000,
    category: "Electronics"
  }
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    p => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

// POST a new product
app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    return res.status(400).json({
      message: "Valid name, price, and category are required"
    });
  }

  const newProduct = {
    id: Math.max(0, ...products.map(p => p.id)) + 1,
    name: name.trim(),
    price,
    category: category.trim()
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find(
    p => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const { name, price, category } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    return res.status(400).json({
      message: "Valid name, price, and category are required"
    });
  }

  product.name = name.trim();
  product.price = price;
  product.category = category.trim();

  res.json(product);
});

// DELETE a product
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex(
    p => p.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.json({
    message: "Product deleted successfully",
    product: deletedProduct
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Shopping API is running"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
