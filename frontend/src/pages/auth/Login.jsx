import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ChefHat } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MovingBorderButton from '../../components/MovingBorderButton';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            // Replace with your actual API call
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    backgroundColor: '#fff',
                    borderRadius: 'var(--border-radius)',
                    padding: '3rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: '50%',
                        marginBottom: '1rem'
                    }}>
                        <ChefHat size={30} color="#1a1a1a" />
                    </div>
                    <h2 style={{
                        fontSize: '2rem',
                        color: 'var(--color-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Gourmet Haven
                    </h2>
                    <p style={{ color: '#666' }}>Staff Login Portal</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        border: '1px solid #fcc',
                        color: '#c00',
                        padding: '1rem',
                        borderRadius: 'var(--border-radius)',
                        marginBottom: '1.5rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: '500'
                        }}>
                            Email Address
                        </label>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Mail size={20} style={{
                                position: 'absolute',
                                left: '1rem',
                                color: '#999'
                            }} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="staff@gourmethaven.com"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem 0.875rem 3rem',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: 'var(--border-radius)',
                                    fontSize: '1rem',
                                    transition: 'var(--transition)',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            <label style={{
                                color: 'var(--color-primary)',
                                fontWeight: '500'
                            }}>
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-accent)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Lock size={20} style={{
                                position: 'absolute',
                                left: '1rem',
                                color: '#999'
                            }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 3rem 0.875rem 3rem',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: 'var(--border-radius)',
                                    fontSize: '1rem',
                                    transition: 'var(--transition)',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#999'
                                }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <MovingBorderButton
                        type="submit"
                        disabled={loading}
                        borderRadius="0.5rem"
                        duration={2500}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'var(--color-primary)',
                            color: '#fff',
                            fontSize: '1rem',
                            padding: '1rem',
                            border: 'none',
                            opacity: loading ? 0.7 : 1
                        }}
                        className="hover:bg-[#2a2a2a]"
                    >
                        {loading ? 'Logging in...' : 'Login to Dashboard'}
                    </MovingBorderButton>
                </form>

                {/* Demo Credentials */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#f9f9f9',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.875rem',
                    color: '#666'
                }}>
                    <strong>Demo Credentials:</strong><br />
                    Email: admin@gourmethaven.com<br />
                    Password: admin123
                </div>

                {/* Back to Home */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e0e0e0'
                }}>
                    <Link 
                        to="/" 
                        style={{
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        ← Back to Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;