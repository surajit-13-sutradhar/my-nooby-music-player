import mongoose from "mongoose";

export const connectDB = async () => {
	try {
        // Connect to MongoDB
		const conn = await mongoose.connect(process.env.MONGODB_URI)
        // Log the connection host
		console.log(`Connected to MongoDB ${conn.connection.host}`);
	} catch (error) {
		console.log("Failed to connect to MongoDB", error.message);
		process.exit(1); // 1 is failure, 0 is success
	}
};