import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import useAuthStore from './store/useAuthStore';

const Navigation = () => {
  const isAuth = useAuthStore(state => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">TokoOnline</Link>
      <div className="navbar-links">
        <Link to="/">Beranda</Link>
        <Link to="/products">Produk</Link>
        {isAuth && <Link to="/admin">Admin</Link>}
        {isAuth ? (
          <a href="#" onClick={handleLogout}>Logout</a>
        ) : (
          <Link to="/login" className="nav-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
