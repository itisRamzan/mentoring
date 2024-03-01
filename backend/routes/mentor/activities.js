const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const StudentModel = require("../../models/StudentModel");
const fetchStudent = require("../../middlewares/fetchStudent");
const fetchMentor = require("../../middlewares/fetchMentor");

// Late Arrival Section
// 1. View all Late Arrivals
router.get("/lateArrivals", fetchMentor, async (req, res) => {
    let success = false;
    try {
        let id = req.mentor.id;
        const students = await StudentModel.Student.find().select("name rollNo lateArrivals status -_id").sort({ rollNo: 1 });
        success = true;
        return res.status(200).json({ success, students });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});

// 2. View all Late Arrivals of a particular student
router.get("/lateArrivals/:studentId", fetchMentor, async (req, res) => {
    let success = false;
    try {
        let student = await StudentModel.Student.findById(req.params.studentId).select("name rollNo lateArrivals status -_id");
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        success = true;
        return res.status(200).json({ success, student });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});

// 3. Accept or reject a student late arrival
router.post("/lateArrivals/:studentId/:lateArrivalId", fetchMentor, async (req, res) => {
    let success = false;
    let { status } = req.body;
    try {
        let student = await StudentModel.Student.findById(req.params.studentId);
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        let lateArrival = student.lateArrivals.find(lateArrival => lateArrival.id === req.params.lateArrivalId);
        if (!lateArrival) {
            return res.status(404).json({ success, message: "Late Arrival Not Found" });
        }
        lateArrival.status = status;
        await student.save();
        success = true;
        return res.status(200).json({ success, lateArrival });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});


// Achievements Section
// 1. View all Achievements
router.get("/achievements", fetchMentor, async (req, res) => {
    let success = false;
    try {
        let id = req.mentor.id;
        const students = await StudentModel.Student.find().select("name rollNo achievements status -_id").sort({ rollNo: 1 });
        success = true;
        return res.status(200).json({ success, students });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});

// 2. View all achievements of a particular student
router.get("/achievements/:studentId", fetchMentor, async (req, res) => {
    let success = false;
    try {
        let student = await StudentModel.Student.findById(req.params.studentId).select("name rollNo achievements status -_id");
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        success = true;
        return res.status(200).json({ success, student });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});

// 3. Accept or reject a student achievement
router.post("/achievements/:studentId/:achievementId", fetchMentor, async (req, res) => {
    let success = false;
    let { status } = req.body;
    try {
        let student = await StudentModel.Student.findById(req.params.studentId);
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        let achievement = student.achievements.find(achievement => achievement.id === req.params.achievementId);
        if (!achievement) {
            return res.status(404).json({ success, message: "Achievement Not Found" });
        }
        achievement.status = status;
        await student.save();
        success = true;
        return res.status(200).json({ success, achievement });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});

module.exports = router;