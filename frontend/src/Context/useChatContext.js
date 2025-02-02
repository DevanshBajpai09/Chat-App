import { create } from "zustand";

import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import useAuthContext from "./useAuthContext";


const useChatContext = create((set,get)=>({
    messages :[],
    users:[],
    selectedUser :null,
    isMessageLoading : false,
    isUserLoading : true,
    

    getUser:async()=>{
        set({isUserLoading:true})
        try{
            const res = await axiosInstance.get("/message/user")
            set({users:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },


    getMessage:async(userId)=>{
        set({isMessageLoading:true})
        try{
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})

        }catch(error){
            toast.error(error.response.data.message)

        }finally{
            set({isMessageLoading:false})
        }
    },

    
    sendMessage : async(messageData)=>{
        const {selectedUser , messages} = get()
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data]})
            
        }catch(error){
            toast.error(error.response.data.message)
            
        }
        
    },

    subscribeToMessage:()=>{
        const {selectedUser} = get()
        if(!selectedUser) return

        const socket = useAuthContext.getState().socket


        socket.on("newMessage",(newMessage)=>{
            const isMessageSelected= newMessage.senderId === selectedUser._id
            if(!isMessageSelected) return
            set({
                messages:[...get().messages,newMessage],
            })
        })

    },

    unsubscribeFromMessage:()=>{
        const socket = useAuthContext.getState().socket
        socket.off("newMessage")
    },
    setSelectedUser: (selectedUser)=>set({selectedUser}) 
}))

export default useChatContext