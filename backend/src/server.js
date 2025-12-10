require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// attempt DB connection but don't crash the server if it fails
(async () => {
	const connected = await connectDB();
	if (!connected) {
		console.warn('Warning: continuing without a database connection — some routes may fail.');
	}
})();
const app = express();

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 })); // basic rate limit

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dishes', require('./routes/dishes'));
app.use('/api/inquiries', require('./routes/inquiries'));

// error handler last
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
