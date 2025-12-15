import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ChefHat } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MovingBorderButton from '../../components/MovingBorderButton';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'staff'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        setSuccess('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess('Account created successfully! Redirecting to login...');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
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
                    maxWidth: '480px',
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
                        Create Account
                    </h2>
                    <p style={{ color: '#666' }}>Join Gourmet Haven team</p>
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

                {/* Success Message */}
                {success && (
                    <div style={{
                        backgroundColor: '#efe',
                        border: '1px solid #cfc',
                        color: '#0a0',
                        padding: '1rem',
                        borderRadius: 'var(--border-radius)',
                        marginBottom: '1.5rem'
                    }}>
                        {success}
                    </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: '500'
                        }}>
                            Full Name
                        </label>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <User size={20} style={{
                                position: 'absolute',
                                left: '1rem',
                                color: '#999'
                            }} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
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
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: '500'
                        }}>
                            Password
                        </label>
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
                        <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                            Must be at least 6 characters
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: '500'
                        }}>
                            Confirm Password
                        </label>
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
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
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
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#999'
                                }}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--color-primary)',
                            fontWeight: '500'
                        }}>
                            Role
                        </label>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap'
                        }}>
                            {['admin', 'staff'].map((role) => (
                                <label key={role} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    <span style={{
                                        textTransform: 'capitalize',
                                        color: formData.role === role ? 'var(--color-accent)' : '#666'
                                    }}>
                                        {role}
                                    </span>
                                </label>
                            ))}
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
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-primary)',
                            fontSize: '1rem',
                            padding: '1rem',
                            border: 'none',
                            opacity: loading ? 0.7 : 1
                        }}
                        className="hover:bg-[#bfa030]"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </MovingBorderButton>
                </form>

                {/* Already have account */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e0e0e0'
                }}>
                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                        Already have an account?
                    </p>
                    <Link 
                        to="/login" 
                        style={{
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Login here
                    </Link>
                    <span style={{ margin: '0 0.5rem', color: '#ccc' }}>|</span>
                    <Link 
                        to="/" 
                        style={{
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Back to Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;