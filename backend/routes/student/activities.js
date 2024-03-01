const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
const StudentModel = require("../../models/StudentModel");
const fetchStudent = require("../../middlewares/fetchStudent");

// Late Arrival Section
router.post("/addLateArrival", [
    // body("date", "Enter Valid Date").isDate(),
    body("reason", "Enter Valid Reason").isString().isLength({ min: 8, max: 100 }),
    body("period", "Enter Valid Period").isNumeric().matches(/^[1-6]$/),
    body("semester", "Enter Valid Semester").isNumeric()],
    fetchStudent, async (req, res) => {
        let success = false
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ success, errors: result.array() })
        }
        try {
            let id = req.student.id
            const student = await StudentModel.Student.findById(id)
            if (!student) {
                return res.status(404).json({ success, message: "Student Not Found" })
            }
            const { date, reason, period, semester } = req.body
            const existingLateArrival = student.lateArrivals.find(lateArrival => lateArrival.date === date && lateArrival.period === period)
            if (existingLateArrival) {
                return res.status(400).json({ success, message: "A late arrival already exists for this date and period" })
            }
            student.lateArrivals.push({ date, reason, period, semester })
            await student.save();
            success = true
            return res.status(200).json({ success, lateArrivals: student.lateArrivals })
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message })
        }
    })

router.delete("/deleteLateArrival/:lateArrivalId", fetchStudent, async (req, res) => {
    let success = false;
    try {
        const student = await StudentModel.Student.findById(req.student.id);
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        const lateArrival = student.lateArrivals.find(lateArrival => lateArrival.id === req.params.lateArrivalId);
        if (!lateArrival) {
            return res.status(404).json({ success, message: "Late Arrival Not Found" });
        }
        student.lateArrivals = student.lateArrivals.filter(lateArrival => lateArrival.id !== req.params.lateArrivalId);
        await student.save();
        success = true;
        return res.status(200).json({ success, student });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
});

router.get("/lateArrivals", fetchStudent, async (req, res) => {
    try {
        const student = await StudentModel.Student.findById(req.student.id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student Not Found" });
        }
        return res.status(200).json({ success: true, lateArrivals: student.lateArrivals });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});


// Achievements Section
router.post("/addAchievement",[
    body("title", "Enter Valid Title").isString().isLength({ min: 4}),
    body("conductedBy", "Invalid Conducted By Name").isString().isLength({ max: 20 }),
    body("description", "Enter Valid Description").isString().isLength({max: 100 }),
    body("date", "Enter Valid Date").isDate()], fetchStudent, 
    async (req, res) => {
        let success = false
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ success, errors: result.array() })
        }
        try {
            let id = req.student.id
            const student = await StudentModel.Student.findById(id)
            if (!student) {
                return res.status(404).json({ success, message: "Student Not Found" })
            }
            const { title, conductedBy, description, date } = req.body
            const existingAchievement = student.achievements.find(achievement => achievement.title === title && achievement.conductedBy === conductedBy && achievement.description === description && achievement.date === date)
            if (existingAchievement) {
                return res.status(400).json({ success, message: "An achievement already exists with the same details" })
            }
            student.achievements.push({ title, conductedBy, description, date })
            
            await student.save();
            success = true
            return res.status(200).json({ success, student })
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message })
        }
    }
)

router.delete("/deleteAchievement/:achievementId", fetchStudent, async (req, res) => {
    let success = false;
    try {
        const student = await StudentModel.Student.findById(req.student.id);
        if (!student) {
            return res.status(404).json({ success, message: "No Such Student" });
        }
        const achievement = student.achievements.find(achievement => achievement.id === req.params.achievementId);
        if (!achievement) {
            return res.status(404).json({ success, message: "Achievement Not Found" });
        }
        student.achievements = student.achievements.filter(achievement => achievement.id !== req.params.achievementId);
        await student.save();
        success = true;
        return res.status(200).json({ success, student });
    } catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
})

// i am the change

module.exports = router;