import {create} from "zustand"

const useThemeContext = create((set)=>({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme:(theme)=>{
        localStorage.getItem("chat-theme" , theme);
        set({theme})
    },

}))

export default useThemeContext