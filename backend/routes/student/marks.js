const router=require('express').Router()
const studentSchema=require('../../models/StudentModel')
const fetchStudent=require('../../middlewares/fetchStudent')
router.post('/',fetchStudent,async(req,res)=>{
    
    const {semester,gpa,backlogs,subject,overallgpa}=req.body.currentSemester;
    console.log(typeof(req.body.currentSemester.semester))
    const id=req.student.id
    try{
    const checkStudent=await studentSchema.Student.findById(id)
    if(checkStudent){
        checkStudent.marks.push({
            semester:semester,
            gpa:gpa,
            backlogs:backlogs,
            subject:subject,
            overallgpa:overallgpa
        })
        checkStudent.save()
        res.status(200).json({
            success:true,
            message:"successfully Updated"
        })
    }
    else{
        res.json({
            success:false,
            message:"user does not exists"
        })
    }
}
    

catch(err){
    console.log(err.message)
}
})



module.exports=router