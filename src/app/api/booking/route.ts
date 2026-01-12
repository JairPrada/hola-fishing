import { NextRequest, NextResponse } from 'next/server';
import { BookingFormData, BookingEmailData } from '@/types/booking';
import { EmailServiceFactory } from '@/services/email/EmailService';

/**
 * API Route para procesar reservas de fishing charters
 * POST /api/booking
 */
export async function POST(request: NextRequest) {
  try {
    // Parsear datos del formulario
    const formData: BookingFormData & { submittedAt: string } = await request.json();
    
    // Validate required data
    const requiredFields = ['fullName', 'phone', 'email', 'selectedPackage', 'preferredDate', 'numberOfPeople'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }
    
    // Validate future date
    const selectedDate = new Date(formData.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Selected date must be in the future' 
        },
        { status: 400 }
      );
    }
    
    // Preparar datos para el email
    const bookingEmailData: BookingEmailData = {
      customerInfo: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email
      },
      reservationDetails: {
        packageName: formData.selectedPackage,
        preferredDate: formData.preferredDate,
        numberOfPeople: formData.numberOfPeople,
        specialRequests: formData.specialRequests
      },
      submissionDate: formData.submittedAt
    };
    
    // Obtener servicio de email
    const emailService = EmailServiceFactory.getService();
    
    // Verificar configuración
    if (!emailService.isConfigured()) {
      console.error('Email service not properly configured');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service temporarily unavailable. Please contact directly.' 
        },
        { status: 503 }
      );
    }
    
    // Enviar email
    const emailResult = await emailService.sendBookingEmail(bookingEmailData);
    
    if (!emailResult.success) {
      console.error('Failed to send booking email:', emailResult.error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error sending booking. Please try again or contact directly.',
          details: emailResult.error
        },
        { status: 500 }
      );
    }
    
    // Log successful booking (opcional: guardar en base de datos)
    console.log('Booking submitted successfully:', {
      customer: formData.fullName,
      email: formData.email,
      package: formData.selectedPackage,
      date: formData.preferredDate,
      messageId: emailResult.messageId
    });
    
    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Booking sent successfully! We will contact you soon.',
      data: {
        messageId: emailResult.messageId,
        submittedAt: formData.submittedAt,
        customer: formData.fullName,
        package: formData.selectedPackage
      }
    });
    
  } catch (error) {
    console.error('Error processing booking request:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor intenta de nuevo.',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Manejar métodos no permitidos
 */
export async function GET() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}