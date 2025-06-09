import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'
import Loader from "../../components/Loader"
import { toast } from 'react-toastify'
import { setCrediantials } from '../../redux/features/auth/authSlice'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, redirect, userInfo])

    const submitHandler = async (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
            }
        else{
            try {
                const res = await register({username, email, password}).unwrap()
                dispatch(setCrediantials({...res}))
                navigate(redirect)
                toast.success('User successfully registered!')
            } catch (error) {
               console.log(error)
               toast.error(error.data.message) 
            }
        }
    }
    
  return (
    <section className="flex flex-wrap min-h-screen bg-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-40 py-16">
        <h1 className="text-3xl font-semibold mb-6 text-[#8d6e63]">Sign Up</h1>

        <form onSubmit={submitHandler} className="w-full max-w-lg">
          <div className="mb-8">
            <label htmlFor="name" className="block mb-0.5 font-medium text-[#8d6e63]">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 p-2 w-full border border-[#bcaaa4] bg-[#efebe9] text-[#4e342e] focus:outline-none focus:border-[#8d6e63] transition-all duration-200"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="block mb-0.5 font-medium text-[#8d6e63]">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-2 w-full border border-[#bcaaa4] bg-[#efebe9] text-[#4e342e] focus:outline-none focus:border-[#8d6e63] transition-all duration-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block mb-0.5 font-medium text-[#8d6e63]">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 p-2 w-full border border-[#bcaaa4] bg-[#efebe9] text-[#4e342e] focus:outline-none focus:border-[#8d6e63] transition-all duration-200"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block mb-0.5 font-medium text-[#8d6e63]">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-2 p-2 w-full border border-[#bcaaa4] bg-[#efebe9] text-[#4e342e] focus:outline-none focus:border-[#8d6e63] transition-all duration-200"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}

            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-[#8d6e63] text-white uppercase font-semibold py-2 tracking-wide transition-transform hover:scale-[1.02] active:scale-100"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          {isLoading && <Loader />}
        </form>

        <p className="mt-6 text-black">
          Already have an account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="text-[#a1887f] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
          alt="Ecommerce shopping"
          className="w-full h-full object-cover"
        />
      </div>
    </section>



  )
}

export default Register