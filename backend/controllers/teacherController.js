import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher.js";

export const addTeacher = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ username });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher with this username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newTeacher = new Teacher({
            name,
            username,
            password: hashedPassword,
            rawPassword: password
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher added successfully", teacher: newTeacher });
    } catch (error) {
        console.error("Add teacher error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select("name username rawPassword createdAt");
        res.status(200).json(teachers);
    } catch (error) {
        console.error("Get teachers error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
