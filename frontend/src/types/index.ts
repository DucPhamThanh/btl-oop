// 1.2.10 VaiTro (Vai trò)
export interface VaiTro {
  MaVaiTro: string; // PK
  TenVaiTro: string; // 'admin' | 'customer' | 'staff'
}

// 1.2.1 NguoiDung (Người dùng)
export interface NguoiDung {
  MaND: string; // PK - Mã người dùng
  HoTen: string; // Họ và tên
  Email: string; // Email đăng nhập (Unique)
  MatKhau: string; // Mật khẩu đăng nhập (mã hóa)
  SoDienThoai?: string; // Số điện thoại liên hệ
  NgayDangKy: string; // Ngày đăng ký tài khoản
  MaVaiTro: string; // FK -> VaiTro
  // Relations
  vaiTro?: VaiTro;
  donHangs?: DonHang[];
  danhGias?: DanhGia[];
  gioHangs?: GioHang[];
  diaChis?: DiaChi[];
}

// 1.2.11 DiaChi (Địa chỉ)
export interface DiaChi {
  MaDiaChi: string; // PK
  MaND: string; // FK -> NguoiDung
  DiaChi: string; // Địa chỉ
  LoaiDiaChi: string; // 'home' | 'office' | 'other'
  MacDinh?: boolean; // Địa chỉ mặc định
  // Relations
  nguoiDung?: NguoiDung;
}

// 1.2.2 DanhMucSP (Danh mục sản phẩm)
export interface DanhMucSP {
  MaDM: string; // PK
  TenDM: string; // Tên danh mục (Điện thoại, Laptop, Phụ kiện, ...)
  MoTaDM?: string; // Mô tả danh mục
  Icon?: string; // Icon cho danh mục
  // Relations
  sanPhams?: SanPham[];
}

// 1.2.3 NhaCungCap (Nhà cung cấp)
export interface NhaCungCap {
  MaNCC: string; // PK
  TenNCC: string; // Tên nhà cung cấp
  DiaChi?: string; // Địa chỉ liên hệ
  DienThoai?: string; // Số điện thoại
  Email?: string; // Email nhà cung cấp
  // Relations
  sanPhams?: SanPham[];
}

// 1.2.4 SanPham (Sản phẩm)
export interface SanPham {
  MaSP: string; // PK - Mã sản phẩm
  TenSP: string; // Tên sản phẩm
  MoTa?: string; // Mô tả chi tiết sản phẩm
  GiaNhap: number; // Giá nhập
  GiaBan: number; // Giá bán
  SoLuongTon: number; // Số lượng tồn kho
  ThoiGianBaoHanh?: number; // Thời gian bảo hành (tháng)
  TrangThai: 'Còn hàng' | 'Hết hàng' | 'Ngừng kinh doanh'; // Tình trạng
  MaDM: string; // FK -> DanhMucSP
  MaNCC: string; // FK -> NhaCungCap
  HinhAnh?: string; // Hình ảnh sản phẩm
  DanhGiaTrungBinh?: number; // Đánh giá trung bình (1-5)
  SoLuotDanhGia?: number; // Số lượt đánh giá
  // Thông số kỹ thuật (tuỳ chọn cho điện thoại/laptop)
  ThongSoKyThuat?: {
    ManHinh?: string;
    CPU?: string;
    RAM?: string;
    BoNho?: string;
    Camera?: string;
    Pin?: string;
    HeDieuHanh?: string;
    MauSac?: string;
    [key: string]: string | undefined;
  };
  // Relations
  danhMuc?: DanhMucSP;
  nhaCungCap?: NhaCungCap;
  chiTietDonHangs?: ChiTietDonHang[];
  chiTietGioHangs?: ChiTietGioHang[];
  danhGias?: DanhGia[];
  baoHanhs?: BaoHanh[];
}

// 1.2.12 BaoHanh (Bảo hành)
export interface BaoHanh {
  MaBH: string; // PK
  MaSP: string; // FK -> SanPham
  ThoiGianBaoHanh: number; // Thời gian bảo hành (tháng)
  MoTaBH?: string; // Mô tả bảo hành
  // Relations
  sanPham?: SanPham;
}

// 1.2.5 GioHang (Giỏ hàng)
export interface GioHang {
  MaGH: string; // PK
  MaND: string; // FK -> NguoiDung
  NgayTao?: string; // Ngày tạo giỏ hàng
  // Relations
  nguoiDung?: NguoiDung;
  chiTietGioHangs?: ChiTietGioHang[];
}

// 1.2.6 ChiTietGioHang (Chi tiết giỏ hàng)
export interface ChiTietGioHang {
  MaGH: string; // FK -> GioHang (composite PK)
  MaSP: string; // FK -> SanPham (composite PK)
  SoLuong: number; // Số lượng sản phẩm trong giỏ
  // Relations
  gioHang?: GioHang;
  sanPham?: SanPham;
}

// 1.2.7 DonHang (Đơn hàng)
export interface DonHang {
  MaDH: string; // PK
  MaND: string; // FK -> NguoiDung
  NgayDat: string; // Ngày đặt hàng
  TongTien: number; // Tổng giá trị đơn hàng
  TrangThai: 'Chờ xử lý' | 'Đã xác nhận' | 'Đang giao' | 'Hoàn tất' | 'Hủy'; // Trạng thái đơn hàng
  PhuongThucThanhToan: 'COD' | 'Chuyển khoản' | 'Ví điện tử'; // Phương thức thanh toán
  DiaChiGiaoHang: string; // Địa chỉ giao hàng
  GhiChu?: string; // Ghi chú đơn hàng
  // Relations
  nguoiDung?: NguoiDung;
  chiTietDonHangs?: ChiTietDonHang[];
}

// 1.2.8 ChiTietDonHang (Chi tiết đơn hàng)
export interface ChiTietDonHang {
  MaDH: string; // FK -> DonHang (composite PK)
  MaSP: string; // FK -> SanPham (composite PK)
  SoLuong: number; // Số lượng bán
  DonGia: number; // Giá bán tại thời điểm đặt hàng
  ThanhTien: number; // Thành tiền (SoLuong × DonGia)
  // Relations
  donHang?: DonHang;
  sanPham?: SanPham;
}

// 1.2.9 DanhGia (Đánh giá sản phẩm)
export interface DanhGia {
  MaDG: string; // PK
  MaSP: string; // FK -> SanPham
  MaND: string; // FK -> NguoiDung
  SoSao: number; // Số sao đánh giá (1–5)
  NoiDung?: string; // Nội dung đánh giá
  NgayDanhGia: string; // Ngày đánh giá
  DaXacThuc?: boolean; // Đã xác thực (đã mua hàng)
  // Relations
  sanPham?: SanPham;
  nguoiDung?: NguoiDung;
}

// === LEGACY TYPES (Giữ lại để tương thích với code cũ) ===

// CartItem - mapping từ ChiTietGioHang
export interface CartItem {
  product: SanPham;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  finalPrice?: number;
}

// User - mapping từ NguoiDung (giữ tương thích)
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'staff';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// Customer - mapping từ NguoiDung
export interface Customer extends NguoiDung {
  id: string;
  userId: string;
  fullName: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  DiaChi?: string; // Địa chỉ đầy đủ (từ bảng DiaChi)
  email?: string; // Alias for Email
  phone?: string; // Alias for SoDienThoai
  address?: string; // Alias for DiaChi
}

// Order - mapping từ DonHang
export interface Order extends DonHang {
  id: string;
  orderNumber: string;
  userId: string;
  customerId?: string;
  total: number;
  subtotal: number;
  shippingFee?: number;
  discount?: number;
  tax?: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned' | 'Chờ xử lý' | 'Đã xác nhận' | 'Đang giao' | 'Hoàn tất' | 'Hủy';
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'cod' | 'transfer' | 'wallet' | 'credit_card';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city?: string;
    district?: string;
    ward?: string;
  };
  notes?: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  orderDetails?: OrderDetail[];
  items?: {
    id: string;
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}

// OrderDetail - mapping từ ChiTietDonHang
export interface OrderDetail extends ChiTietDonHang {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  selectedColor?: string;
  selectedStorage?: string;
  createdAt: string;
  updatedAt: string;
  product?: SanPham;
  order?: DonHang;
}

// Review - mapping từ DanhGia
export interface Review extends DanhGia {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  helpfulCount?: number;
  createdAt: string;
  updatedAt: string;
  product?: SanPham;
  user?: User;
}

// === COMPATIBILITY TYPES ===
// Product alias cho SanPham (để tương thích với code cũ)
export type Product = SanPham & {
  // Thêm các thuộc tính cũ để tương thích
  id?: string; // Alias cho MaSP
  name?: string; // Alias cho TenSP
  price?: number; // Alias cho GiaBan
  stock?: number; // Alias cho SoLuongTon
  image?: string; // Alias cho HinhAnh (ảnh đầu tiên)
  images?: string[]; // Mảng tất cả hình ảnh
  description?: string; // Alias cho MoTa
  rating?: number; // Alias cho DanhGiaTrungBinh
  reviewCount?: number; // Alias cho SoLuotDanhGia
  sku?: string; // Mã SKU giả lập cho sản phẩm (frontend dùng để hiển thị / lọc)
  createdAt?: string; // Thời điểm giả lập tạo sản phẩm (phục vụ sắp xếp newest)
  selectedColor?: string; // Màu đã chọn khi thêm vào giỏ hàng
  
  // Thuộc tính bổ sung
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  onSale?: boolean;
  featured?: boolean;
  isActive?: boolean;
  
  // Variants
  colorOptions?: Array<{
    name: string;
    hex?: string;
    image?: string;
  }>;
  storageOptions?: Array<{
    capacity: string;
    price: number;
    sku?: string;
  }>;
  
  // Relations với tên cũ
  brand?: NhaCungCap;
  category?: DanhMucSP;
};

// === PAYMENT & SHIPPING TYPES ===

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'cod' | 'vnpay' | 'momo' | 'paypal' | 'stripe' | 'bank_transfer';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  transactionId?: string;
  paymentGateway?: 'vnpay' | 'momo' | 'paypal' | 'stripe';
  gatewayTransactionId?: string;
  paidAt?: string;
  refundedAt?: string;
  notes?: string;
  failureReason?: string;
  refundAmount?: number;
  createdAt: string;
  updatedAt: string;
  // Relations
  order?: Order;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  processingFee: number; // Phí xử lý (%)
  supportRefund: boolean;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  method: Payment['method'];
  returnUrl: string;
  cancelUrl: string;
  description: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  qrCode?: string;
  message: string;
  error?: string;
}

export interface Report {
  id: string;
  type: 'sales' | 'inventory' | 'customer' | 'product' | 'revenue';
  title: string;
  description?: string;
  data: any;
  period: {
    start: string;
    end: string;
  };
  generatedBy: string;
  createdAt: string;
}

export interface ShippingProvider {
  id: string;
  name: string;
  code: 'ghn' | 'ghtk' | 'viettel_post' | 'vnpost';
  apiUrl: string;
  isActive: boolean;
  supportedServices: ShippingService[];
}

export interface ShippingService {
  serviceId: string;
  serviceName: string;
  description: string;
  deliveryTime: string; // "1-2 ngày", "3-5 ngày"
}

export interface ShippingRate {
  serviceId: string;
  serviceName: string;
  fee: number;
  deliveryTime: string;
  provider: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email?: string;
  address: string;
  ward: string;
  wardId?: string;
  district: string;
  districtId?: string;
  city: string;
  cityId?: string;
  isDefault?: boolean;
}

export interface TrackingInfo {
  trackingNumber: string;
  status: 'preparing' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'returned';
  statusText: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
  time: string;
  status: string;
  description: string;
  location?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  pendingOrders: number;
  monthlyRevenue: number;
  monthlyOrders: number;
  // Thống kê theo danh mục
  phoneProducts: number;
  computerProducts: number;
  accessoryProducts: number;
  tabletProducts: number;
  // Doanh thu theo danh mục
  phoneRevenue: number;
  computerRevenue: number;
  accessoryRevenue: number;
  tabletRevenue: number;
  // Top sản phẩm bán chạy theo danh mục
  topSellingProducts: Array<{
    product: SanPham;
    quantitySold: number;
    revenue: number;
  }>;
  topSellingPhones: Array<{
    product: SanPham;
    quantitySold: number;
    revenue: number;
  }>;
  topSellingComputers: Array<{
    product: SanPham;
    quantitySold: number;
    revenue: number;
  }>;
  // Khách hàng VIP
  vipCustomers: Customer[];
  // Sản phẩm cần nhập
  lowStockItems: SanPham[];
  recentOrders: Order[];
  recentCustomers: Customer[];
  // Biểu đồ doanh thu 7 ngày
  revenueChart: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}