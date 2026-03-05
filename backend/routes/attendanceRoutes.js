import express from "express";
import { saveAttendance, getAttendanceByDate, getStudentAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", saveAttendance);
router.get("/", getAttendanceByDate);
router.get("/student/:studentId", getStudentAttendance);

export default router;
