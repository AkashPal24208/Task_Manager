const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
    trim: true,   
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"], 
    default: "other"
  }
}, { timestamps: true }); 

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
