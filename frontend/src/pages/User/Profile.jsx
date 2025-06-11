import React, { useEffect, useState } from 'react'
import {useProfileMutation} from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { setCrediantials } from '../../redux/features/auth/authSlice'

const Profile = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {userInfo} = useSelector(state =>state.auth)

  const [updateProfile, {isLoading : loadingUpdateProfile}] = useProfileMutation()

  useEffect(()=>{
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  },[userInfo.username, userInfo.email])

  const dispatch = useDispatch()

  const submitHandler = async (e) =>{
    e.preventDefault()

    if (password !== confirmPassword){
      toast.error("Passwords do not match")
    }
    else{
      try {
        const res = await updateProfile({_id:userInfo._id, username, email, password}).unwrap()
        dispatch(setCrediantials({...res}))
        toast.success("Profile updated successfully")

      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }

  }

  return (
   <div className="container mx-auto px-4  text-[#2B1B17]">
  <div className="md:flex md:space-x-8">
    
    {/* Left: Static Welcome Message */}
    <div className="md:w-1/3 mb-8 md:mb-0 bg-[#EFEBE9] p-8 uppercase tracking-wide border border-[#5C4033] min-h-screen mt-0">
      <h2 className="text-2xl font-bold mb-6 border-b-2 text-[#8D6E63] pb-2">
        Welcome Back
      </h2>
      <p className="mb-4 text-sm leading-relaxed">
        Keep your account information accurate and secure.
      </p>
      <div className="text-sm space-y-2 mt-6">
        <p><span className="font-semibold">User Type:</span> Registered</p>
        <p><span className="font-semibold">Account Status:</span> Active</p>
        <p><span className="font-semibold">Email Verified:</span> Yes</p>
      </div>
    </div>

    {/* Right: Update Form */}
    <div className="md:w-2/3 mt-5">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide text-[#8D6E63]">
        Update Profile
      </h2>

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block mb-2 uppercase text-sm tracking-wide">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border border-[#5C4033] bg-[#efebe9] text-[#2B1B17] px-4 py-3 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 uppercase text-sm tracking-wide">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-[#5C4033] bg-[#efebe9] text-[#2B1B17] px-4 py-3 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 uppercase text-sm tracking-wide">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border border-[#5C4033] bg-[#efebe9] text-[#2B1B17] px-4 py-3 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 uppercase text-sm tracking-wide">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-[#5C4033] bg-[#efebe9] text-[#2B1B17] px-4 py-3 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="py-2 px-6 bg-[#5C4033] text-white uppercase tracking-wide border hover:bg-[#D7CCC8] hover:text-[#8d6e63] hover:border=[#8d6e63]"
          >
            Update Profile
          </button>
          <Link
            to="/user-orders"
            className="py-2 px-6 bg-[#5C4033] text-white uppercase tracking-wide border hover:bg-[#D7CCC8] hover:text-[#8d6e63] hover:border=[#8d6e63]"
          >
            My Orders
          </Link>
        </div>
      </form>

      {loadingUpdateProfile && <Loader />}
    </div>
  </div>
</div>

  )
}

export default Profile