/**
 * Tipos para el sistema de reservas
 * Mantiene consistencia con la arquitectura del proyecto
 */

export interface BookingFormData {
  // Información personal
  fullName: string;
  phone: string;
  email: string;
  
  // Detalles de reserva
  selectedPackage: string;
  packageId?: string;
  preferredDate: string;
  numberOfPeople: number;
  
  // Información adicional
  specialRequests?: string;
}

export interface BookingSubmissionData extends BookingFormData {
  submittedAt: string;
  id?: string;
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface BookingEmailData {
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  reservationDetails: {
    packageName: string;
    preferredDate: string;
    numberOfPeople: number;
    specialRequests?: string;
  };
  submissionDate: string;
}

export interface BookingModalState {
  isOpen: boolean;
  selectedPackage?: {
    id: string;
    name: string;
    price: number;
  };
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError?: string;
}

export type BookingStatus = 'idle' | 'loading' | 'success' | 'error';

// Configuración de validación
export interface FormValidation {
  fullName: {
    required: boolean;
    minLength: number;
  };
  phone: {
    required: boolean;
    pattern: RegExp;
  };
  email: {
    required: boolean;
    pattern: RegExp;
  };
  preferredDate: {
    required: boolean;
    minDate: Date;
  };
  numberOfPeople: {
    required: boolean;
    min: number;
    max: number;
  };
}