const mongoose=require('mongoose')


const TaskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
     status:{

        type:String,
        default:'pending'
     }
})

module.exports = mongoose.model("task", TaskSchema);