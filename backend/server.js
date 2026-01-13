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

// ✅ TRUST PROXY (must be early)
app.set('trust proxy', 1);

// Connect to database
connectDB();

// ✅ ALLOWED ORIGINS (EXACT MATCH, no slash)
const allowedOrigins = [
  "http://localhost:5173",
  "https://gig-flow-nine.vercel.app"
];

// ✅ CORS (ONLY ONCE)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

// Other middleware
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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
