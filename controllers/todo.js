const Todo=require("../models/Todo");
const moment=require("moment");



const homeController=async(req,res,next)=>{
    try{

        const todos=await Todo.find({}).sort({createdAt:-1});

        res.locals.moment=moment;

        res.render("index",{title:"list todo",todos});

    }catch(err){
        console.log(err.message);
    }
}

const addTodoFormController=(req,res,next)=>{
    try{
        res.render("newToDo",{title:"new todo"});

    }catch(err){
        console.log(err.message);
    }
}

const updateTodoFormController=async(req,res,next)=>{
    try{
        const {id}=req.query;
        const todo=await Todo.findById(id);

        res.render("updateToDo",{title:"update todo",todo});

    }catch(err){
        console.log(err.message);
    }
}

const deleteTodoFormController=(req,res,next)=>{
    try{
        const {id}=req.query; 
        res.render("deleteToDo",{title:"delete todo",id});

    }catch(err){
        console.log(err.message);
    }
}

const addTodoController=async(req,res,next)=>{
    try{
        const {title,desc}=req.body;

        if(!title){
            return res.status(400).json({message:'title is required'});
        }
        const newTodo=new Todo({title,desc});
        await newTodo.save();

        res.redirect("/");


    }catch(err){
        res.status(500).send(err.message);
    }
}


const updateTodoController= async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {title,desc}=req.body;

        const todo=await Todo.findById(id);
        if(!todo){
            return res.status(404).json({message:"todo not found"});
        }

            todo.title=title;
            todo.desc=desc;

            await todo.save();
            res.redirect("/");
            
        

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const deleteTodoController=async(req,res,next)=>{
    try{
        const {id,confirm}=req.query;
        if(confirm ==="yes"){
            await Todo.findByIdAndDelete(id);
        }
        res.redirect("/");



    }catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports={
    homeController,
    addTodoFormController,
    updateTodoFormController,
    deleteTodoFormController,
    addTodoController,
    updateTodoController,
    deleteTodoController}