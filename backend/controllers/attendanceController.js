import Attendance from "../models/Attendance.js";

// POST /api/attendance - Save attendance for a date (bulk)
export const saveAttendance = async (req, res) => {
    const { date, records } = req.body;
    // records = [{ studentId, status }]

    if (!date || !records || !Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ message: "Date and records are required" });
    }

    try {
        // Check if attendance already exists for this date
        const existing = await Attendance.findOne({ date });
        if (existing) {
            return res.status(409).json({ message: "Attendance for this date has already been recorded and cannot be changed." });
        }

        // Insert all records
        const docs = records.map((r) => ({
            studentId: r.studentId,
            date,
            status: r.status
        }));

        await Attendance.insertMany(docs);
        return res.status(201).json({ message: "Attendance saved successfully", count: docs.length });
    } catch (error) {
        console.error("Save attendance error:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Attendance for this date already exists." });
        }
        return res.status(500).json({ message: "Server error" });
    }
};

// GET /api/attendance?date=YYYY-MM-DD - Get attendance for a specific date
export const getAttendanceByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: "Date query parameter is required" });
    }

    try {
        const records = await Attendance.find({ date }).populate("studentId", "name aadhaar class");
        return res.status(200).json(records);
    } catch (error) {
        console.error("Get attendance error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// GET /api/attendance/student/:studentId - Get all attendance for a specific student
export const getStudentAttendance = async (req, res) => {
    const { studentId } = req.params;

    try {
        const records = await Attendance.find({ studentId }).sort({ date: -1 });
        return res.status(200).json(records);
    } catch (error) {
        console.error("Get student attendance error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
