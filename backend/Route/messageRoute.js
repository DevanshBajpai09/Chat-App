import express from 'express'
import protectRoute from '../middleware/authMiddleware.js'
import { getMessage, getUserSlidebar, sendMessage } from '../controllers/messageController.js'


const messageRouter = express.Router()

messageRouter.get("/user",protectRoute,getUserSlidebar)
messageRouter.get("/:id",protectRoute,getMessage)
messageRouter.post("/send/:id",protectRoute,sendMessage)



export default messageRouter