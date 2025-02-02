import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message:"Unauthorized  - No token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorized  - No token Provided"})
        }

        const user = await userModel.findById(decoded.userId).select('-password')
        if(!user){
            return res.status(404).json({message:"User Not found"})

        }

        req.user = user
        next()

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

export default protectRoute