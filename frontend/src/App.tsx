import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/customer/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<HomePage />} />
          
          {/* Bạn có thể thêm các trang khác ở đây sau này. Ví dụ: */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
