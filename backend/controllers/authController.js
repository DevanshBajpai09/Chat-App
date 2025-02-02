import bcrypt from 'bcrypt'

import { generateToken } from '../lib/utils.js'
import userModel from '../models/userModel.js'
import cloudinary from '../lib/cloudinary.js'


const signup = async(req,res)=>{

    try{

        const {fullname , email , password}=req.body
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All field are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be greater tha 6 digit"})
        }

        const user = await userModel.findOne({email})
        if(user) return res.status(400).json({message:"Email alreaddy exist"});

        const salt =await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            fullname,
            email,
            password:hashPassword,

        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic : newUser.profilePic
            })

        }else{
            res.status(400).json({message:"Invalid user  data"})
        }


    }catch(error){
        console.log(error)
       return res.json({success:false,message:error.message})

    }
    


}
const login = async(req,res)=>{
    try{

        const {email ,password} = req.body
       const user =  await userModel.findOne({email})
       if (!user) {
        return res.status(400).json({ message: "Email not found" });
    }
  
       const isPassworCorrect=await bcrypt.compare(password,user.password)
       if (!isPassworCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }
       generateToken(user._id ,res)
       res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profilePic:user.profilePic
       })
        

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }

}

const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out succesfully"})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})


    }
    
}




const updateProfile =async(req,res)=>{
    const {profilePic} =req.body
    try{
       const userId =  req.user._id
       if(!profilePic){
        return res.status(400).json({message:"Profile Pic required"})

       }

      const uploadResponse = await cloudinary.uploader.upload(profilePic)
      const updatedUser = await userModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
      
      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser)

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }

}

const checkAuth = async(req,res)=>{
    try{
        res.status(200).json(req.user)

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}


export {login , logout , signup ,updateProfile ,checkAuth}