import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectDB();

// Initialize Express app
const app = express();


app.use(
  cors({
    origin: [
      "https://kimimifinal.vercel.app", // Deployed frontend
      "http://localhost:5173",         // Development frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add all methods your app uses
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Accept",
    ],
  })
);


 


// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
