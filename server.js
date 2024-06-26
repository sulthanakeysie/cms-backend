
import express, { json } from 'express';
import connectDB from './config/db.js';
import { config } from 'dotenv';
import cors from 'cors'
import customerRoutes from './routes/customerRoutes.js'
import authRoutes from './routes/authRoutes.js'

config();
connectDB();

const app = express();

app.use(json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
