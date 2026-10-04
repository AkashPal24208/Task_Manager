const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require("cors");
const app = express()
const authRouter = require('./Routers/auth.router')
app.use(cors({
  origin: [ "http://localhost:5173",
    "https://task-manager-eight-lemon-45.vercel.app"
  ],
  credentials: true               
}));

app.use(express.json());
app.use(cookieParser());
const authMiddleware = require('./middlewares/auth.middleware');

// middleare for authContext 


const taskRouter = require('./Routers/task.router');

// auth Router 
app.use('/api',authRouter);
  
// task Router 

app.use('/task',authMiddleware,taskRouter)

module.exports = app;