import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "../types";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// Helper function to get storage key for specific user
const getFavoritesStorageKey = (userId: string) =>
  `oopstore_favorites_${userId}`;
const getLegacyFavoritesStorageKey = (userId: string) =>
  `techstore_favorites_${userId}`;

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (!user || !user.id) {
      // Clear favorites when logged out
      setFavorites([]);
      return;
    }

    try {
      const storageKey = getFavoritesStorageKey(user.id);
      const legacyStorageKey = getLegacyFavoritesStorageKey(user.id);
      const savedFavorites =
        localStorage.getItem(storageKey) ??
        localStorage.getItem(legacyStorageKey);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
        if (!localStorage.getItem(storageKey)) {
          localStorage.setItem(storageKey, savedFavorites);
          localStorage.removeItem(legacyStorageKey);
        }
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!user || !user.id) return;

    try {
      const storageKey = getFavoritesStorageKey(user.id);
      const legacyStorageKey = getLegacyFavoritesStorageKey(user.id);
      if (favorites.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(favorites));
      } else {
        localStorage.removeItem(storageKey);
      }
      localStorage.removeItem(legacyStorageKey);
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites, user]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((item) => item.id === product.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
