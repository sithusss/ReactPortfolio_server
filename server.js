import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();
//mongoose.connect('mongodb://localhost:27017/portfolio');


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use("/api/contact", contactRoutes);

// Serve React static files
app.use(express.static(path.join(__dirname, 'ReactPortfolio_front', 'build')));

// For any other route, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ReactPortfolio_front', 'build', 'index.html'));
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));