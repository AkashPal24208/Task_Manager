const mongoose = require('mongoose');

/**
 * @MONGODB_CONNECTION  through mongoose 
 * @function connectToDB()
 */

async function connectToDB(){
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log("connected to database..");
    }
    catch(err){
     console.log("Error while connected to MONGO-DB");
    }
}  

module.exports = connectToDB;
