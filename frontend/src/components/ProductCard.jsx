import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <img className="product-card-img" src={product.imageUrl} alt={product.name} />
        <div className="product-card-body">
          <div className="product-card-name">{product.name}</div>
          <div className="product-card-price">Rp {product.price.toLocaleString('id-ID')}</div>
          <div className="product-card-desc">{product.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
