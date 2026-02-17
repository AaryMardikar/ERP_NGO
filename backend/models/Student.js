import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  class: String,
  section: String,
  name: String,
  gender: String,
  dob: String,
  fatherName: String,
  motherName: String,
  aadhaar: {
    type: String,
    unique: true
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
