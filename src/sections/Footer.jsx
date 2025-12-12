import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="footer" style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div className="grid grid-3" style={{ gap: '4rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Gourmet Haven</h3>
                        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                            Elevating the dining experience with passion and creativity since 2010.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: '#fff', transition: 'color 0.3s' }}><Facebook /></a>
                            <a href="#" style={{ color: '#fff', transition: 'color 0.3s' }}><Instagram /></a>
                            <a href="#" style={{ color: '#fff', transition: 'color 0.3s' }}><Twitter /></a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>Contact Us</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.8rem', color: '#aaa' }}>
                                <MapPin size={20} color="var(--color-accent)" />
                                <span>123 Culinary Avenue, Food City, FC 90210</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem', color: '#aaa' }}>
                                <Phone size={20} color="var(--color-accent)" />
                                <span>(071 123-4567</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem', color: '#aaa' }}>
                                <Mail size={20} color="var(--color-accent)" />
                                <span>reservations@gourmethaven.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>Opening Hours</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#aaa' }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Mon - Thu:</span>
                                <span>5:00 PM - 10:00 PM</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Fri - Sat:</span>
                                <span>5:00 PM - 11:00 PM</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Sunday:</span>
                                <span>4:00 PM - 9:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                
            </div>
        </footer>
    );
};

export default Footer;
