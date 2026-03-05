import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    class: { type: String },
    section: { type: String },
    dob: { type: String },
    name: { type: String, required: true },
    gender: { type: String },
    motherName: { type: String },
    fatherName: { type: String },
    aadhaar: { type: String }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
