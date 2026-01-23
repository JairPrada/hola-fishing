import nodemailer from 'nodemailer';
import { EmailService, EmailSendResult, EmailConfiguration } from './EmailService';
import { BookingEmailData } from '@/types/booking';
import { EmailTemplateGenerator } from './EmailService';

/**
 * Implementación del servicio de email usando Nodemailer + Gmail
 * Gratis, sin límites de verificación, 100% funcional
 */
export class GmailNodemailerService implements EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfiguration;
  
  constructor() {
    this.config = {
      apiKey: '',
      senderEmail: process.env.GMAIL_EMAIL || '',
      senderName: process.env.BUSINESS_NAME || 'Hola Fishing Charters PR',
      recipientEmail: process.env.BOOKING_RECIPIENT_EMAIL || process.env.GMAIL_EMAIL || '',
      recipientName: process.env.BUSINESS_NAME || 'Hola Fishing Charters PR'
    };
    
    // Crear transporter de Nodemailer
    if (this.config.senderEmail && process.env.GMAIL_APP_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.config.senderEmail,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
    }
    
    // Debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('[Gmail Nodemailer] Email Service Config:', {
        senderEmail: this.config.senderEmail,
        recipientEmail: this.config.recipientEmail,
        transporConfigured: !!this.transporter
      });
    }
  }
  
  public isConfigured(): boolean {
    return !!(
      this.transporter &&
      this.config.senderEmail &&
      this.config.recipientEmail &&
      process.env.GMAIL_APP_PASSWORD
    );
  }
  
  public async sendBookingEmail(bookingData: BookingEmailData): Promise<EmailSendResult> {
    console.log('[Gmail Nodemailer] sendBookingEmail called');
    console.log('[Gmail Nodemailer] Config status:', {
      isConfigured: this.isConfigured(),
      hasTransporter: !!this.transporter,
      senderEmail: this.config.senderEmail,
      recipientEmail: this.config.recipientEmail
    });
    
    if (!this.isConfigured()) {
      console.error('[Gmail Nodemailer] Service not configured! Check env variables.');
      return {
        success: false,
        error: 'Gmail Nodemailer service not properly configured. Check GMAIL_EMAIL, GMAIL_APP_PASSWORD, BOOKING_RECIPIENT_EMAIL'
      };
    }
    
    if (!this.transporter) {
      console.error('[Gmail Nodemailer] Transporter is null!');
      return {
        success: false,
        error: 'Email transporter not initialized'
      };
    }
    
    try {
      // Generar template del email
      const template = EmailTemplateGenerator.generateBookingTemplate(bookingData);
      
      const mailOptions = {
        from: `${this.config.senderName} <${this.config.senderEmail}>`,
        to: this.config.recipientEmail,
        cc: bookingData.customerInfo.email,
        replyTo: bookingData.customerInfo.email,
        subject: template.subject,
        html: template.htmlContent,
        text: template.textContent
      };
      
      console.log('[Gmail Nodemailer] Sending email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        cc: mailOptions.cc,
        subject: mailOptions.subject
      });
      
      // Enviar email
      const info = await this.transporter.sendMail(mailOptions);
      
      console.log('[Gmail Nodemailer] Email sent successfully!', {
        messageId: info.messageId,
        response: info.response
      });
      
      return {
        success: true,
        messageId: info.messageId,
        details: {
          response: info.response
        }
      };
      
    } catch (error: any) {
      console.error('[Gmail Nodemailer] Error sending email:', error.message);
      console.error('[Gmail Nodemailer] Full error:', error);
      
      return {
        success: false,
        error: error.message || 'Unknown error sending email',
        details: error
      };
    }
  }
  
  public async testConnection(): Promise<boolean> {
    try {
      if (!this.transporter) {
        return false;
      }
      
      await this.transporter.verify();
      console.log('[Gmail Nodemailer] Connection verified successfully');
      return true;
      
    } catch (error) {
      console.error('Error testing Gmail Nodemailer connection:', error);
      return false;
    }
  }
}

/**
 * Función helper para crear instancia configurada
 */
export function createGmailNodemailerService(): GmailNodemailerService {
  return new GmailNodemailerService();
}
