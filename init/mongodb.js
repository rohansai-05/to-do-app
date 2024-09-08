const mongoose=require("mongoose");
const connectMongodb=async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("database connection succesful");

    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}


module.exports=connectMongodb;