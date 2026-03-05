import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoute from "./routes/uploadRoute.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 REGISTER ROUTE
app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api", uploadRoute);

// 🔥 CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err.message);
    });

// 🔥 START SERVER (THIS IS IMPORTANT)
app.listen(5000, () => {
    console.log("Server running on port 5000 - with Student Routes");
});
