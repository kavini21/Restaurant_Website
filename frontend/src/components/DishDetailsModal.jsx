import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Calendar, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import MovingBorderButton from './MovingBorderButton';
import { reservationService } from '../services/reservationService';

const DishDetailsModal = ({ dish, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Prepare reservation data
            const reservationData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                date: formData.date,
                time: formData.time,
                guests: parseInt(formData.guests),
                specialRequests: formData.specialRequests 
                    ? `${formData.specialRequests.trim()} - Interested in: ${dish.title}`
                    : `Interested in ordering: ${dish.title}`
            };

            // Call reservation service
            const data = await reservationService.createReservation(reservationData);

            // Show success notification
            setSuccess(true);
            
            // Reset form and close modal after 3 seconds
            setTimeout(() => {
                setSuccess(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: 2,
                    specialRequests: ''
                });
                onClose();
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to create reservation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!dish) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 9998,
                            backdropFilter: 'blur(5px)'
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                            overflowY: 'auto',
                            zIndex: 9999
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'fixed',
                                top: '2rem',
                                right: '2rem',
                                background: '#1a1a1a',
                                border: 'none',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10000,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                            }}
                        >
                            <X size={28} color="#fff" />
                        </button>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            minHeight: '100vh',
                            maxWidth: '1400px',
                            margin: '0 auto'
                        }}>
                            {/* Left Side - Dish Details */}
                            <div style={{ 
                                flex: '1 1 50%',
                                padding: '4rem 3rem',
                                minWidth: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    marginBottom: '2rem',
                                    backgroundColor: '#f0f0f0',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                                }}>
                                    <img
                                        src={dish.image}
                                        alt={dish.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <h2 style={{
                                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                                    marginBottom: '1rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 'bold',
                                    lineHeight: '1.2'
                                }}>
                                    {dish.title}
                                </h2>

                                <p style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                                    color: 'var(--color-accent)',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem'
                                }}>
                                    {dish.price}
                                </p>

                                <p style={{
                                    color: '#666',
                                    lineHeight: '1.8',
                                    marginBottom: '2rem',
                                    fontSize: '1.1rem'
                                }}>
                                    {dish.description}
                                </p>

                                <div style={{
                                    padding: '1.25rem',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid var(--color-accent)'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        marginBottom: '0.5rem',
                                        color: 'var(--color-primary)',
                                        fontWeight: '600'
                                    }}>
                                        About This Dish
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        Reserve a table now to enjoy this exquisite dish. Our chefs use only the finest ingredients to create an unforgettable dining experience.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Reservation Form */}
                            <div style={{
                                flex: '1 1 50%',
                                padding: '4rem 3rem',
                                backgroundColor: '#f8f8f8',
                                minWidth: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <h3 style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                                    marginBottom: '2rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 'bold'
                                }}>
                                    Reserve Your Table
                                </h3>

                                {success ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{
                                            padding: '2rem',
                                            textAlign: 'center',
                                            backgroundColor: '#d4edda',
                                            borderRadius: '8px',
                                            border: '1px solid #c3e6cb'
                                        }}
                                    >
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            backgroundColor: '#28a745',
                                            margin: '0 auto 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <h4 style={{ color: '#155724', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
                                            Reservation Confirmed!
                                        </h4>
                                        <p style={{ color: '#155724' }}>
                                            We've sent a confirmation to your email.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {error && (
                                            <div style={{
                                                padding: '1rem',
                                                backgroundColor: '#f8d7da',
                                                border: '1px solid #f5c6cb',
                                                borderRadius: '8px',
                                                color: '#721c24',
                                                marginBottom: '1rem',
                                                fontSize: '0.9rem'
                                            }}>
                                                {error}
                                            </div>
                                        )}

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.95rem'
                                            }}>
                                                <User size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.95rem'
                                            }}>
                                                <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.95rem'
                                            }}>
                                                <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+1 (555) 123-4567"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '1rem',
                                            marginBottom: '1rem'
                                        }}>
                                            <div>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '0.5rem',
                                                    fontWeight: '500',
                                                    color: 'var(--color-primary)',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    <Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        border: '2px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        fontSize: '1rem',
                                                        outline: 'none',
                                                        transition: 'border-color 0.3s',
                                                        boxSizing: 'border-box'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                                />
                                            </div>

                                            <div>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '0.5rem',
                                                    fontWeight: '500',
                                                    color: 'var(--color-primary)',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                    Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        border: '2px solid #e0e0e0',
                                                        borderRadius: '8px',
                                                        fontSize: '1rem',
                                                        outline: 'none',
                                                        transition: 'border-color 0.3s',
                                                        boxSizing: 'border-box'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.95rem'
                                            }}>
                                                <Users size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                Number of Guests
                                            </label>
                                            <input
                                                type="number"
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleChange}
                                                required
                                                min="1"
                                                max="20"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.95rem'
                                            }}>
                                                <MessageSquare size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                                Special Requests (Optional)
                                            </label>
                                            <textarea
                                                name="specialRequests"
                                                value={formData.specialRequests}
                                                onChange={handleChange}
                                                rows="3"
                                                placeholder="Any dietary restrictions or special requirements..."
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    resize: 'vertical',
                                                    transition: 'border-color 0.3s',
                                                    fontFamily: 'inherit',
                                                    boxSizing: 'border-box'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>

                                        <MovingBorderButton
                                            type="submit"
                                            disabled={loading}
                                            borderRadius="8px"
                                            duration={2500}
                                            buttonStyle={{
                                                width: '100%',
                                                backgroundColor: 'var(--color-accent)',
                                                color: 'var(--color-primary)',
                                                fontSize: '1rem',
                                                padding: '1rem',
                                                fontWeight: 'bold',
                                                border: 'none',
                                                opacity: loading ? 0.7 : 1,
                                                cursor: loading ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {loading ? 'Processing...' : 'Confirm Reservation'}
                                        </MovingBorderButton>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Responsive Styles */}
                        <style>{`
                            @media (max-width: 968px) {
                                .modal-content > div {
                                    flex-direction: column !important;
                                }
                            }
                            
                            @media (max-width: 768px) {
                                button[style*="position: fixed"] {
                                    top: 1rem !important;
                                    right: 1rem !important;
                                    width: 44px !important;
                                    height: 44px !important;
                                }
                            }
                        `}</style>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DishDetailsModal;
