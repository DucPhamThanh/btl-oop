import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/customer/HomePage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import './App.css';

// Placeholder pages for later implementation
const ProductsPage = () => <div className="p-8 text-center"><h2 className="text-2xl font-bold">Trang Sản phẩm đang được phát triển</h2></div>;
const ProfilePage = () => <div className="p-8 text-center"><h2 className="text-2xl font-bold">Trang Cá nhân đang được phát triển</h2></div>;
const AdminPage = () => <div className="p-8 text-center"><h2 className="text-2xl font-bold">Trang Quản trị đang được phát triển</h2></div>;

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              {/* Public Routes with Layout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                
                {/* Information Pages */}
                {/* <Route path="about" element={<div>Về chúng tôi</div>} />
                <Route path="guide" element={<div>Hướng dẫn mua hàng</div>} />
                <Route path="warranty" element={<div>Chính sách bảo hành</div>} />
                <Route path="return" element={<div>Chính sách đổi trả</div>} /> */}
              </Route>

              {/* Admin Routes (Could have a different layout later) */}
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
