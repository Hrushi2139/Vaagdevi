import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import leadRoutes from './routes/leads';
import testimonialRoutes from './routes/testimonials';
import galleryRoutes from './routes/gallery';
import analyticsRoutes from './routes/analytics';

dotenv.config();

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://vaagdevi.vercel.app'], credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
