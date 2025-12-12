import { motion } from 'framer-motion';
import { ChefHat, Utensils, Coffee, Award } from 'lucide-react';

const features = [
    {
        icon: <ChefHat size={40} />,
        title: "Master Chefs",
        description: "Our culinary team brings years of experience from top kitchens around the world."
    },
    {
        icon: <Utensils size={40} />,
        title: "Fresh Ingredients",
        description: "We source our produce daily from local organic farms to ensure the highest quality."
    },
    {
        icon: <Coffee size={40} />,
        title: "Premium Coffee",
        description: "Enjoy our house-roasted blends, perfect for finishing your meal or a mid-day break."
    },
    {
        icon: <Award size={40} />,
        title: "Award Winning",
        description: "Recognized for excellence in service and gastronomy by leading critics."
    }
];

const About = () => {
    return (
        <section id="about" className="section" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                <div className="text-center mb-lg">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
                    >
                        Our Story & Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ maxWidth: '700px', margin: '0 auto', color: '#666' }}
                    >
                        Founded in 2010, Gourmet Haven has been serving exquisite dishes that blend tradition with modern innovation. We believe in the power of food to bring people together.
                    </motion.p>
                </div>

                <div className="grid grid-2" style={{ gap: '3rem' }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: [null, 1.05, 1.1],
                                transition: {
                                    duration: 0.5,
                                    times: [0, 0.6, 1],
                                    ease: ["easeInOut", "easeOut"]
                                }
                            }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                            style={{
                                display: 'flex',
                                gap: '1.5rem',
                                alignItems: 'flex-start',
                                padding: '2rem',
                                backgroundColor: '#f9f9f9',
                                
                                borderRadius: 'var(--border-radius)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ color: 'var(--color-accent)' }}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: '#666' }}>{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
