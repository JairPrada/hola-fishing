import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BookingFormData, BookingModalState, BookingStatus } from '@/types/booking';

/**
 * Hook personalizado para manejar el estado y lógica del modal de reservas
 * Aplica el patrón de separación de responsabilidades
 */
export function useBooking() {
  const [modalState, setModalState] = useState<BookingModalState>({
    isOpen: false,
    isSubmitting: false,
    submitSuccess: false
  });
  
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    selectedPackage: '',
    preferredDate: '',
    numberOfPeople: 1,
    specialRequests: ''
  });
  
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [status, setStatus] = useState<BookingStatus>('idle');
  
  /**
   * Abre el modal con un paquete preseleccionado
   */
  const openModal = useCallback((packageInfo?: { id: string; name: string; price: number }) => {
    setModalState({
      isOpen: true,
      selectedPackage: packageInfo,
      isSubmitting: false,
      submitSuccess: false,
      submitError: undefined
    });
    
    // Pre-llenar el paquete seleccionado
    if (packageInfo) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: packageInfo.name,
        packageId: packageInfo.id
      }));
    }
    
    // Limpiar errores previos
    setFormErrors({});
    setStatus('idle');
  }, []);
  
  /**
   * Cierra el modal y resetea el estado
   */
  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      isSubmitting: false,
      submitSuccess: false
    });
    
    // Resetear formulario después de cerrar
    setTimeout(() => {
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        selectedPackage: '',
        preferredDate: '',
        numberOfPeople: 1,
        specialRequests: ''
      });
      setFormErrors({});
      setStatus('idle');
    }, 300);
  }, []);
  
  /**
   * Actualiza los datos del formulario
   */
  const updateFormData = useCallback((field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo que se está editando
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [formErrors]);
  
  /**
   * Valida el formulario completo
   */
  const validateForm = useCallback((): boolean => {
    const errors: Partial<Record<keyof BookingFormData, string>> = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters long';
    }
    
    // Validate phone
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Invalid phone number format';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    // Validate preferred date
    if (!formData.preferredDate) {
      errors.preferredDate = 'Date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.preferredDate = 'Date must be in the future';
      }
    }
    
    // Validate number of people
    if (formData.numberOfPeople < 1) {
      errors.numberOfPeople = 'Must be at least 1 person';
    } else if (formData.numberOfPeople > 12) {
      errors.numberOfPeople = 'Maximum 12 people per booking';
    }

    // Validate selected package
    if (!formData.selectedPackage?.trim()) {
      errors.selectedPackage = 'Package selection is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  /**
   * Envía el formulario de reserva
   */
  const submitBooking = useCallback(async () => {
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setStatus('loading');
    setModalState(prev => ({ ...prev, isSubmitting: true, submitError: undefined }));
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error sending booking');
      }
      
      const result = await response.json();
      
      setStatus('success');
      setModalState(prev => ({
        ...prev,
        isSubmitting: false,
        submitSuccess: true
      }));
      
      toast.success('Booking sent successfully! We will contact you soon.', {
        duration: 5000
      });
      
      // Cerrar modal después de 5 segundos para que el mensaje sea visible
      setTimeout(() => {
        closeModal();
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      
      setStatus('error');
      setModalState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error.message
      }));
      
      toast.error(error.message || 'Error sending booking. Please try again.', {
        duration: 5000
      });
    }
  }, [formData, validateForm, closeModal]);
  
  return {
    // Estado
    modalState,
    formData,
    formErrors,
    status,
    
    // Acciones
    openModal,
    closeModal,
    updateFormData,
    submitBooking,
    validateForm,
    
    // Estados calculados
    isFormValid: Object.keys(formErrors).length === 0 && formData.fullName && formData.email && formData.phone && formData.preferredDate,
    canSubmit: status !== 'loading' && 
               formData.fullName.trim().length >= 2 && 
               formData.email.trim() && 
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
               formData.phone.trim() && 
               formData.selectedPackage?.trim() &&
               formData.preferredDate
  };
}