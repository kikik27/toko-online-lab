import { useQuery } from '@tanstack/react-query';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  if (isLoading) return <p className="loading-text">Memuat daftar produk...</p>;
  if (isError) return <p className="loading-text">Error: {error.message}</p>;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <h2 className="section-title">Daftar Produk</h2>
      <p className="section-subtitle">Menampilkan {products?.length || 0} produk dari katalog kami.</p>

      <div className="product-grid">
        {products?.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
        {products?.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
            Belum ada produk. Silakan tambah melalui halaman Admin.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
