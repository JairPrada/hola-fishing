'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { useBooking } from '@/hooks/useBooking';
import { THEME_COLORS } from '@/shared/constants/contact';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: {
    id: string;
    name: string;
    price: number;
  };
}

/**
 * Modal de reservas con formulario completo
 * Mantiene consistencia visual con el resto del sitio
 */
export function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const {
    formData,
    formErrors,
    status,
    updateFormData,
    submitBooking,
    canSubmit
  } = useBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBooking();
  };

  // Generate minimum dates
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`bg-[${THEME_COLORS.PRIMARY_BLUE}] px-6 py-4 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Book Adventure</h2>
                  {selectedPackage && (
                    <p className="text-orange-100 mt-1">{selectedPackage.name}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form or Success Message */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 px-6 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#164765] mb-4">Booking Received!</h3>
                  <p className="text-gray-600 text-lg mb-2">
                    Thank you for your booking request.
                  </p>
                  <p className="text-gray-600 text-lg">
                    A member of our team will contact you shortly to confirm the details.
                  </p>
                </motion.div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#164765] flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors ${
                        formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g: John Doe"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Selected Package */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Package *
                    </label>
                    <select
                      id="selectedPackage"
                      value={formData.selectedPackage}
                      onChange={(e) => updateFormData('selectedPackage', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors ${
                        formErrors.selectedPackage ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a package...</option>
                      <option value="SUNSET / BOOZE CRUISE">SUNSET / BOOZE CRUISE</option>
                      <option value="REEF SNORKELING TOUR">REEF SNORKELING TOUR</option>
                      <option value="NEARSHORE REEF FISHING">NEARSHORE REEF FISHING</option>
                      <option value="NEARSHORE / OFFSHORE FISHING">NEARSHORE / OFFSHORE FISHING</option>
                      <option value="FULL-DAY OFFSHORE FISHING">FULL-DAY OFFSHORE FISHING</option>
                    </select>
                    {formErrors.selectedPackage && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.selectedPackage}</p>
                    )}
                  </div>

                  {/* Phone and Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9+\-\s()]/g, '');
                          updateFormData('phone', value);
                        }}
                        pattern="[0-9+\-\s()]+"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(787) 123-4567"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        required
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="juan@email.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#164765] flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Reservation Details
                  </h3>

                  {/* Preferred Date and People */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        min={minDate}
                        max={maxDate}
                        value={formData.preferredDate}
                        onChange={(e) => updateFormData('preferredDate', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors ${
                          formErrors.preferredDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.preferredDate && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
                        <Users className="w-4 h-4 inline mr-1" />
                        Number of People *
                      </label>
                      <select
                        id="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={(e) => updateFormData('numberOfPeople', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'person' : 'people'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    value={formData.specialRequests || ''}
                    onChange={(e) => updateFormData('specialRequests', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#164765] focus:border-[#164765] transition-colors resize-none"
                    placeholder="e.g., Birthday celebration, special needs, preferences..."
                  />
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={!canSubmit || status === 'loading'}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                      canSubmit && status !== 'loading'
                        ? 'bg-[#ED7D2F] text-white hover:bg-[#ff8c3f]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    whileHover={canSubmit ? { scale: 1.02 } : {}}
                    whileTap={canSubmit ? { scale: 0.98 } : {}}
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      'Book Now'
                    )}
                  </motion.button>
                </div>
              </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}