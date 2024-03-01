const router=require('express').Router()
const fetchMentor=require('../../middlewares/fetchMentor');
const StudentModel = require('../../models/StudentModel');
router.get('/',fetchMentor,async(req,res)=>{
    try{
        const {rollNo}=req.body;
        const student=await StudentModel.Student.find({rollNo},'addressingConcerns -_id')
        if(student){
            res.status(200).json({
                success:true,
                message:student
            })
        }
        else{
            res.status(500).json({
                success:false,
                message:"no user exists with that rollNo!!!"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`error is ${err}`
        })
    }
})

router.post('/concernApproval',async(req,res)=>{
    const {form_no,rollNo}=req.body;
    try {
        const updatedApprovalStatus = true; // Value to update the approvalStatus
    
        const updatedStudent = await StudentModel.Student.findOneAndUpdate(
          { rollNo, 'addressingConcerns.form_no': form_no }, // Find the document with the given rollNo and form_no
          { $set: { 'addressingConcerns.$.approvalStatus': updatedApprovalStatus } }, // Update the approvalStatus
          { new: true } // To get the updated document as a result
        );
    
        if (updatedStudent) {
          return res.status(200).json({
            success: true,
            message: "Approved",
            updatedStudent // Optionally, send the updated student document as a response
          });
        } else {
          return res.status(500).json({
            success: false,
            message: "No user or form found with provided details"
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: `Error: ${err}`
        });
      }
})

module.exports=router