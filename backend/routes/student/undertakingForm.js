const router = require('express').Router();
const fetchStudent=require('../../middlewares/fetchStudent')
const undertaking = require('../../models/StudentModel');

router.post('/', fetchStudent, async (req, res) => {
  const { date, reason, address } = req.body;
  const id = req.student.id;
  try {
    const findForm = await undertaking.Student.findById(id);
    if (findForm) {
      const isDateExists = findForm.undertakingForm.some((ele) => ele.date === date);
      if (!isDateExists) {
        let maxFormNo = 0;
        findForm.undertakingForm.forEach((form) => {
          if (form.form_no > maxFormNo) {
            maxFormNo = form.form_no;
          }
        });
        const newFormNo = maxFormNo + 1;
        findForm.undertakingForm.push({
          form_no: newFormNo,
          date: date,
          reason: reason,
          address: address,
          approvalStatus: false,
        });
        await findForm.save();
        return res.status(200).json({
          success: true,
          message: findForm,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Only one form can be submitted on one day.",
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        message: "No such student found in our database!!!",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: `The error is ${err}` });
  }
});


router.get('/getHistory', fetchStudent, async (req, res) => {
  let id = req.student.id;
  try {
    const student = await undertaking.Student.findById(id);
    if (student) {
      res.status(200).json({
        success: true,
        message: student
      });
    } else {
      res.status(500).json({
        success: false,
        message: "No such student found in our database!!!"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    });
  }
});
module.exports = router;
