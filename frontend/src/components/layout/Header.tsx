import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, LogOut, Package, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';
import { useFavorites } from '../../contexts/FavoritesContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { openLoginModal } = useUI();
  const { favorites } = useFavorites();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            TechStore
          </span>
        </Link>


        <nav className="flex items-center space-x-6">
          <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium hidden lg:block">
            Sản phẩm
          </Link>
          
          <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <Heart className="h-6 w-6" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                {favorites.length}
              </span>
            )}
          </button>

          <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-bottom border-gray-50 mb-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Tài khoản</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package className="h-4 w-4" />
                    <span>Đơn hàng của tôi</span>
                  </Link>


                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Đăng nhập</span>
            </button>
          )}

          <button className="md:hidden text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
};
