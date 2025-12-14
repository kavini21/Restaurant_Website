const Reservation = require('../models/Reservation');
const { sendReservationEmail } = require('../utils/emailService');

// Create reservation
exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        
        // Send confirmation email
        await sendReservationEmail(reservation);
        
        res.status(201).json({ 
            message: 'Reservation created successfully',
            reservation 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
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