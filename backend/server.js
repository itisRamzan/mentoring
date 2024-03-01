require("dotenv").config()
const database = require("./database/db");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

database.connectDB();

const app = express();
app.use(cors())
app.use(express.json());

// Student Routes
app.use("/api/student/auth", require("./routes/student/auth"));
app.use("/api/student/activities", require("./routes/student/activities"));
app.use('/api/student/undertakingForm',require('./routes/student/undertakingForm'));
app.use('/api/student/marks',require('./routes/student/marks'));
app.use('/api/student/concerns',require('./routes/student/concerns'));


// Mentor Routes
app.use("/api/mentor/auth", require("./routes/mentor/auth"));
app.use("/api/mentor/activities", require("./routes/mentor/activities"));
app.use('/api/mentor/fetchStudent',require('./routes/mentor/fetchStudents'))
app.use('/api/mentor/marks',require('./routes/mentor/marks'))
app.use('/api/mentor/undertakingForm',require('./routes/mentor/undertakingForm'))
app.use('/api/mentor/addressingConcerns',require('./routes/mentor/addressingConcern'))

app.listen(port, () => {
    console.log(`Connected Server http://localhost:${port}`);
})