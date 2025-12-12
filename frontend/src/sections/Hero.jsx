import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '../assets/hero_bg_premium.png';
import MovingBorderButton from '../components/MovingBorderButton';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);


    return (
        <section
            id="hero"
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
            }}
        >
            {/* Parallax Background */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    y,
                    zIndex: -1
                }}
            >
                {/* Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)'
                }} />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{
                    textAlign: 'center',
                    zIndex: 1,
                    padding: '0 2rem',
                    opacity
                }}
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        display: 'block',
                        fontSize: '2rem',
                        fontFamily: "Science Gothic, sans-serif",
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '1.5rem',
                        color: 'var(--color-accent)'
                        
                    }}
                >
                    Welcome to
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(4rem, 10vw, 7rem)',
                        fontFamily: '"Momo Signature", cursive',
                        fontWeight: 40,
                        color: 'var(--color-text-light)',
                        lineHeight: 1,
                        marginBottom: '4rem',
                        textShadow: '2px 4px 8px rgba(0,0,0,0.5)',
                    }}
                >
                    Gourmet Haven
                </motion.h1>

             
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    
                    
                    <MovingBorderButton
                        borderRadius="1.75rem"
                        duration={3000}
                        onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                        buttonStyle={{
                            fontSize: '1.1rem',
                            padding: '16px 40px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff'
                        }}
                    >
                        View Menu
                    </MovingBorderButton>
                </motion.div>

                
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1, duration: 1 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    translateX: '-50%',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer'
                }}
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;