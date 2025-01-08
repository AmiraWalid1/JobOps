require('dotenv').config();
import express from 'express';
import {connectDB} from './utils/db';
import userRoutes from './routes/user.routes';
import jobRoutes from './routes/job.routes';
import {errorHandler} from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongoDb
void connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

// error handler
app.use(errorHandler);

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
