import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import Student from "../models/Student.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype === "application/vnd.ms-excel"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only Excel files are allowed"));
        }
    }
});

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rawData = XLSX.utils.sheet_to_json(sheet, {
            range: 4,
            defval: ""
        });
        console.log("First Row Raw:");
        console.log(rawData[0]);

        if (!rawData || rawData.length === 0) {
            return res.status(400).json({ message: "Excel file is empty" });
        }

        const cleanedData = rawData
            .map((row) => ({
                class: row["(1)"] || "",
                section: row["(2)"] || "",
                dob: row["(3)"] || "",
                name: row["(4)"] || "",
                gender: row["(5)"] || "",
                motherName: row["(6)"] || "",
                fatherName: row["(7)"] || "",
                aadhaar: row["(9)"] || ""
            }))
            .filter((student) => student.name && student.aadhaar);

        if (cleanedData.length === 0) {
            return res.status(400).json({
                message: "No valid student rows found after cleaning"
            });
        }

        console.log("Preview:", cleanedData.slice(0, 3));

        const existing = await Student.find({
            aadhaar: { $in: cleanedData.map((s) => s.aadhaar) }
        }).select("aadhaar");

        const existingSet = new Set(existing.map((e) => e.aadhaar));

        const newStudents = cleanedData.filter(
            (s) => !existingSet.has(s.aadhaar)
        );

        if (newStudents.length === 0) {
            return res.status(400).json({
                message: "All students already exist"
            });
        }

        await Student.insertMany(newStudents);

        return res.status(200).json({
            message: "Excel Data Uploaded Successfully",
            insertedCount: newStudents.length
        });

    } catch (error) {
        console.error("Upload Error:", error.message);
        return res.status(500).json({
            message: "Upload Failed",
            error: error.message
        });
    }
});

export default router;
