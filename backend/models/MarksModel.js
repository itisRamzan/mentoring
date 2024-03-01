const mongoose=require('mongoose')

const marksSchema=new mongoose.Schema({
    marks:[]
})

module.exports=mongoose.model('marks',marksSchema)