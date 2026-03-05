import express from "express";
import { addTeacher, getTeachers } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", addTeacher);
router.get("/", getTeachers);

export default router;
