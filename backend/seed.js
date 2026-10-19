const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  {
    name: 'Wireless Bluetooth Headphone',
    description: 'Headphone nirkabel premium dengan fitur noise cancelling, bass mendalam, dan baterai tahan hingga 30 jam. Cocok untuk bekerja, traveling, atau menikmati musik di rumah.',
    price: 450000,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'
  },
  {
    name: 'Tas Ransel Laptop 15 inch',
    description: 'Tas ransel multifungsi anti-air dengan kompartemen laptop 15 inci, slot tablet, dan kantong organizer. Material polyester tahan lama dengan desain minimalis.',
    price: 275000,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Keyboard mekanikal dengan switch biru (clicky), lampu RGB yang dapat dikustomisasi, dan build quality solid. Ideal untuk programmer dan gamer.',
    price: 650000,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600'
  },
  {
    name: 'Sneakers Casual Putih',
    description: 'Sepatu sneakers kasual berbahan kulit sintetis premium. Sol empuk dengan teknologi memory foam. Cocok untuk outfit harian yang stylish dan nyaman.',
    price: 389000,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600'
  },
  {
    name: 'Smartwatch Fitness Tracker',
    description: 'Jam tangan pintar dengan sensor detak jantung, tracking langkah kaki, notifikasi smartphone, dan water resistant hingga 50 meter. Baterai 7 hari.',
    price: 520000,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600'
  },
  {
    name: 'Tumbler Stainless Steel 500ml',
    description: 'Tumbler vacuum insulated dari stainless steel food grade. Menjaga minuman panas hingga 12 jam dan dingin hingga 24 jam. Ramah lingkungan dan stylish.',
    price: 135000,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'
  },
  {
    name: 'Kacamata Anti Blue Light',
    description: 'Kacamata pelindung mata dari sinar biru layar komputer dan smartphone. Frame ringan dan nyaman dipakai seharian. Lensa anti-refleksi premium.',
    price: 175000,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600'
  },
  {
    name: 'Wireless Mouse Ergonomis',
    description: 'Mouse nirkabel ergonomis dengan DPI adjustable (800-1600), koneksi Bluetooth & 2.4GHz, dan desain silent click. Baterai tahan hingga 3 bulan.',
    price: 195000,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'
  },
];

const adminData = {
  email: 'admin@example.com',
  password: 'admin123',
};

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/toko_online';
    await mongoose.connect(mongoUri);
    console.log('Terhubung ke MongoDB...');

    // 1. Seed Produk
    await Product.deleteMany({});
    console.log('Data produk lama dihapus.');

    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} produk berhasil ditambahkan:`);
    insertedProducts.forEach(p => console.log(`  - ${p.name} (Rp ${p.price.toLocaleString('id-ID')})`));

    // 2. Seed Admin User
    await User.deleteMany({ email: adminData.email });
    const admin = await User.create(adminData);
    console.log('\nAkun Admin berhasil dibuat:');
    console.log(`  - Email   : ${admin.email}`);
    console.log(`  - Password: ${adminData.password}`);

    await mongoose.disconnect();
    console.log('\nSelesai. Koneksi ditutup.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding:', err.message);
    process.exit(1);
  }
};

seedDB();
