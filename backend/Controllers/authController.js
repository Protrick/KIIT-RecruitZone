import User from '../models/User.js';
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{
    const {name,email,password} = req.body;
    const user = new User({name,email,password});
    await user.save();
    res.status(201).json({message: "User created successfully"});
};

export const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }
    res.status(200).json({message: "Login successful"});
};

export const refreshToken=async(req,res)=>{
    const cookies=req.cookies;

    if(!cookies?.jwt){
        return res.status(401).json({message:"Unauthorised token"});
    }

    const refreshToken=cookies.jwt;
    try{
        const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

        const accessToken=jwt.sign(
            {userInfo:{id:decoded.userInfo.id}},
            process.env.ACCESS_TOKEN_SECRET,{expireIn:"7h"}
        );
        return res.json({accessToken});
    }catch(err){
        return res.status(403).json({message:"Invalid Token"});

    }

}

export const logout=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }
   res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
   res.json({message:"Cookie cleared"});
};

//module.exports = {refreshToken,logout,login,signup};