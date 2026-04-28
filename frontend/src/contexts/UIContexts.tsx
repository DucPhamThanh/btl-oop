import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  showLoginRequired: (message?: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRequiredAlert, setLoginRequiredAlert] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ''
  });

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const showLoginRequired = (message: string = 'Bạn cần đăng nhập để thực hiện chức năng này!') => {
    setLoginRequiredAlert({ show: true, message });
  };

  const handleLoginFromAlert = () => {
    setLoginRequiredAlert({ show: false, message: '' });
    setIsLoginModalOpen(true);
  };

  const handleCloseAlert = () => {
    setLoginRequiredAlert({ show: false, message: '' });
  };

  return (
    <UIContext.Provider value={{
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      showLoginRequired
    }}>
      {children}
      
      {/* Login Required Alert */}
      {loginRequiredAlert.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseAlert}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Yêu cầu đăng nhập</h3>
              </div>
              <button
                onClick={handleCloseAlert}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {loginRequiredAlert.message}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCloseAlert}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleLoginFromAlert}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};
