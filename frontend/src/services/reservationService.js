const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const reservationService = {
    // Create a new reservation
    createReservation: async (reservationData) => {
        const response = await fetch(`${API_BASE}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Reservation failed');
        }

        return data;
    }
};

