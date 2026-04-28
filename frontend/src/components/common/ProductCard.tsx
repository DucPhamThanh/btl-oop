import React from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();
  const { showLoginRequired } = useUI();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn không cho click bubble up
    
    if (!user) {
      showLoginRequired('Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích!');
      return;
    }
    
    if (user.role === 'admin') {
      alert('Tài khoản quản trị không sử dụng tính năng yêu thích!');
      return;
    }
    
    const productId = product.id || product.MaSP || '';
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {/* Image container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Mới
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Nút yêu thích - luôn hiển thị */}
          <button
            onClick={handleToggleFavorite}
            className={`p-2 bg-white rounded-full shadow-md transition-all duration-200 ${
              isFavorite(product.id || product.MaSP || '') 
                ? 'text-red-500 bg-red-50 scale-110' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-red-400'
            }`}
            title={isFavorite(product.id || product.MaSP || '') ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id || product.MaSP || '') ? 'fill-current' : ''}`} />
          </button>
          
          {/* Nút xem chi tiết - hiển thị khi hover */}
          <button
            onClick={() => onViewDetails(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Xem chi tiết"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Stock indicator */}
        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Chỉ còn {product.stock} sản phẩm
            </span>
          </div>
        )}
      </div>

      {/* Content */}
  <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand?.TenNCC || product.nhaCungCap?.TenNCC || 'N/A'}</p>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer"
            onClick={() => onViewDetails(product)}>
          {product.name}
        </h3>

        {/* Không hiển thị rating ở card - chỉ hiển thị trong chi tiết */}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-red-600">
              {formatPrice(product.GiaBan || product.price || 0)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => {
            if (!user) {
              showLoginRequired('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
              return;
            }
            
            if (user.role === 'admin') {
              alert('Tài khoản quản trị không thể mua hàng!');
              return;
            }
            
            // Luôn mở modal chi tiết để người dùng chọn màu và xem đầy đủ thông tin
            onViewDetails(product);
          }}
          disabled={(product.SoLuongTon !== undefined ? product.SoLuongTon : product.stock) === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
            (product.SoLuongTon !== undefined ? product.SoLuongTon : product.stock) === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{(product.SoLuongTon !== undefined ? product.SoLuongTon : product.stock) === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}</span>
        </button>
      </div>
    </div>
  );
};