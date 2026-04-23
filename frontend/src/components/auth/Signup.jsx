import Navbar from '../shared/Navbar'
import React from 'react'
// import '../../App.css'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const Signup = () => {
  const [input,setInput] = useState({
    fullname:"",
    email:"",
    mobile:"",
    password:"",
    role:"",
    file:""
  });
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const changeFileHandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]});
  }
  const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("mobile",input.mobile);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
   try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
   } catch (error) {
     console.log(error);
     toast.error(error.response.data.message);
   } finally{
    dispatch(setLoading(false));
   }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-200 rounded-md p-8 bg-white shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-center">Signup</h2>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input className="border p-2 w-full" type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Shivleela"></Input>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input className="border p-2 w-full" type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="shivkaji@gmail.com"></Input>
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input className="border p-2 w-full" type="text" value={input.mobile} name="mobile" onChange={changeEventHandler} placeholder="9876543210"></Input>
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input className="border p-2 w-full" type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Password"></Input>
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5" defaultValue="student">
              <div className='flex items-center space-x-2'>
                <Input type="radio" name="role" value="student" checked={input.role=='student'} onChange={changeEventHandler} className="cursor-pointer" />
                <label htmlFor='r1'>Student</label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input type="radio" name="role" value="recruiter" checked={input.role=='recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                <label htmlFor='r2'>Recruiter</label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <label>Profile</label>
              <Input type="file" onChange={changeFileHandler} accept="image/*" className="cursor-pointer" />
            </div>
          </div>
          {
            loading?<Button className="w-full my-4"><Loader2 className='mr-2 h-4w-4 animate-spin'/>Please wait</Button>:<Button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 active:scale-95">Signup</Button>

          }
          <span className='text-sm'>Already have an account?<Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  )
};

export default Signup