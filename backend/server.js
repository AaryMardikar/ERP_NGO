import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoute from "./routes/uploadRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 REGISTER ROUTE
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
  console.log("Server running on port 5000");
});
