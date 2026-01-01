const nodemailer = require('nodemailer');

// Create transporter lazily to avoid startup authentication errors
const getTransporter = () => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
        process.env.EMAIL_USER.trim() === '' || process.env.EMAIL_PASS.trim() === '') {
        console.log('Email credentials not configured - email sending disabled');
        return null;
    }
    
    try {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } catch (error) {
        console.log('Failed to create email transporter:', error.message);
        return null;
    }
};

exports.sendReservationEmail = async (reservation) => {
    const transporter = getTransporter();
    
    // Skip sending email if credentials not configured
    if (!transporter) {
        console.log('Email not configured. Skipping reservation confirmation email.');
        return;
    }
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: reservation.email,
        subject: 'Reservation Confirmation - Gourmet Haven',
        html: `
            <h2>Reservation Confirmation</h2>
            <p>Dear ${reservation.name},</p>
            <p>Your reservation has been received and is currently pending confirmation.</p>
            <h3>Reservation Details:</h3>
            <ul>
                <li><strong>Date:</strong> ${new Date(reservation.date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${reservation.time}</li>
                <li><strong>Guests:</strong> ${reservation.guests}</li>
                <li><strong>Reservation ID:</strong> ${reservation._id}</li>
            </ul>
            <p>We will contact you shortly to confirm your reservation.</p>
            <p>Best regards,<br>Gourmet Haven Team</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

exports.sendContactEmail = async (contact) => {
    const transporter = getTransporter();
    
    // Skip sending email if credentials not configured
    if (!transporter) {
        console.log('Email not configured. Skipping contact form email.');
        return;
    }
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Admin email
        subject: `New Contact Form Submission: ${contact.subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <h3>From:</h3>
            <ul>
                <li><strong>Name:</strong> ${contact.name}</li>
                <li><strong>Email:</strong> ${contact.email}</li>
                <li><strong>Phone:</strong> ${contact.phone || 'Not provided'}</li>
            </ul>
            <h3>Message:</h3>
            <p>${contact.message}</p>
        `
    };

    await transporter.sendMail(mailOptions);
};
