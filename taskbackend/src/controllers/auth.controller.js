 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')
 const User = require('../Models/user.model');
const BlacklistModel = require('../Models/blacklist.model');
 
 /**
 * @register_controller POST/api/register
 */

async function registerController(req,res){
    try{
     const {name,email,password,gender} = req.body;
    //  validation
     if(!name || !email || !password){
         return res.status(400).json({
            message:"Please fill the complete information"
         })
     }

    //  already exist 
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email or username" });
    }
  
    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user 
     const newUser = await User.create({
        name:name,
        email,
        password:hashedPassword,
        gender
     });

    //  generate jwt token for user 
    const token = jwt.sign(
        {id:newUser._id,email:newUser.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    );
    //   setting token in the cookie
   res.cookie("token",token,{
      httpOnly:true,
      secure:false,
      sameSite:"none",
      maxAge:24*60*60*1000 
    })
    // send response
    return res.status(201).json({
        message:"User Registered successfully",
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            gender:newUser.gender
        },
        token
    });

    }
    catch(err){
    console.log("Registration error:",err);
    return res.status(500).json({
        message:"Internal server error"
    });
    }
}

/**
 * @login_controller POST/api/login 
 */
async function loginController(req, res) {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        message: "Enter complete details.."
      });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );


    res.cookie("token", token, {
      httpOnly: true, 
      secure: false,    
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender
      }
  
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @logout_controller POST/api/logout
 */
 async function logoutController(req,res){
  try{
   const token = req.cookies.token;
   if(token){
      await BlacklistModel.create({token});
   }
   res.clearCookie("token");
   return res.status(200).json({
    message:"Loggedout successfully"
   });
  }
  catch(err){
      return res.status(500).json({message:"Internal server error"});
  }
 }
/**
 * @authMecontroller
 */
async function authMeController(req, res) {
  return res.status(200).json({
    user: req.user
  });
}
module.exports = {registerController,loginController,logoutController,authMeController};