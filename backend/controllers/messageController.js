import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"
import messageModel from "../models/messageModel.js"
import userModel from "../models/userModel.js"


const getUserSlidebar = async(req,res)=>{
    try{

        const loggedInUserId = req.user._id
        const filterUsers = await userModel.find({_id:{$ne:loggedInUserId}}).select('-password')
        res.status(200).json(filterUsers)

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

const getMessage = async(req,res)=>{
    try{
        const {id:userToChatId} = req.params
        const senderId = req.user._id;
        const message = await messageModel.find({
            $or:[
                {senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId}
            ]
        })

        res.status(200).json(message)


    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

const sendMessage = async(req,res)=>{
    try{

        const {text,image} = req.body
        const {id : receiverId} = req.params
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        const receiverSocket = getReceiverSocketId(receiverId)
        if(receiverSocket){
            io.to(receiverSocket).emit("newMessage",newMessage)
        }


        res.status(201).json(newMessage)

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

export {getUserSlidebar , getMessage , sendMessage}