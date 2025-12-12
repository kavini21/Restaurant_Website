import { motion } from 'framer-motion';
import MovingBorderButton from './MovingBorderButton';

const DishCard = ({ dish, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            style={{
                backgroundColor: '#fff',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{ height: '250px', overflow: 'hidden' }}>
                <motion.img
                    src={dish.image}
                    alt={dish.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                    }}
                />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem' 
                }}>
                    <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontFamily: 'var(--font-heading)' 
                    }}>
                        {dish.title}
                    </h3>
                    <span style={{ 
                        color: 'var(--color-accent)', 
                        fontWeight: 'bold', 
                        fontSize: '1.1rem' 
                    }}>
                        {dish.price}
                    </span>
                </div>
                <p style={{ 
                    color: '#666', 
                    fontSize: '0.9rem', 
                    marginBottom: '1.5rem' 
                }}>
                    {dish.description}
                </p>
                <div style={{ textAlign: 'center' }}>
                    <MovingBorderButton
                        borderRadius="0.5rem"
                        duration={2500}
                        buttonStyle={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            fontSize: '0.95rem',
                            padding: '12px 24px',
                            transition: 'all 0.3s ease'
                        }}
                        className="hover:bg-gradient-to-r hover:from-[var(--color-accent)] hover:to-[#bfa030] hover:text-white hover:border-[var(--color-accent)]"
                    >
                        Order Now
                    </MovingBorderButton>
                </div>
            </div>
        </motion.div>
    );
};

export default DishCard;
