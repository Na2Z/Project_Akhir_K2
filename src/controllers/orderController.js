const {
  newOrder,
  getOrder,
  editOrder,
  binOrder,
} = require("../domain/orderdomain");

async function addOrder(req, res) {
  try {
    const order = await newOrder(req.body);
    res.status(201).send(order);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat membuat pesanan" });
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await getOrder(orderId);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await getOrder(orderId);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const updatedData = req.body;
    const order = await editOrder(orderId, updatedData, {
      new: true,
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    const order = await binOrder(orderId);
    res.json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

module.exports = {
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
