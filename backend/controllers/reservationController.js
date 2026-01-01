const Reservation = require('../models/Reservation');
const { sendReservationEmail } = require('../utils/emailService');

// Create reservation
exports.createReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, specialRequests } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ 
                message: 'Please fill in all required fields: name, email, phone, date, time, and guests' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        // Validate date is not in the past
        const reservationDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (reservationDate < today) {
            return res.status(400).json({ message: 'Reservation date cannot be in the past' });
        }

        // Validate guests number
        const guestsNum = parseInt(guests);
        if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 20) {
            return res.status(400).json({ message: 'Number of guests must be between 1 and 20' });
        }

        // Validate time format (basic check)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(time)) {
            return res.status(400).json({ message: 'Please provide a valid time format (HH:MM)' });
        }

        // Determine status: allow client to request immediate confirmation
        const requestedConfirm = req.body.confirm === true || req.body.confirm === 'true';
        const requestedStatus = req.body.status === 'confirmed' ? 'confirmed' : undefined;
        const finalStatus = requestedConfirm || requestedStatus === 'confirmed' ? 'confirmed' : 'pending';

        // Create reservation
        const reservation = new Reservation({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            date: reservationDate,
            time: time.trim(),
            guests: guestsNum,
            specialRequests: specialRequests ? specialRequests.trim() : undefined,
            status: finalStatus
        });

        await reservation.save();
        
        // Send confirmation email (non-blocking - won't fail if email service is not configured)
        try {
            await sendReservationEmail(reservation);
        } catch (emailError) {
            console.log('Email sending failed (non-critical):', emailError.message);
            // Continue even if email fails
        }
        
        res.status(201).json({ 
            success: true,
            message: 'Reservation created successfully! We will confirm your reservation shortly.',
            reservation: {
                id: reservation._id,
                name: reservation.name,
                email: reservation.email,
                date: reservation.date,
                time: reservation.time,
                guests: reservation.guests,
                status: reservation.status
            }
        });
    } catch (error) {
        console.error('Reservation creation error:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        
        res.status(400).json({ 
            message: error.message || 'Failed to create reservation. Please try again.' 
        });
    }
};

// Get all reservations (admin only)
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: 1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update reservation status (admin only)
exports.updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};