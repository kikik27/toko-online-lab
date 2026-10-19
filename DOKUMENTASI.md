# Dokumentasi Tugas Personal Lab
# "Membangun Toko Web Online"

---

**Nama Mata Kuliah:** Specialized Platform Development  
**Tanggal:** Oktober 2026

---

## 1. Deskripsi Aplikasi

Aplikasi ini adalah sebuah **Toko Web Online** sederhana yang dibangun menggunakan arsitektur Full-Stack modern. Aplikasi ini memungkinkan pengguna untuk melihat daftar produk, melihat detail produk, serta memiliki panel admin untuk mengelola (CRUD) produk.

---

## 2. Teknologi yang Digunakan

| Komponen       | Teknologi                                  |
|----------------|---------------------------------------------|
| Frontend       | React (Vite), React Router, Axios           |
| Backend        | Node.js, Express.js                         |
| Database       | MongoDB (Mongoose ODM)                      |
| State Mgmt     | Zustand                                     |
| Data Fetching  | TanStack React Query                        |
| Validasi Form  | Zod + React Hook Form                       |
| Autentikasi    | JWT (JSON Web Token) + bcrypt               |
| Styling        | CSS Flexbox / CSS Grid (Responsive Design)  |

---

## 3. Struktur Direktori Project

```
toko-online-lab/
├── backend/
│   ├── config/
│   │   └── db.js                 # Konfigurasi koneksi MongoDB
│   ├── controllers/
│   │   ├── authController.js     # Logic autentikasi (login, register)
│   │   └── productController.js  # Logic CRUD produk & validasi request
│   ├── lib/
│   │   └── utils.js              # Utility helper (formatValidationError untuk error Mongoose)
│   ├── models/
│   │   ├── Product.js            # Mongoose Schema produk (dengan validasi schema lengkap)
│   │   └── User.js               # Mongoose Schema user (dengan enkripsi password bcrypt)
│   ├── routes/
│   │   ├── authRoutes.js         # Route autentikasi
│   │   └── productRoutes.js      # Route CRUD produk
│   ├── .env                      # Environment variables (MONGO_URI, JWT_SECRET)
│   ├── seed.js                   # Script untuk mengisi data awal produk & akun admin default
│   ├── server.js                 # Entry point server Express
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Komponen reusable (Button, Input, Modal, ConfirmModal, Table, ProductCard, Loading)
│   │   ├── hooks/
│   │   │   └── useFormValidation.js  # Custom hook validasi form (Zod)
│   │   ├── lib/
│   │   │   └── axiosClient.js    # Konfigurasi Axios + Interceptor JWT
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Halaman Beranda
│   │   │   ├── ProductList.jsx   # Halaman Daftar Produk
│   │   │   ├── ProductDetail.jsx # Halaman Detail Produk
│   │   │   ├── Login.jsx         # Halaman Login Admin
│   │   │   └── Admin.jsx         # Halaman Admin (CRUD Produk via Modal)
│   │   ├── services/
│   │   │   ├── authService.js    # Service layer untuk API autentikasi
│   │   │   └── productService.js # Service layer untuk API produk
│   │   ├── store/
│   │   │   └── useAuthStore.js   # Zustand store untuk state autentikasi
│   │   ├── App.jsx               # Routing utama aplikasi
│   │   ├── main.jsx              # Entry point React + QueryClientProvider
│   │   └── index.css             # Stylesheet utama (responsive)
│   ├── .env                      # Environment variable (VITE_API_URL)
│   └── package.json
```

---

## 4. Endpoint Backend (RESTful API)

### Produk

| Method   | Endpoint            | Keterangan                          |
|----------|---------------------|--------------------------------------|
| `GET`    | `/api/products`     | Mengambil semua produk               |
| `GET`    | `/api/products/:id` | Mengambil detail produk berdasarkan ID |
| `POST`   | `/api/products`     | Menambahkan produk baru              |
| `PUT`    | `/api/products/:id` | Mengubah data produk                 |
| `DELETE` | `/api/products/:id` | Menghapus produk                     |

### Autentikasi

| Method | Endpoint             | Keterangan              |
|--------|----------------------|--------------------------|
| `POST` | `/api/auth/register` | Registrasi user/admin    |
| `POST` | `/api/auth/login`    | Login dan mendapat token |

### Model Produk (Mongoose Schema)

```javascript
{
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
    trim: true
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
    validate: { validator: /^https?:\/\/.+/, message: 'URL harus diawali http/https' }
  }
}
```

### Model User (Mongoose Schema)

```javascript
{
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
    // Di-hash otomatis menggunakan bcryptjs sebelum disimpan (pre-save hook)
  }
}
```

---

## 5. Cara Menjalankan Aplikasi

### Prasyarat

- **Node.js** (v18 atau lebih baru) sudah terinstall
- **MongoDB** berjalan di `localhost:27017` (bisa menggunakan Docker)
- **Git** (opsional, untuk clone project)

### Langkah 1: Jalankan MongoDB (menggunakan Docker)

```bash
docker run -d -p 27017:27017 --name mongodb-toko-online mongo:latest
```

Jika sudah pernah dibuat sebelumnya:

```bash
docker start mongodb-toko-online
```

### Langkah 2: Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend/` dengan isi:

```
MONGO_URI=mongodb://localhost:27017/toko_online
JWT_SECRET=secretkey123
```

Jalankan seed data (untuk mengisi katalog produk awal dan membuat akun admin):

```bash
node seed.js
```

> ℹ️ **Akun Admin Default (dari seed):**  
> - **Email:** `admin@example.com`  
> - **Password:** `admin123`  

Jalankan server backend:

```bash
npm run start
```

Backend akan berjalan di **http://localhost:5000**.

### Langkah 3: Setup Frontend

```bash
cd frontend
npm install
```

Buat file `.env` di folder `frontend/` dengan isi:

```
VITE_API_URL=http://localhost:5000/api
```

Jalankan frontend:

```bash
npm run dev
```

Frontend akan berjalan di **http://localhost:5173**.

### Langkah 4: Buka Aplikasi

Buka browser dan akses **http://localhost:5173**.

---

## 6. Halaman Aplikasi

### 6.1 Halaman Beranda (Home)
- Tampilan sambutan dengan pesan ajakan belanja
- Tombol navigasi menuju halaman Daftar Produk
- **URL:** `http://localhost:5173/`

> **[SISIPKAN SCREENSHOT HALAMAN BERANDA DI SINI]**

### 6.2 Halaman Daftar Produk (Product List)
- Menampilkan seluruh produk dari database dalam layout CSS Grid yang responsif
- Setiap produk menampilkan gambar, nama, harga, dan deskripsi singkat
- Klik kartu produk untuk melihat detail
- **URL:** `http://localhost:5173/products`

> **[SISIPKAN SCREENSHOT HALAMAN DAFTAR PRODUK DI SINI]**

### 6.3 Halaman Detail Produk (Product Detail)
- Menampilkan informasi lengkap produk: gambar besar, nama, harga, stok, dan deskripsi lengkap
- Layout 2 kolom (gambar di kiri, informasi di kanan)
- Tombol kembali ke daftar produk
- **URL:** `http://localhost:5173/products/:id`

> **[SISIPKAN SCREENSHOT HALAMAN DETAIL PRODUK DI SINI]**

### 6.4 Halaman Login Admin
- Form login dengan validasi menggunakan Zod (format email valid & password minimal 6 karakter)
- **Kredensial Login Default:**  
  - Email: `admin@example.com`  
  - Password: `admin123`
- Setelah login berhasil, token JWT disimpan di `localStorage` dan user dialihkan ke halaman Admin (`/admin`).
- **URL:** `http://localhost:5173/login`

> **[SISIPKAN SCREENSHOT HALAMAN LOGIN DI SINI]**

### 6.5 Halaman Admin (CRUD Produk)
- Menampilkan tabel daftar produk lengkap dengan nama, harga, stok, dan aksi.
- Tombol **"+ Tambah Produk"** membuka Modal popup formulir untuk memasukkan produk baru.
- Tombol **"Edit"** di setiap baris tabel membuka Modal yang sama, dengan input yang otomatis terisi (*pre-filled*) sesuai data produk terpilih untuk dilakukan pembaruan (Update).
- Tombol **"Hapus"** memunculkan komponen **ConfirmModal** kustom (tanpa alert browser) untuk konfirmasi penghapusan produk secara aman dan elegan.
- Validasi formulir menggunakan skema **Zod** dan **React Hook Form**.
- Menggunakan **TanStack React Query** (`useMutation` + `invalidateQueries`) untuk memperbarui tampilan tabel secara reaktif dan otomatis setelah operasi Create, Update, maupun Delete berhasil.
- **URL:** `http://localhost:5173/admin`

> **[SISIPKAN SCREENSHOT HALAMAN ADMIN DI SINI]**  
> **[SISIPKAN SCREENSHOT MODAL TAMBAH PRODUK DI SINI]**  
> **[SISIPKAN SCREENSHOT MODAL EDIT PRODUK DI SINI]**  
> **[SISIPKAN SCREENSHOT MODAL KONFIRMASI HAPUS DI SINI]**  

---

## 7. Arsitektur Teknis

### Frontend Architecture

```
User → React Router → Pages → Services (axiosClient) → Backend API
                         ↓
                    Components (reusable)
                         ↓
                    Zustand Store (auth state)
                         ↓
                    TanStack Query (data caching)
```

- **Service Layer (`services/`):** Semua panggilan API diisolasi ke dalam modul terpisah (`productService.js`, `authService.js`), sehingga komponen UI tidak melakukan pemanggilan HTTP langsung.
- **Axios Client & Interceptors (`lib/axiosClient.js`):**
  - **Request Interceptor:** Mengambil token JWT dari `localStorage` dan menyematkannya ke header `Authorization: Bearer <token>` secara otomatis pada setiap request.
  - **Response Interceptor:** Mendeteksi status HTTP 401 (Unauthorized). Jika sesi kedaluwarsa, token dibersihkan dari penyimpanan lokal dan pengguna otomatis dialihkan ke halaman login (`/login`).
- **Custom Hook `useFormValidation` (`hooks/useFormValidation.js`):**
  - Mengintegrasikan `react-hook-form` dengan `@hookform/resolvers/zod`.
  - Mengisolasi konfigurasi resolver schema Zod sehingga formulir (seperti di `Login.jsx` dan `Admin.jsx`) lebih ringkas, modular, dan mudah dikelola.
- **Komponen Reusable:** `Button`, `Input` (mendukung `label`, indikator wajib `required` dengan tanda bintang `*`, `error message`, dan varian `textarea`), `Modal`, `ConfirmModal` (modal dialog konfirmasi aksi kustom tanpa alert browser), `Table`, `ProductCard`, dan `Loading` dirancang modular dan dapat digunakan kembali di berbagai halaman.

### Backend Architecture

```
Client Request → Express Router → Controller → Mongoose Model → MongoDB
                                      ↓
                              Utility Helper (utils.js)
```

- **MVC Pattern (Model-Controller-Route):** Routes mengatur routing endpoint RESTful, Controllers menangani logika bisnis dan validasi input, Models mendefinisikan skema dan aturan integritas data MongoDB.
- **Modular Utility Helper (`lib/utils.js`):**
  - Menyediakan helper function `formatValidationError(error)`.
  - Mengonversi objek `ValidationError` bertingkat dari Mongoose menjadi pesan string gabungan yang ramah pengguna (human-readable) untuk dikirimkan kembali ke client dalam respons HTTP 400.
- **Database Connector (`config/db.js`):**
  - Mengelola koneksi asynchronous ke MongoDB menggunakan Mongoose dengan penanganan error terpusat (`process.exit(1)` jika koneksi gagal).
- **JWT Authentication & Password Hashing:**
  - Password di-hash menggunakan algoritma **bcryptjs** dengan salt rounds sebelum disimpan ke database (Mongoose pre-save hook).
  - Token JWT di-*generate* saat user berhasil login untuk mengamankan komunikasi stateless.

### Validasi Data Berlapis (Multi-Layer Validation)

Aplikasi menerapkan sistem validasi komprehensif pada **tiga lapisan** untuk memastikan keamanan dan integritas data secara menyeluruh:

| Field | 1. Frontend (Zod Schema) | 2. Backend Controller (`productController.js`) | 3. Database (`Product.js` Mongoose) |
|---|---|---|---|
| **name** | Wajib diisi (min 1 char) | Cek keberadaan (`!name`) | `required`, `trim`, `minlength: 1`, `maxlength: 200` |
| **description** | Wajib diisi (min 1 char) | Cek keberadaan (`!description`) | `required`, `trim`, `minlength: 1` |
| **price** | Preprocess number, min 1 | Tipe `number`, nilai `price >= 0` | `type: Number`, `required`, `min: 0` |
| **stock** | Preprocess number, min 0 | Tipe `number`, nilai `stock >= 0` | `type: Number`, `required`, default 0, `min: 0` |
| **imageUrl** | Format URL valid (`z.string().url()`) | Cek keberadaan (`!imageUrl`) | `required`, `trim`, regex validator `^https?:\/\/.+` |
| **ID (:id)** | Format param URL | Pengecekan keabsahan MongoDB `ObjectId` | Mongoose CastError handling (HTTP 400) |

#### Alur Eksekusi Validasi:

```
[User Input Form]
       │
       ▼
[Layer 1: Frontend Zod] ──(Gagal)──► Tampilkan pesan error di bawah input form
       │ (Lolos)
       ▼
[HTTP Request via Axios]
       │
       ▼
[Layer 2: Backend Controller] ──(Gagal)──► Return HTTP 400 { message: "Semua field wajib diisi" / "Nilai tidak valid" }
       │ (Lolos)
       ▼
[Layer 3: Mongoose Schema] ──(Gagal)──► formatValidationError() ──► Return HTTP 400 { message: "..." }
       │ (Lolos)
       ▼
[Tersimpan di MongoDB] ──► Return HTTP 201 Created / HTTP 200 OK
```

### Standar Penanganan Respons HTTP

| Status Code | Penggunaan | Contoh Pesan |
|---|---|---|
| `200 OK` | Operasi pengambilan data atau update berhasil | Data produk / `{ message: "Produk berhasil dihapus" }` |
| `201 Created` | Berhasil menambahkan data baru | Data produk yang baru disimpan |
| `400 Bad Request` | Validasi gagal, input tidak valid, atau ID invalid | `{ message: "Harga harus berupa angka dan tidak boleh negatif" }` / `{ message: "ID produk tidak valid" }` |
| `401 Unauthorized` | Autentikasi gagal atau kredensial salah | `{ message: "Email atau password salah" }` |
| `404 Not Found` | Data yang dicari tidak ditemukan | `{ message: "Produk tidak ditemukan" }` |
| `500 Internal Server Error` | Kesalahan server yang tidak terduga | `{ message: error.message }` |

---

## 8. Fitur Responsive Design

Aplikasi ini menggunakan **CSS Flexbox** dan **CSS Grid** untuk memastikan tampilan responsif di berbagai ukuran layar:

- **Desktop (> 768px):** Grid 4 kolom untuk produk, layout 2 kolom untuk detail
- **Tablet (641px - 768px):** Grid 2 kolom untuk produk
- **Mobile (< 420px):** Grid 1 kolom, layout detail menjadi vertikal

---

## 9. Kesimpulan

Aplikasi Toko Web Online ini telah berhasil dibangun dengan arsitektur Full-Stack modern yang mencakup:

1. ✅ Backend RESTful API dengan operasi CRUD lengkap menggunakan Express.js dan MongoDB
2. ✅ Frontend React dengan React Router untuk navigasi antar halaman
3. ✅ Integrasi frontend-backend menggunakan Axios dengan interceptor JWT
4. ✅ Responsive design menggunakan CSS Flexbox dan CSS Grid
5. ✅ State management menggunakan Zustand
6. ✅ Data fetching & caching menggunakan TanStack React Query
7. ✅ Validasi form menggunakan Zod dan React Hook Form
8. ✅ Panel admin dengan modal popup untuk CRUD produk
9. ✅ Validasi data berlapis (Multi-layer validation): Frontend (Zod Schema + React Hook Form), Backend Controller (guard checks & ObjectId validation), dan Database (Mongoose Schema constraints)
10. ✅ Arsitektur modular dengan pemisahan Service Layer, Custom Hooks (`useFormValidation`), Axios Interceptors, dan Utility Helper (`formatValidationError`)
11. ✅ Dialog konfirmasi aksi kustom (`ConfirmModal`) yang elegan menggantikan dialog browser bawaan (`window.confirm`)
12. ✅ Skrip seeding database (`seed.js`) otomatis untuk inisialisasi katalog produk dan pembuatan akun admin terenkripsi bcrypt

