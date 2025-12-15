const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@gourmethaven.com' });
        
        if (!adminExists) {
            const admin = new User({
                name: 'Admin User',
                email: 'admin@gourmethaven.com',
                password: 'admin123', // Will be hashed by pre-save hook
                role: 'admin'
            });
            
            await admin.save();
            console.log('✅ Default admin created:');
            console.log('Email: admin@gourmethaven.com');
            console.log('Password: admin123');
        } else {
            console.log('✅ Admin already exists');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();