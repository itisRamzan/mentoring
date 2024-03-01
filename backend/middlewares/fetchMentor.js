const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_SECRET;

const fetchMentor = (req, res, next) => {
    let token = req.header("auth-token");
    let success = false;
    jwt.verify(token, JWT_Secret, (err, data) => {
        if (data) {
            req.mentor = data.mentorID;
            next();
        }
        else {
            return res.status(500).json({ success, message: `Invalid Token - Cannot Fetch Mentor Details ${err}` });
        }
    })
}

module.exports = fetchMentor;