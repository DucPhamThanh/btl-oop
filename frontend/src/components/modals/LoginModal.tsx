import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  //   Facebook,
  //   Chrome,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postRegisterDialog, setPostRegisterDialog] = useState<{
    open: boolean;
    email: string;
  }>({ open: false, email: "" });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^(0|\+84)[0-9]{9,10}$/.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email là bắt buộc";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      errors.password = "Mật khẩu là bắt buộc";
    } else if (!validatePassword(formData.password)) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (activeTab === "register") {
      if (!formData.name) {
        errors.name = "Họ tên là bắt buộc";
      }

      if (!formData.phone) {
        errors.phone = "Số điện thoại là bắt buộc";
      } else if (!validatePhone(formData.phone)) {
        errors.phone = "Số điện thoại không hợp lệ";
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password);
        setSuccess("Đăng nhập thành công! Đang chuyển hướng...");
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      } else {
        await register(
          formData.email,
          formData.password,
          formData.name,
          formData.phone,
        );
        // Show post-registration dialog
        setSuccess("Đăng ký tài khoản thành công!");
        setPostRegisterDialog({ open: true, email: formData.email });
      }
    } catch (err: any) {
      // Hiển thị trực tiếp lỗi từ Backend (GlobalExceptionHandler)
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setError("");
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      confirmPassword: "",
    });
    setValidationErrors({});
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchTab = (tab: "login" | "register") => {
    setActiveTab(tab);
    resetForm();
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    setError("");
    setSuccess(
      `Đăng nhập với ${provider === "google" ? "Google" : "Facebook"} đang được phát triển...`,
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {activeTab === "login" ? "Đăng nhập" : "Đăng ký"}
                </h2>
                <p className="text-xs text-gray-500">
                  Chào mừng bạn đến với OOP Store
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "register"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Đăng ký
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - Only for Register */}
            {activeTab === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border ${
                      validationErrors.name
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-3 border ${
                    validationErrors.email
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="your.email@example.com"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Phone field - Only for Register */}
            {activeTab === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border ${
                      validationErrors.phone
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                    placeholder="0901234567"
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-12 py-3 border ${
                    validationErrors.password
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {validationErrors.password}
                </p>
              )}
              {activeTab === "register" && !validationErrors.password && (
                <p className="mt-1.5 text-xs text-gray-500">
                  Mật khẩu phải có ít nhất 6 ký tự
                </p>
              )}
            </div>

            {/* Confirm Password - Only for Register */}
            {activeTab === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-12 py-3 border ${
                      validationErrors.confirmPassword
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Forgot password link - Only for Login */}
            {activeTab === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() =>
                    setError("Tính năng quên mật khẩu đang được phát triển")
                  }
                >
                  Quên mật khẩu?
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5">
                <p className="text-red-700 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </p>
              </div>
            )}

            {/* Success Message */}
            {success && !postRegisterDialog.open && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3.5">
                <p className="text-green-700 text-sm flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Đang xử lý...
                </span>
              ) : activeTab === "login" ? (
                "Đăng nhập"
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Hoặc tiếp tục với
              </span>
            </div>
          </div>

          {/* Social Login */} 
          {/* <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Chrome className="h-5 w-5 mr-2 text-red-500" />
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Facebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </button>
          </div> */}

          {/* Terms for Register */}
          {activeTab === "register" && (
            <p className="mt-6 text-xs text-center text-gray-500">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <button className="text-blue-600 hover:underline font-medium">
                Điều khoản dịch vụ
              </button>{" "}
              và{" "}
              <button className="text-blue-600 hover:underline font-medium">
                Chính sách bảo mật
              </button>{" "}
              của chúng tôi
            </p>
          )}
        </div>
      </div>
      {/* Post-Register Success Dialog */}
      {postRegisterDialog.open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[92%] max-w-sm">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  Đăng ký thành công
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Tài khoản {postRegisterDialog.email} đã được tạo. Nhấn OK để
                  quay lại màn hình đăng nhập.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
                onClick={() => {
                  setPostRegisterDialog({ open: false, email: "" });
                  onClose();
                  resetForm();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
