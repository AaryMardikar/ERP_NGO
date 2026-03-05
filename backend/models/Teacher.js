import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rawPassword: { type: String }
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
