import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { Product } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import {
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Package,
  Info,
} from "lucide-react";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api.getProduct(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800">Ôi! Đã có lỗi xảy ra</h2>
        <p className="text-gray-600">{error || "Sản phẩm không tồn tại"}</p>
        <button 
          onClick={() => navigate("/")} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    alert(`Chuyển đến trang thanh toán cho ${product.name}`);
  };

  const formatPrice = (price?: number) => {
    return price?.toLocaleString("vi-VN") + " ₫";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating || 0) ? "#ffc107" : "none"}
                  stroke={i < Math.floor(product.rating || 0) ? "#ffc107" : "#ccc"}
                />
              ))}
              <span className="ml-1 text-blue-600 font-medium">({product.reviewCount || 0} đánh giá)</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div>Mã SP: {product.id || product.MaSP}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-6 mb-6">
          {/* Left Column: Image */}
          <div className="bg-white rounded-2xl p-8 flex items-center justify-center shadow-sm border border-gray-100 relative group">
            <div className="relative w-full max-w-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <button
                className={`absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10 ${
                  isFavorite(product.id || "") ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => toggleFavorite(product)}
              >
                <Heart
                  size={24}
                  fill={isFavorite(product.id || "") ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-red-600">{formatPrice(product.price)}</div>
              {product.originalPrice && (
                <div className="text-gray-400 line-through text-lg">{formatPrice(product.originalPrice)}</div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Package size={18} className="text-emerald-500" />
              <span>
                Tình trạng:{" "}
                <strong className={product.stock > 0 ? "text-emerald-600" : "text-red-600"}>
                  {product.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng"}
                </strong>
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-100 hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
              >
                MUA NGAY
                <span className="text-[10px] font-normal opacity-90">Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
              </button>
              <button 
                onClick={handleAddToCart}
                className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-50 shadow-sm"
              >
                <ShoppingCart size={20} />
                THÊM GIỎ HÀNG
              </button>
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-col gap-5">
              <div className="flex gap-3">
                <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
                <div>
                  <strong className="block text-sm text-gray-800">Bảo hành chính hãng</strong>
                  <p className="text-xs text-gray-500 mt-0.5">{product.ThoiGianBaoHanh || 12} tháng tại trung tâm bảo hành</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Truck size={20} className="text-emerald-500 shrink-0" />
                <div>
                  <strong className="block text-sm text-gray-800">Miễn phí vận chuyển</strong>
                  <p className="text-xs text-gray-500 mt-0.5">Cho đơn hàng từ 500.000đ trở lên</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RotateCcw size={20} className="text-emerald-500 shrink-0" />
                <div>
                  <strong className="block text-sm text-gray-800">Đổi trả trong 30 ngày</strong>
                  <p className="text-xs text-gray-500 mt-0.5">Nếu có lỗi từ nhà sản xuất</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 pb-3 border-b-2 border-emerald-500 w-fit">
              <Info size={22} className="text-emerald-500" />
              Thông tin sản phẩm
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
              {product.description ? (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p className="italic text-gray-400">Thông tin sản phẩm đang được cập nhật...</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 pb-3 border-b-2 border-emerald-500 w-fit">
              Thông số kỹ thuật
            </h2>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {product.ThongSoKyThuat?.ManHinh && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium w-32">Màn hình</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.ManHinh}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.CPU && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Vi xử lý (CPU)</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.CPU}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.RAM && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">RAM</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.RAM}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.BoNho && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Bộ nhớ trong</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.BoNho}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.Camera && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Camera</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.Camera}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.Pin && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Pin</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.Pin}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.HeDieuHanh && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Hệ điều hành</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.HeDieuHanh}</td>
                  </tr>
                )}
                {product.ThongSoKyThuat?.MauSac && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Màu sắc</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.ThongSoKyThuat.MauSac}</td>
                  </tr>
                )}
                {product.brand && (
                  <tr className="border-b border-gray-50">
                    <td className="py-3 text-gray-500 font-medium">Thương hiệu</td>
                    <td className="py-3 text-gray-800 font-semibold">{product.brand.TenNCC}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
