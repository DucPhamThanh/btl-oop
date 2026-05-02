import React from "react";
import { Link } from "react-router-dom";
import {
  // Facebook,
  // Twitter,
  // Instagram,
  // Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-white">TechStore</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá cả hợp
              lý và dịch vụ hậu mãi chu đáo nhất.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/guide"
                  className="hover:text-white transition-colors"
                >
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="hover:text-white transition-colors"
                >
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link
                  to="/return"
                  className="hover:text-white transition-colors"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Danh mục phổ biến</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products?cat=phone"
                  className="hover:text-white transition-colors"
                >
                  Điện thoại
                </Link>
              </li>
              <li>
                <Link
                  to="/products?cat=computer"
                  className="hover:text-white transition-colors"
                >
                  Laptop
                </Link>
              </li>
              <li>
                <Link
                  to="/products?cat=tablet"
                  className="hover:text-white transition-colors"
                >
                  Máy tính bảng
                </Link>
              </li>
              <li>
                <Link
                  to="/products?cat=accessory"
                  className="hover:text-white transition-colors"
                >
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold mb-4">Liên hệ</h3>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <span>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="h-5 w-5 text-blue-500" />
              <span>0123 456 789</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="h-5 w-5 text-blue-500" />
              <span>support@techstore.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>© 2026 TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
