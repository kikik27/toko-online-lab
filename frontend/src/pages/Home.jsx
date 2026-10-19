import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero">
      <h1>Belanja Produk Berkualitas dengan Mudah</h1>
      <p>
        Jelajahi koleksi produk terbaik kami. Temukan apa yang Anda butuhkan
        dengan harga terbaik dan pengiriman cepat ke seluruh Indonesia.
      </p>
      <div className="hero-actions">
        <Link to="/products" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
          Lihat Produk
        </Link>
      </div>
    </section>
  );
};

export default Home;
