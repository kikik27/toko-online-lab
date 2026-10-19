const Product = require('../models/Product');
const { formatValidationError } = require('../lib/utils');

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID produk tidak valid' });
    }
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    // Validasi manual field wajib sebelum masuk Mongoose
    if (!name || !description || price == null || stock == null || !imageUrl) {
      return res.status(400).json({ message: 'Semua field (name, description, price, stock, imageUrl) wajib diisi' });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'Harga harus berupa angka dan tidak boleh negatif' });
    }

    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: 'Stok harus berupa angka dan tidak boleh negatif' });
    }

    const product = new Product({ name, description, price, stock, imageUrl });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: formatValidationError(error) });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    // Validasi harga dan stok jika dikirim
    if (req.body.price != null && (typeof req.body.price !== 'number' || req.body.price < 0)) {
      return res.status(400).json({ message: 'Harga harus berupa angka dan tidak boleh negatif' });
    }

    if (req.body.stock != null && (typeof req.body.stock !== 'number' || req.body.stock < 0)) {
      return res.status(400).json({ message: 'Stok harus berupa angka dan tidak boleh negatif' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID produk tidak valid' });
    }
    res.status(400).json({ message: formatValidationError(error) });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID produk tidak valid' });
    }
    res.status(500).json({ message: error.message });
  }
};
