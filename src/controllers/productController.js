const {
  fetchProduct,
  getProduct,
  createProduct,
  editProduct,
  binProduct,
} = require("../domain/productDomain");

const getAllProducts = async (req, res) => {
  try {
    const products = await fetchProduct();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.Id;
  console.log(req.params.Id);
  try {
    const product = await getProduct(productId);
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await createProduct(productData);
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.Id;
    const productData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    const product = await editProduct(id, productData);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await binProduct(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
