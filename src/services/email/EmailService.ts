import { BookingEmailData, EmailTemplate } from '@/types/booking';

/**
 * Interfaz abstracta para servicios de email
 * Permite cambiar fácilmente de proveedor (Brevo, Mailgun, Resend, etc.)
 * Aplicando el principio de Inversión de Dependencias
 */
export interface EmailService {
  /**
   * Envía un email de confirmación de reserva
   * @param bookingData - Datos de la reserva
   * @returns Promise con el resultado del envío
   */
  sendBookingEmail(bookingData: BookingEmailData): Promise<EmailSendResult>;
  
  /**
   * Valida la configuración del servicio
   * @returns true si la configuración es válida
   */
  isConfigured(): boolean;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  details?: any;
}

export interface EmailConfiguration {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  recipientEmail: string; // Email del negocio donde llegan las reservas
  recipientName: string;
}

/**
 * Factory para crear instancias de EmailService
 * Patrón Factory para fácil intercambio de servicios
 * 
 * Por defecto usa Gmail Nodemailer (gratis, sin restricciones)
 * Para usar Brevo: EMAIL_PROVIDER=brevo en .env.local
 */
export class EmailServiceFactory {
  private static instance: EmailService | null = null;
  
  public static getService(): EmailService {
    if (!EmailServiceFactory.instance) {
      const emailProvider = process.env.EMAIL_PROVIDER || 'gmail';
      
      console.log('[EmailServiceFactory] Initializing email service:', emailProvider);
      console.log('[EmailServiceFactory] Environment check:', {
        EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
        GMAIL_EMAIL: process.env.GMAIL_EMAIL ? '✓ Set' : '✗ Missing',
        GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? '✓ Set' : '✗ Missing',
        BOOKING_RECIPIENT_EMAIL: process.env.BOOKING_RECIPIENT_EMAIL ? '✓ Set' : '✗ Missing'
      });
      
      if (emailProvider === 'brevo') {
        const { BrevoEmailService } = require('./BrevoEmailService');
        EmailServiceFactory.instance = new BrevoEmailService();
      } else {
        // Gmail Nodemailer es el default
        const { GmailNodemailerService } = require('./GmailNodemailerService');
        EmailServiceFactory.instance = new GmailNodemailerService();
      }
    }
    
    return EmailServiceFactory.instance!;
  }
  
  public static setService(service: EmailService): void {
    EmailServiceFactory.instance = service;
  }
  
  public static reset(): void {
    EmailServiceFactory.instance = null;
  }
}

/**
 * Utilidades para generar templates de email
 */
export class EmailTemplateGenerator {
  public static generateBookingTemplate(data: BookingEmailData): EmailTemplate {
    const subject = `New Booking - ${data.reservationDetails.packageName}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Booking - Hola Fishing Charters</title>
        </head>
        <body style="font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #164765; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #164765; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Booking</h1>
            <p style="color: #E2DDD7; margin: 10px 0 0 0; font-size: 16px;">Hola Fishing Charters Puerto Rico</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e9ecef;">
            <h2 style="color: #164765; margin-top: 0;">Customer Information</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #164765;">Name:</td><td style="padding: 8px 0;">${data.customerInfo.fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #164765;">Phone:</td><td style="padding: 8px 0;">${data.customerInfo.phone}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #164765;">Email:</td><td style="padding: 8px 0;">${data.customerInfo.email}</td></tr>
            </table>
            
            <h2 style="color: #164765;">Booking Details</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #164765;">Package:</td><td style="padding: 8px 0; color: #ED7D2F; font-weight: bold;">${data.reservationDetails.packageName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #164765;">Preferred Date:</td><td style="padding: 8px 0;">${new Date(data.reservationDetails.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #164765;">People:</td><td style="padding: 8px 0;">${data.reservationDetails.numberOfPeople}</td></tr>
            </table>
            
            ${data.reservationDetails.specialRequests ? `
              <h2 style="color: #164765;">Special Requests</h2>
              <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ED7D2F;">
                ${data.reservationDetails.specialRequests}
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 20px; background: #164765; color: white; border-radius: 5px; text-align: center;">
              <p style="margin: 0; font-size: 14px;">Booking received on ${new Date(data.submissionDate).toLocaleString('en-US')}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const textContent = `
      NEW BOOKING - HOLA FISHING CHARTERS
      
      CUSTOMER INFORMATION:
      Name: ${data.customerInfo.fullName}
      Phone: ${data.customerInfo.phone}
      Email: ${data.customerInfo.email}
      
      BOOKING DETAILS:
      Package: ${data.reservationDetails.packageName}
      Preferred Date: ${new Date(data.reservationDetails.preferredDate).toLocaleDateString('en-US')}
      People: ${data.reservationDetails.numberOfPeople}
      
      ${data.reservationDetails.specialRequests ? `SPECIAL REQUESTS:\n${data.reservationDetails.specialRequests}\n\n` : ''}
      
      Booking received on ${new Date(data.submissionDate).toLocaleString('en-US')}
    `;
    
    return {
      subject,
      htmlContent,
      textContent
    };
  }
}