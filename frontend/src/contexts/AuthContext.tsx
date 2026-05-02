import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types";
import { api } from "../services/api";

interface AuthContextType {
  user: User | null;
  login: (email: string, matKhau: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string,
    matKhau: string,
    hoTen: string,
    soDienThoai: string,
  ) => Promise<boolean>;
  updateProfile: (profileData: Partial<User>, addressType?: string) => void;
  getAllUsers: () => User[];
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          // Verify token validity with backend
          try {
            const introspectResult = await api.introspect(token);
            if (introspectResult && introspectResult.valid) {
              setUser(JSON.parse(storedUser));
            } else {
              // Token invalid
              logout();
            }
          } catch (error) {
            console.error("Session validation failed:", error);
            // On network error, we might keep the local session or clear it
            // For security, let's keep it if we can't reach the server,
            // but the first protected request will fail anyway
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error restoring session:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Load all users from database (Only for admin/staff)
  useEffect(() => {
    const loadUsers = async () => {
      if (!user || (user.role !== "admin" && user.role !== "staff")) return;

      try {
        const users = await api.getUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
    loadUsers();
  }, [user]);

  const login = async (email: string, matKhau: string): Promise<boolean> => {
    try {
      const result = await api.login(email, matKhau);

      if (result.token && result.user) {
        setUser(result.user);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return true;
      }

      return false;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  const register = async (
    email: string,
    matKhau: string,
    hoTen: string,
    soDienThoai: string,
  ): Promise<boolean> => {
    try {
      const userResult = await api.register({
        email,
        matKhau,
        hoTen,
        soDienThoai,
      });

      if (userResult) {
        return await login(email, matKhau);
      }

      return false;
    } catch (error: any) {
      throw error; // Quăng lỗi ra để Modal bắt được message
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.logout(token);
      }
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const updateProfile = (profileData: Partial<User>, addressType?: string) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        ...profileData,
        updatedAt: new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Nếu có cập nhật địa chỉ, đồng bộ về DB (DiaChi) với loại địa chỉ được truyền vào hoặc mặc định "Địa chỉ nhà"
      if (
        typeof profileData.address === "string" &&
        profileData.address.trim()
      ) {
        const finalAddressType = addressType || "Địa chỉ nhà";
        api
          .updateUserAddress(user.id, {
            address: profileData.address,
            addressType: finalAddressType,
          })
          .then(() => {
            console.log(
              `Đã đồng bộ địa chỉ với database (${finalAddressType}).`,
            );
          })
          .catch((err) => {
            console.error("Lỗi khi đồng bộ địa chỉ:", err);
          });
      }
    }
  };

  const getAllUsers = (): User[] => {
    return allUsers;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        getAllUsers,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
