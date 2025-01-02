require('dotenv').config();
import express from 'express';
import {connectDB} from './utils/db';
import userRoutes from './routes/user.routes';
// import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongoDb
void connectDB();

// middleware
app.use(express.json());
// app.use(errorHandler);

// routes
app.use('/api/users', userRoutes);

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
