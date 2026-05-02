import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import {
  ArrowRight,
  ShoppingBag,
  Smartphone,
  Laptop,
  Headphones,
  Zap,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
} from "lucide-react";
import type { Product } from "../../types";
import { ProductCard } from "../../components/common/ProductCard";
// import { NewsletterSection } from '../../components/common/NewsletterSection';

interface HomePageProps {
  // Page Component tự quản lý state nên không cần nhận props từ bên ngoài nữa
}

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  action: string;
  category: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Bài tập lớn OOP",
    subtitle: "Mô phỏng hệ thống bán hàng điện tử",
    description:
      "Trình bày đầy đủ các lớp, đối tượng và nghiệp vụ quản lý trong một hệ thống thực tế",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    action: "Xem hệ thống",
    category: "sale",
  },
  {
    id: 2,
    title: "iPhone 17 Pro Max",
    subtitle: "Đột phá công nghệ 2025",
    description: "Chip A19 Bionic - Camera 200MP - Thiết kế hoàn toàn mới",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    gradient: "from-cyan-600 via-blue-500 to-indigo-500",
    action: "Xem chi tiết",
    category: "phone",
  },
  {
    id: 3,
    title: "Laptop Gaming 2025",
    subtitle: "Hiệu năng đỉnh cao",
    description: "RTX 5090 - Intel Core Ultra 9 - Màn hình OLED 240Hz",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    gradient: "from-blue-700 via-cyan-600 to-teal-500",
    action: "Mua ngay",
    category: "computer",
  },
  {
    id: 4,
    title: "Phụ kiện cao cấp 2025",
    subtitle: "Hoàn thiện trải nghiệm",
    description: "AirPods Pro 3 - Vision Pro - Apple Watch Ultra 3",
    image:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80",
    gradient: "from-teal-600 via-cyan-500 to-blue-500",
    action: "Khám phá",
    category: "accessory",
  },
];

export const HomePage: React.FC<HomePageProps> = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // States for Data
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  let skeletons = [];
  // Fetch Data
  useEffect(() => {
    api
      .getHomeData()
      .then((data) => {
        setFeaturedProducts(data.topRatedProducts || []);
        setNewProducts(data.newProducts || []);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu trang chủ:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onViewProduct = (product: Product) => {
    const productId = product.id || product.MaSP;
    navigate(`/product/${productId}`);
  };

  const onCategorySelect = (category: string) => {
    alert(`Đã chọn danh mục: ${category}`);
  };

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  if (loading === true) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-blue-600">
          Đang tải dữ liệu trang chủ...
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length,
    );
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner Slider */}
      <section className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Slides */}
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            <div className="relative container mx-auto px-6 h-full">
              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                {/* Left Content */}
                <div className="space-y-6 text-white z-20">
                  <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    <Sparkles className="inline h-4 w-4 mr-2" />
                    <span className="">Ưu đãi đặc biệt</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    {slide.title}
                    <span className="block text-yellow-300 mt-2">
                      {slide.subtitle}
                    </span>
                  </h1>

                  <p className="text-xl text-white text-opacity-90 leading-relaxed max-w-md">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onCategorySelect(slide.category)}
                      className="group bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>{slide.action}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => onCategorySelect("all")}
                      className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
                    >
                      Xem tất cả sản phẩm
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 pt-4">
                    <div>
                      <div className="text-3xl font-bold">1000+</div>
                      <div className="text-sm text-white text-opacity-80">
                        Sản phẩm
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">50K+</div>
                      <div className="text-sm text-white text-opacity-80">
                        Khách hàng
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">99%</div>
                      <div className="text-sm text-white text-opacity-80">
                        Hài lòng
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="hidden md:block relative">
                  <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl transform rotate-6"></div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="relative w-full h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-800 px-6 py-3 rounded-2xl font-bold text-lg shadow-xl animate-bounce">
                    <Tag className="inline h-5 w-5 mr-2" />
                    Sale 50%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-opacity-50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-opacity-50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-3 bg-white"
                  : "w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features - Đặc điểm nổi bật */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 rounded-3xl -z-10"></div>
        <div className="grid md:grid-cols-3 gap-6 p-8">
          <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Truck className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                Giao hàng nhanh chóng
              </h3>
              <p className="text-sm text-gray-600">
                Miễn phí ship cho đơn hàng từ 500K
              </p>
              <p className="text-xs text-cyan-600 font-medium mt-2">
                ✓ Giao trong 2 giờ nội thành
              </p>
            </div>
          </div>

          <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                Bảo hành chính hãng
              </h3>
              <p className="text-sm text-gray-600">
                Cam kết 100% hàng chính hãng
              </p>
              <p className="text-xs text-blue-600 font-medium mt-2">
                ✓ Bảo hành lên đến 24 tháng
              </p>
            </div>
          </div>

          <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                Hỗ trợ 24/7
              </h3>
              <p className="text-sm text-gray-600">
                Tư vấn và hỗ trợ mọi lúc, mọi nơi
              </p>
              <p className="text-xs text-teal-600 font-medium mt-2">
                ✓ Hotline: 0888888888
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Danh mục sản phẩm
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => onCategorySelect("phone")}
            className="group p-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white bg-white/20 rounded-full group-hover:bg-opacity-30 transition-colors">
                <Smartphone className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold">Điện thoại</h3>
              <p className="text-blue-100 text-center">
                iPhone, Samsung, Xiaomi và nhiều hãng khác
              </p>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("computer")}
            className="group p-8 bg-gradient-to-br from-cyan-500 to-teal-500 text-white rounded-2xl hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white bg-white/20 rounded-full group-hover:bg-opacity-30 transition-colors">
                <Laptop className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold">Laptop</h3>
              <p className="text-cyan-100 text-center">
                MacBook, Dell, HP, Asus và các thương hiệu hàng đầu
              </p>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("tablet")}
            className="group p-8 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white bg-white/20 rounded-full group-hover:bg-opacity-30 transition-colors">
                <div className="flex items-center space-x-1">
                  <Smartphone className="h-6 w-6" />
                  <Laptop className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Tablet</h3>
              <p className="text-indigo-100 text-center">
                iPad, Samsung Tab và các máy tính bảng khác
              </p>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onCategorySelect("accessory")}
            className="group p-8 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white bg-white/20 rounded-full group-hover:bg-opacity-30 transition-colors">
                <Headphones className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold">Phụ kiện</h3>
              <p className="text-teal-100 text-center">
                Tai nghe, ốp lưng, sạc dự phòng và nhiều hơn nữa
              </p>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600 mt-2">
              Được khách hàng tin tưởng và lựa chọn nhiều nhất
            </p>
          </div>
          <button
            onClick={() => onCategorySelect("all")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                <span>✨</span>
                <span>Hàng mới về</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Cập nhật những sản phẩm công nghệ mới nhất
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      {/* <NewsletterSection /> */}
    </div>
  );
};
