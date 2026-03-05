import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";

export const login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (role === 'admin' || !role) {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const token = jwt.sign(
                { id: admin._id, username: admin.username, role: 'admin' },
                process.env.JWT_SECRET || "fallback_secret",
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                admin: {
                    id: admin._id,
                    username: admin.username
                }
            });
        }

        if (role === 'student') {
            const name = username;
            const studentId = password;

            if (!name || !studentId || studentId.length !== 4) {
                return res.status(400).json({ message: "Please provide valid Name and 4-digit Student ID" });
            }

            const students = await Student.find({
                name: new RegExp(`^${name}$`, "i")
            });

            const student = students.find(s =>
                (s.aadhaar && s.aadhaar.endsWith(studentId)) ||
                (s._id && s._id.toString().endsWith(studentId))
            );

            if (!student) {
                return res.status(401).json({ message: "Invalid Student Name or ID" });
            }

            const token = jwt.sign(
                { id: student._id, name: student.name, role: 'student' },
                process.env.JWT_SECRET || "fallback_secret",
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "Login successful",
                token,
                student: {
                    id: student._id,
                    name: student.name
                }
            });
        }

        return res.status(400).json({ message: "Invalid role specified" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
