import express from "express" 
import dotenv from "dotenv" 
import { clerkMiddleware } from "@clerk/express" 
import fileUpload from "express-fileupload" 
import path from "path" 
import cors from "cors" 
import fs from "fs" 
import { createServer } from "http" 
import cron from "node-cron" 

import { initializeSocket } from "./lib/socket.js"

import { connectDB } from "./lib/db.js"
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"

// Load environment variables
dotenv.config() 

const __dirname = path.resolve() // This
const app = express() 
// const PORT = process.env.PORT || 5000
const PORT = process.env.PORT 

const httpServer = createServer(app) 
initializeSocket(httpServer) 

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
) 

app.use(express.json())  // to parse req.body
app.use(clerkMiddleware())  // this will add auth to req obj => req.auth

app.use(
	fileUpload({ 
		useTempFiles: true, // This tells the middleware to store uploaded files temporarily on the disk instead of keeping them in the memory
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true, // this option will automatically create the directory specified in tempFileDir if it doesn’t already exist
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
	})
) 

// cron jobs
const tempDir = path.join(process.cwd(), "tmp") 
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err) 
				return 
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {}) 
			}
		}) 
	}
}) 

// 
app.use("/api/users", userRoutes) 
app.use("/api/admin", adminRoutes) 
app.use("/api/auth", authRoutes) 
app.use("/api/songs", songRoutes) 
app.use("/api/albums", albumRoutes) 
app.use("/api/stats", statRoutes) 

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist"))) 
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html")) 
	}) 
}

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
    })
})


// This function starts the server
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT) 
    // And then connect to the database
	connectDB() 
}) 