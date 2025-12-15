import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import '../styles/global.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#footer' },
    ];

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = '/';
    };




    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
                backgroundColor: scrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: scrolled ? '#fff' : '#fff' // Always white on dark hero or dark scrolled nav
            }}
        >
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                Gourmet Haven
            </div>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        style={{ fontWeight: 500, position: 'relative' }}
                        className="nav-link"
                    >
                        {link.name}
                    </a>
                ))}
                
                {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem' }}>
                            Hello, {user?.name}
                        </span>
                        <button
                            onClick={() => window.location.href = '/admin/dashboard'}
                            className="btn btn-primary"
                            style={{
                                padding: '8px 16px',
                                fontSize: '0.9rem'
                            }}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: '1px solid var(--color-accent)',
                                color: 'var(--color-accent)',
                                padding: '8px 16px',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="btn btn-primary"
                    >
                        Staff Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'none' }}>
                {isOpen ? <X /> : <Menu />}
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            backgroundColor: '#1a1a1a',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            alignItems: 'center'
                           
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                style={{ color: '#fff', fontSize: '1.2rem' }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="btn btn-primary" onClick={() => setIsOpen(false)}>Book Now</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-link:hover { color: var(--color-accent); }
      `}</style>
        </nav>
    );
};

export default Navbar;
