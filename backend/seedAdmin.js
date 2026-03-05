import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const existingAdmin = await Admin.findOne({ username: "nilesh@sontakke" });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("nileshsontakke@ERP", salt);

        const admin = new Admin({
            username: "nilesh@sontakke",
            password: hashedPassword
        });

        await admin.save();
        console.log("Admin seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedAdmin();
