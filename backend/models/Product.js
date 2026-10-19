const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nama produk wajib diisi'],
    trim: true,
    minlength: [1, 'Nama produk tidak boleh kosong'],
    maxlength: [200, 'Nama produk maksimal 200 karakter']
  },
  description: { 
    type: String, 
    required: [true, 'Deskripsi produk wajib diisi'],
    trim: true,
    minlength: [1, 'Deskripsi tidak boleh kosong']
  },
  price: { 
    type: Number, 
    required: [true, 'Harga produk wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  stock: { 
    type: Number, 
    required: [true, 'Stok produk wajib diisi'],
    default: 0,
    min: [0, 'Stok tidak boleh negatif']
  },
  imageUrl: { 
    type: String, 
    required: [true, 'URL gambar wajib diisi'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'URL gambar harus diawali http:// atau https://'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
