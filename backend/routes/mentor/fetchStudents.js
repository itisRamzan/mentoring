const router=require('express').Router()
const studentModel=require('../../models/StudentModel')
const fetchMentor=require('../../middlewares/fetchMentor')
router.get('/',fetchMentor,async(req,res)=>{
    try{
        const fetchStudent=await studentModel.Student.find({},'name rollNo -_id')
        if(fetchStudent){
            res.status(200).json({
                success:true,
                message:fetchStudent
            })
        }
        else{
            res.status(500).json({
                success:false,
                message:"no user found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`un-identified error!!! ${err}`
        })
        console.log(err)
    }
})

module.exports=router