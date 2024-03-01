const jwt = require("jsonwebtoken")
const JWT_Secret = process.env.JWT_SECRET;

const fetchStudent = (req, res, next) => {
    let token = req.header("auth-token")
    let success = false
    jwt.verify(token, JWT_Secret, (err, data) => {
        if (data) {
            req.student = data.studentID;
            next();
        }
        else {
            return res.status(500).json({ success, message: err })
        }
    })
}

module.exports = fetchStudent;