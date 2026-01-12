'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { BookingModal } from '@/components/booking/BookingModal';
import { useBooking } from '@/hooks/useBooking';
import { THEME_COLORS } from '@/shared/constants/contact';

interface BookingContextType {
  openBookingModal: (packageInfo?: { id: string; name: string; price: number }) => void;
  closeBookingModal: () => void;
  isModalOpen: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

/**
 * Provider para el contexto de reservas
 * Maneja el estado global del modal de reservas
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const { modalState, openModal, closeModal } = useBooking();

  const contextValue: BookingContextType = {
    openBookingModal: openModal,
    closeBookingModal: closeModal,
    isModalOpen: modalState.isOpen
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
      
      {/* Modal global de reservas */}
      <BookingModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        selectedPackage={modalState.selectedPackage}
      />
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#164765',
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '14px'
          },
          success: {
            style: {
              background: '#164765',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#ED7D2F',
            },
          },
          error: {
            style: {
              background: '#dc2626',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#dc2626',
            },
          }
        }}
      />
    </BookingContext.Provider>
  );
}

/**
 * Hook para usar el contexto de reservas
 */
export function useBookingContext(): BookingContextType {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used inside BookingProvider');
  }
  return context;
}

/**
 * Componente de botón para abrir modal de reservas
 * Reutilizable en cualquier parte de la aplicación
 */
interface BookNowButtonProps {
  packageInfo?: {
    id: string;
    name: string;
    price: number;
  };
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export function BookNowButton({ 
  packageInfo, 
  children, 
  className = '', 
  size = 'md',
  variant = 'primary'
}: BookNowButtonProps) {
  const { openBookingModal } = useBookingContext();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: `bg-[${THEME_COLORS.SECONDARY_BEIGE}] text-[${THEME_COLORS.PRIMARY_BLUE}] hover:bg-[${THEME_COLORS.PRIMARY_ORANGE}] hover:text-white`,
    secondary: `bg-white text-[${THEME_COLORS.PRIMARY_BLUE}] border-2 border-[${THEME_COLORS.PRIMARY_BLUE}] hover:bg-[${THEME_COLORS.PRIMARY_BLUE}] hover:text-white`
  };

  return (
    <button
      onClick={() => openBookingModal(packageInfo)}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-semibold rounded-lg transition-all duration-300 
        transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[${THEME_COLORS.PRIMARY_BLUE}] focus:ring-offset-2
        ${className}
      `}
    >
      {children || 'BOOK NOW!'}
    </button>
  );
}