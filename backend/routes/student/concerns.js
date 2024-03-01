const router = require('express').Router();
const fetchStudent = require('../../middlewares/fetchStudent');
const StudentModel = require('../../models/StudentModel');

router.post('/', fetchStudent, async (req, res) => {
    const { date,query } = req.body.newForm;
    try {
        const id = req.student.id;
        const checkStudent = await StudentModel.Student.findById(id);
        const isDateExists=checkStudent.addressingConcerns.some((ele)=>ele.date===date)
        // console.log(!isDateExists)
        if (query && query.length >= 10) {
            if (checkStudent && !isDateExists) {
                let maxCounter = 0;

                // Find the maximum counter value in the addressingConcerns array
                checkStudent.addressingConcerns.forEach(entry => {
                    if (entry.form_no > maxCounter) {
                        maxCounter = entry.form_no;
                    }
                });

                // Increment the maxCounter to set the new counter value (i)
                const newCounter = maxCounter + 1;

                // Add the new entry with the incremented counter value
                checkStudent.addressingConcerns.push({
                    date:date,
                    query: query,
                    form_no: newCounter,
                    approvalStatus: false
                });

                await checkStudent.save();

                return res.json({
                    success2: true,
                    message2: "Your query has been saved!!!"
                });
            } else {
                return res.json({
                    success2: false,
                    message2: "Only one form can be submitted on one day!!!"
                });
            }
        } else {
            return res.json({
                success2: false,
                message2: "Your query is too short"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success2: false,
            message2: "An error occurred"
        });
    }
});

router.get('/getHistory', fetchStudent, async (req, res) => {
    let id = req.student.id;
    try {
        const checkStudent = await StudentModel.Student.findById(id);
        
        if (checkStudent) {
            res.status(200).json({
                success2: true,
                message2: checkStudent
            });
        } else {
            res.json({
                success2: false,
                message2: "Student does not exist!!!"
            });
        }
    } catch (err) {
        res.status(500).json({
            success2: false,
            message2: err
        });
        console.log(err);
    }
});

module.exports = router;