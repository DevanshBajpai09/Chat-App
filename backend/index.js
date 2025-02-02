import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRouter from './Route/authRoute.js';
import cookieParser from 'cookie-parser';
import messageRouter from './Route/messageRoute.js';
import cors from 'cors'
import { app , server } from './lib/socket.js';




dotenv.config();


connectDB();

const PORT = process.env.PORT || 5001;
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
