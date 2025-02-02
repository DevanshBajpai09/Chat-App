import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure this is called before accessing process.env

const connectDB = async () => {
    try {
        console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug the value

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
