import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import gigRoutes from './routes/gigs.js';
import bidRoutes from './routes/bids.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gig-flow-3kbxcqgoc-nutanphadtare7-7975s-projects.vercel.app/"
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 GigFlow API is running' });
});

const PORT = process.env.PORT || 5000;

// Add this near the top with other middleware
app.set('trust proxy', 1);

// Update CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});