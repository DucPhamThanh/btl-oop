// API Base URL (Relative to use Vite proxy)
const API_BASE_URL = "/api";

/**
 * Common request wrapper to handle Spring Boot ApiResponse structure and JWT
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("token");

  const isAuthEndpoint = endpoint.startsWith("/auth/");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && !isAuthEndpoint ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle case where response might be empty
  const contentType = response.headers.get("content-type");
  let data: any = null;

  if (contentType && contentType.includes("application/json")) {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } else {
    // If not JSON, it might be an error page or empty
    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`,
      );
    }
  }

  // Handle Spring Boot ApiResponse structure { code, message, result }
  if (!response.ok || (data && data.code && data.code !== 200)) {
    const errorMsg =
      data?.message || response.statusText || "An error occurred";
    throw new Error(errorMsg);
  }

  // If it's a standard ApiResponse, return the result field
  if (data && data.result !== undefined) {
    return data.result as T;
  }

  // Fallback for direct JSON responses if any
  return data as T;
}

/**
 * Helper to map Spring Boot NguoiDung model to frontend User type
 */
function mapUser(user: any): any {
  if (!user) return null;
  return {
    id: user.maND || user.id,
    name: user.hoTen || user.name || user.tenNguoiDung,
    email: user.email,
    phone: user.soDienThoai || user.phone,
    role: mapRole(user.maVaiTro || user.role),
    createdAt: user.ngayDangKy || user.createdAt,
    updatedAt: user.updatedAt || user.ngayDangKy || user.createdAt,
    isActive: true,
  };
}

export function mapRole(role: string): string {
  if (!role) return "customer";

  const r = role.toLowerCase().trim();

  if (r === "kh") return "customer";
  if (r === "ad") return "admin";
  if (r === "nv") return "staff";

  return r;
}

/**
 * Helper to map Spring Boot DanhMuc model to PascalCase
 */
const mapCategory = (category: any) => {
  if (!category) return null;
  return {
    MaDM: category.maDM || category.MaDM,
    TenDM: category.tenDM || category.TenDM,
    Icon: category.icon || category.Icon,
  };
};

/**
 * Helper to map Spring Boot NhaCungCap model to PascalCase
 */
const mapSupplier = (supplier: any) => {
  if (!supplier) return null;
  return {
    MaNCC: supplier.maNCC || supplier.MaNCC,
    TenNCC: supplier.tenNCC || supplier.TenNCC,
  };
};

/**
 * Helper to map Spring Boot SanPham model to frontend Product type
 */
function mapProduct(p: any): any {
  if (!p) return null;
  const imageString = p.image || p.hinhAnh || p.HinhAnh || "";
  const imagesArray = imageString ? imageString.split(";").filter(Boolean) : [];
  const mainImage = imagesArray[0] || "/assets/products/placeholder.jpg";

  return {
    id: (p.maSP || p.id || p.MaSP)?.toString(),
    name: p.tenSP || p.name || p.TenSP,
    description: p.moTa || p.description || p.MoTa || "",
    price: Number(p.giaBan || p.price || p.GiaBan || 0),
    stock: Number(p.soLuongTon || p.stock || p.SoLuongTon || 0),
    image: mainImage,
    images: imagesArray.length > 0 ? imagesArray : [mainImage],
    rating: p.danhGiaTrungBinh || p.rating || p.DanhGiaTrungBinh || 0,
    reviewCount: p.soLuotDanhGia || p.reviewCount || p.SoLuotDanhGia || 0,
    isNew: p.isNew || false,

    // Gọi hàm đã tách
    category: mapCategory(p.danhMuc || p.category),
    nhaCungCap: mapSupplier(p.nhaCungCap || p.supplier),
    brand: mapSupplier(p.nhaCungCap || p.supplier), // Hỗ trợ fallback cho brand

    // Thêm thông số kỹ thuật
    ThongSoKyThuat: {
      ManHinh: p.manhinh,
      CPU: p.cpu,
      RAM: p.ram,
      BoNho: p.boNho,
      Camera: p.camera,
      Pin: p.pin,
      HeDieuHanh: p.heDieuHanh,
      MauSac: p.mauSac,
    },
  };
}

// API Service
export const api = {
  async getHomeData() {
    const data = await request<any>("/home");
    if (data) {
      // Map products to frontend shape
      if (data.latestProducts) {
        data.newProducts = data.latestProducts.map(mapProduct);
      }
      if (data.topRatedProducts) {
        data.topRatedProducts = data.topRatedProducts.map(mapProduct);
      }
    }
    return data;
  },

  // Products
  async getProducts() {
    const products = await request<any[]>("/products");
    return products.map(mapProduct);
  },

  async getProduct(id: string) {
    const product = await request<any>(`/products/${id}`);
    return mapProduct(product);
  },

  async createProduct(data: any) {
    return request<any>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateProduct(id: string, data: any) {
    return request<any>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteProduct(id: string) {
    return request<any>(`/products/${id}`, {
      method: "DELETE",
    });
  },

  // Categories
  async getCategories() {
    return request<any[]>("/categories");
  },

  async createCategory(data: any) {
    return request<any>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateCategory(id: string, data: any) {
    return request<any>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteCategory(id: string) {
    return request<any>(`/categories/${id}`, {
      method: "DELETE",
    });
  },

  // Suppliers
  async getSuppliers() {
    return request<any[]>("/suppliers");
  },

  async createSupplier(data: any) {
    return request<any>("/suppliers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateSupplier(id: string, data: any) {
    return request<any>(`/suppliers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteSupplier(id: string) {
    return request<any>(`/suppliers/${id}`, {
      method: "DELETE",
    });
  },

  // Orders
  async getOrders() {
    return request<any[]>("/orders");
  },

  async getUserOrders(userId: string) {
    return request<any[]>(`/orders/user/${userId}`);
  },

  async createOrder(data: any) {
    return request<any>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateOrderStatus(orderId: string, status: string) {
    return request<any>(`/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  async deleteOrder(orderId: string) {
    return request<any>(`/orders/${orderId}`, {
      method: "DELETE",
    });
  },

  // Users & Auth
  async getUsers() {
    const users = await request<any[]>("/users");
    return users.map(mapUser);
  },

  async login(email: string, matKhau: string) {
    const result = await request<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, matKhau }),
    });

    if (result && result.user) {
      result.user = mapUser(result.user);
    }

    return result;
  },

  async introspect(token: string) {
    return request<any>("/auth/introspect", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  async register(data: any) {
    return request<any>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async logout(token: string) {
    return request<any>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  async updateUserAddress(
    userId: string,
    data: { address: string; addressType?: string },
  ) {
    return request<any>(`/users/${userId}/address`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async getUserAddress(userId: string) {
    return request<any>(`/users/${userId}/address`);
  },

  // Reviews
  async getProductReviews(productId: string) {
    return request<any[]>(`/reviews/product/${productId}`);
  },

  async getProductReviewStats(productId: string) {
    return request<any>(`/reviews/product/${productId}/stats`);
  },

  async addReview(data: any) {
    return request<any>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getOrderReviewedProducts(orderId: string, userId: string) {
    return request<string[]>(`/reviews/order/${orderId}/user/${userId}`);
  },

  async getUserReviews(userId: string) {
    return request<any[]>(`/reviews/user/${userId}`);
  },

  // Check if user has purchased a product
  async hasUserPurchasedProduct(userId: string, productId: string) {
    const data = await request<any>(
      `/orders/user/${userId}/product/${productId}/purchased`,
    );
    return data.hasPurchased || false;
  },

  // Warranty
  async getProductWarranty(productId: string) {
    return request<any>(`/warranty/product/${productId}`);
  },

  async getAllWarranties() {
    return request<any[]>("/warranty");
  },

  async addWarranty(data: any) {
    return request<any>("/warranty", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateWarranty(warrantyId: number, data: any) {
    return request<any>(`/warranty/${warrantyId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteWarranty(warrantyId: number) {
    return request<any>(`/warranty/${warrantyId}`, {
      method: "DELETE",
    });
  },
};
