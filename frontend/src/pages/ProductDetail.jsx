import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productService from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
  });

  if (isLoading) return <p className="loading-text">Memuat detail produk...</p>;
  if (isError) return <p className="loading-text">Error: {error.message}</p>;
  if (!product) return <p className="loading-text">Produk tidak ditemukan.</p>;

  return (
    <div className="container">
      <div style={{ paddingTop: '32px' }}>
        <Link to="/products" className="back-link">← Kembali ke Daftar Produk</Link>
      </div>

      <div className="detail-layout">
        <img className="detail-img" src={product.imageUrl} alt={product.name} />

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="price">Rp {product.price.toLocaleString('id-ID')}</p>
          <span className="stock-badge">Stok: {product.stock}</span>

          <p className="desc-title">Deskripsi</p>
          <p className="desc">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
