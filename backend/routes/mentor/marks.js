const router=require('express').Router()
const fetchMentor=require('../../middlewares/fetchMentor')
const studentModel=require('../../models/StudentModel')
//to fetch the detail marks of a particular student

router.get('/',fetchMentor,async(req,res)=>{
    try{
        const {rollNo}=req.body
        const student=await studentModel.Student.find({rollNo},'marks -_id')
        if(student)
        {
            console.log(student)
            res.status(200).json({
                success:true,
                message:student
            })
        }
        else{
            res.status(500).json({
                success:false,
                message:"no user found!!!"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`an error occurred ${err}`
        })
    }
})

module.exports=router