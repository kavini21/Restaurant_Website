import { motion } from 'framer-motion';
import DishCard from '../components/DishCard';
import dish1 from '../assets/dish1.png';
import dish2 from '../assets/dish2.png';
import dish3 from '../assets/dish3.png';

const dishes = [
    {
        id: 1,
        image: dish1,
        title: "Signature Ribeye",
        price: "$45",
        description: "Dry-aged for 28 days, served with truffle mashed potatoes."
    },
    {
        id: 2,
        image: dish2,
        title: "Seafood Linguine",
        price: "$32",
        description: "Fresh catch of the day tossed in a white wine garlic sauce."
    },
    {
        id: 3,
        image: dish3,
        title: "Golden Chocolate Dome",
        price: "$18",
        description: "Rich dark chocolate mousse with a molten gold center."
    }
];

const Gallery = () => {
    return (
        <section id="gallery" className="section" style={{ backgroundColor: '#f4f4f4' }}>
            <div className="container">
                <div className="text-center mb-lg">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
                    >
                        Featured Delicacies
                    </motion.h2>
                    <p style={{ color: '#666' }}>Culinary masterpieces crafted for your delight.</p>
                </div>

                <div className="grid grid-3" style={{ gap: '2rem' }}>
                    {dishes.map((dish, index) => (
                        <DishCard key={dish.id} dish={dish} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
