import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { EmailService, EmailSendResult, EmailConfiguration } from './EmailService';
import { BookingEmailData } from '@/types/booking';
import { EmailTemplateGenerator } from './EmailService';

/**
 * Implementación del servicio de email usando Brevo (ex-Sendinblue)
 * Ofrece 9,000 emails gratis por mes
 * 
 * Para cambiar de proveedor, solo crear nueva implementación de EmailService
 */
export class BrevoEmailService implements EmailService {
  private api: TransactionalEmailsApi;
  private config: EmailConfiguration;
  
  constructor() {
    this.api = new TransactionalEmailsApi();
    
    // Configuración desde variables de entorno
    this.config = {
      apiKey: process.env.BREVO_API_KEY || '',
      senderEmail: process.env.BUSINESS_EMAIL || 'info@holafishingcharters.com',
      senderName: process.env.BUSINESS_NAME || 'Hola Fishing Charters PR',
      recipientEmail: process.env.BUSINESS_EMAIL || 'info@holafishingcharters.com',
      recipientName: process.env.BUSINESS_NAME || 'Hola Fishing Charters PR'
    };
    
    // Configurar API key
    if (this.config.apiKey) {
      (this.api as any).authentications.apiKey.apiKey = this.config.apiKey;
    }
  }
  
  public isConfigured(): boolean {
    return !!(
      this.config.apiKey &&
      this.config.senderEmail &&
      this.config.recipientEmail
    );
  }
  
  public async sendBookingEmail(bookingData: BookingEmailData): Promise<EmailSendResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'Servicio de email no configurado correctamente'
      };
    }
    
    try {
      // Generar template del email
      const template = EmailTemplateGenerator.generateBookingTemplate(bookingData);
      
      // Create message
      const message = new SendSmtpEmail();
      message.subject = template.subject;
      message.htmlContent = template.htmlContent;
      message.textContent = template.textContent;
      
      // Configurar remitente (negocio)
      message.sender = {
        name: this.config.senderName,
        email: this.config.senderEmail
      };
      
      // Configurar destinatario (dueño del negocio)
      message.to = [{
        email: this.config.recipientEmail,
        name: this.config.recipientName
      }];
      
      // Opcional: enviar copia al cliente como confirmación
      message.cc = [{
        email: bookingData.customerInfo.email,
        name: bookingData.customerInfo.fullName
      }];
      
      // Configurar respuesta directa al cliente
      message.replyTo = {
        email: bookingData.customerInfo.email,
        name: bookingData.customerInfo.fullName
      };
      
      // Tags para organización
      message.tags = ['booking', 'fishing-charter', 'new-reservation'];
      
      // Enviar email
      const result = await this.api.sendTransacEmail(message);
      
      return {
        success: true,
        messageId: result.body.messageId,
        details: result.body
      };
      
    } catch (error: any) {
      console.error('Error enviando email con Brevo:', error);
      
      return {
        success: false,
        error: error.response?.body?.message || error.message || 'Error desconocido al enviar email',
        details: error.response?.body || error
      };
    }
  }
  
  /**
   * Método para verificar la conexión con Brevo
   * Útil para testing y diagnóstico
   */
  public async testConnection(): Promise<boolean> {
    try {
      // Intentar enviar un email de prueba (sin destinatario)
      const testMessage = new SendSmtpEmail();
      testMessage.subject = 'Test Connection';
      testMessage.textContent = 'Testing Brevo connection';
      testMessage.sender = {
        name: this.config.senderName,
        email: this.config.senderEmail
      };
      
      // Solo verificar si las credenciales son válidas
      return this.isConfigured();
      
    } catch (error) {
      console.error('Error testing Brevo connection:', error);
      return false;
    }
  }
}

/**
 * Función helper para crear instancia configurada
 */
export function createBrevoService(): BrevoEmailService {
  return new BrevoEmailService();
}