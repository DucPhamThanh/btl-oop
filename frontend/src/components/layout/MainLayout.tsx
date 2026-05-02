import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { LoginModal } from '../modals/LoginModal';
import { useUI } from '../../contexts/UIContext';

export const MainLayout: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal } = useUI();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />

      {/* Login Modal*/}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
      />
    </div>
  );
};
