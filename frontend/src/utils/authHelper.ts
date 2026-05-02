export const authHelper = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAdmin: () => {
    const user = authHelper.getCurrentUser();
    return user?.role === 'admin';
  },

  logout: () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};
