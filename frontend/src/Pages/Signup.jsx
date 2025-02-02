import React, { useState } from 'react'
import useAuthContext from '../Context/useAuthContext'
import { Eye, EyeOff, Lock, Mail, MessageSquare , User,Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../Component/AuthImagePattern'
import toast from 'react-hot-toast'

const Signup = () => {

    const [showPassword, setshowPassword] = useState(false)
    const [formData, setformData] = useState({
        fullname: "",
        email: "",
        password: "",
    })

    const { signup, isSigningUp } = useAuthContext()
    const validateForm = () => {
        if(!formData.fullname.trim()) return toast.error("Full Name is required")
            if(!formData.email.trim()) return toast.error("Email is required")
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid Email Formate")
            if(!formData.password.trim()) return toast.error("Password is required")
            if(!formData.password.length>6) return toast.error("Password length should be greater than 6")

            return true
            
        }
    const handleSubmit = (event) => {
        event.preventDefault()
        const success = validateForm()
        if(success === true) signup(formData)
    }
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* Logo */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className="size-6 text-primary" />




                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get Started with free Account</p>

                        </div>

                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Full Name</span>

                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className="size-5 text-base-content/40"/>

                                </div>
                                <input type="text" className={`input input-bordered w-full pl-10`} placeholder="John Doe" value={formData.fullname} onChange={(e)=>setformData({...formData,fullname:e.target.value})} />

                            </div>

                        
                        </div>

                        {/* Mail */}

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email</span>

                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className="size-5 text-base-content/40"/>

                                </div>
                                <input type="email" className={`input input-bordered w-full pl-10`} placeholder="John Doe" value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})} />

                            </div>

                        
                        </div>

                        {/* Password */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Password</span>

                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className="size-5 text-base-content/40"/>

                                </div>
                                <input type={showPassword ? "text":"password"} className={`input input-bordered w-full pl-10`} placeholder="---------" value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} />
                                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>setshowPassword(!showPassword)}>
                                    {
                                        showPassword 
                                        ?(<EyeOff className='size-5 text-base-content/40'/>)
                                        :(<Eye className='size-5 text-base-content/40'/>)
                                    }


                                </button>

                            </div>

                        
                        </div>

                        {/* Button */}
                        <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                <Loader2 className="size-5 animate-spin"/>
                                Loading .......
                                
                                </>
                            ):(
                                "Create Account"
                            )}

                        </button>
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an account ? {""}
                            <Link to='/login' className="link link-primary">Sign up</Link>
                        </p>

                    </div>

                </div>

            </div>
            {/* right side */}
            <AuthImagePattern title="Join Our Community" subtitle="Connect with friend , share moment , and stay in touch with your loved ones"/>

            

        </div>
    )
}

export default Signup
