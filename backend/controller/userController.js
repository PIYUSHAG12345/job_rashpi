import {User} from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async(req,res,next) => {
  const {name , email, password} = req.body;
  
  if(!name || !email || !password){
    return next(
      res.status(400).json({
        success : false,
        message : "Please fill the full form"
      })
    );
  }
  
    console.log("Request Body:", req.body); // Log the incoming request
    // Remaining code...

  
  const isUser = await User.findOne({email});
  if(isUser){
    return next(res.status(400).json({
      success : "false",
      message : "User already exist"
    }))
  }

  const hashedPassword = await bcrypt.hash(password,10)
  const user = await User.create({name , email, password:hashedPassword});
  res.status(200).json({
    success : true,
    message : "User Registered",
    user
  });

   

};

export const login = async() => {
  const {email,password} = req.body;

  if(!email || !password){
    return next(
      res.status(400).json({
        success : false,
        message : "please fill full form"
      })
    )
  }

  const user = await User.findOne({email});
  if(user){
    return next(res.status(400).json({
      success : "false",
      message : "Invalid email or password"
    }));
  }

  const isPasswordMatched = await bcrypt.compare(password,user.password);

  if(!isPasswordMatched){
    return next(res.status(400).json({
      success : "false",
      message : "Invalid email or password"
    }));
  }

  const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
    expiresIn : "7d"
  })

  res.status(200).cookie("token",token, {
     httpOnly : true,
     expires : new Date(Date.now() + process.env.COOKIE_EXPIRES*24*60*60*1000)
  }).json({
    success : true,
    message : "user logged in.",
    user,
    token
  })

};

export const getUser = async() => {

  const user  = await User.findById(req.user._id);

   if(!user){
     return next(
       res.status(404).json({
        success : false,
        message : "User Not Found"
       })
     );
   }

   res.status(200).json({
     success : true,
     user,
   })


}