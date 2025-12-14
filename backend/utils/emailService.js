const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendReservationEmail = async (reservation) => {
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