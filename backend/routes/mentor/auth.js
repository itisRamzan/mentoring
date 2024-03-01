const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const StudentModel = require("../../models/StudentModel")
const fetchStudent = require("../../middlewares/fetchStudent");
const fetchMentor = require("../../middlewares/fetchMentor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MentorModel } = require("../../models/MentorModel")
const JWT_Secret = process.env.JWT_SECRET;

router.post("/signup", [
    body("name", "Enter Valid Name").isString(),
    body("password", "Enter Valid Password").isLength({ min: 5 }),
    body("email", "Enter Valid Email").isEmail()]
    , async (req, res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success, errors: result.array() });
        }
        try {
            let mentor = await MentorModel.findOne({ email: req.body.email });
            if (mentor) {
                return res.status(400).json({ success, message: "Sorry a Mentor with this Roll Number already exists!" });
            }
            let salt = bcrypt.genSaltSync(10);
            let secPass = bcrypt.hashSync(req.body.password, salt);
            mentor = await MentorModel.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                mentorID: {
                    id: mentor.id
                }
            }
            let authToken = jwt.sign(data, JWT_Secret);
            success = true;
            return res.status(200).json({ success, authToken });
        }
        catch (err) {
            return res.status(500).json({ success, message: err.message });
        }
    })

router.post("/login", async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    try {
        let mentor = await MentorModel.findOne({ email });
        if (!mentor) {
            return res.status(400).json({ success, message: "Incorrect Credentials" });
        }
        const comparePass = bcrypt.compareSync(password, mentor.password);
        if (!comparePass) {
            return res.status(400).json({ success, message: "Incorrect Credentials" });
        }
        const data = {
            mentorID: {
                id: mentor.id
            }
        }
        const authToken = jwt.sign(data, JWT_Secret);
        success = true;
        return res.status(200).json({ success, authToken });
    }
    catch (err) {
        return res.status(500).json({ success, message: err.message })
    }
})

router.get("/getMentorDetails", fetchMentor, async (req, res) => {
    let success = false
    try {
        let id = req.mentor.id;
        const mentor = await MentorModel.findById(id).select("-password -__v -_id");
        if (mentor == null) {
            return res.status(400).json({ success, message: "Mentor Not Found" })
        }
        success = true;
        return res.status(200).json({ success, mentor });
    }
    catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
})

router.put("/updateMentorDetails", fetchMentor, async (req, res) => {
    let success = false;
    try {
        let id = req.mentor.id;
        const mentor = await MentorModel.findById(id);
        if (mentor == null) {
            return res.status(400).json({ success, message: "Mentor Not Found" })
        }
        // mentor.name = req.body.name;
        // mentor.email = req.body.email;
        // update the code to edit mentor details
        await mentor.save();
        success = true;
        return res.status(200).json({ success, mentor });
    }
    catch (err) {
        return res.status(500).json({ success, message: err.message });
    }
})

router.get('/getStudents', fetchMentor, async (req, res) => {
    try {
        const students = await StudentModel.Student.find({});
        if (students.length > 0) {
            return res.status(200).json({
                success: true,
                students
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No students found in the database"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Failed to fetch students."
        });
    }
});

router.post('/getParticularStudent', fetchMentor, async (req, res) => {
    const rollNo = req.body.rollNo;
    if (rollNo) {
        try {
            const findStudent = await StudentModel.Student.find({ rollNo })
            if (findStudent) {
                return res.status(200).json({
                    success: true,
                    message: findStudent[0]
                })
            }
            else {
                return res.json({
                    success: false,
                    message: "no student found with that roll no"
                })
            }
        }
        catch (err) {

            console.log(err)
        }
    }
    else {
        console.log("error no rollno")
        return res.json({
            success: false,
            message: "not a valid rollno"
        })
    }
})

module.exports = router