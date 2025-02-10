require('dotenv').config();
import express from 'express';
import {connectDB} from './utils/db';
import {errorHandler} from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongoDb
void connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', routes);

// error handler
app.use(errorHandler);

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
