import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { setCrediantials } from "../../redux/features/auth/authSlice"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const submitHandler = async (e) =>{
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap()
            console.log(res)
            dispatch(setCrediantials({...res}))
        }
        catch(error){
            toast.error(error?.data.message || error.message)
        }
    }

  return (
   <div>
  <section className="flex min-h-screen bg-white">
    {/* Form side */}
    <div className="w-1/2 flex flex-col justify-center px-40">
      <h1 className="text-3xl font-semibold mb-6 text-[#8d6e63]">Sign In</h1>

      <form onSubmit={submitHandler} className="w-full max-w-md">
        <div className="my-6">
          <label htmlFor="email" className="block mb-0.5 font-medium text-[#8d6e63]">Email Address</label>
          <input
            type="email"
            id="email"
            className="mt-2 p-2 w-full border border-[#bcaaa4] bg-[#efebe9] text-[#4e342e] focus:outline-none focus:border-[#8d6e63] transition-all duration-200"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-6">
          <label htmlFor="password" className="block mb-0.5 font-medium text-[#8d6e63]">Password</label>
          <input
            type="password"
            id="password"
            className="mt-2 p-2 w-full border border-[#bcaaa4] bg-[#efebe9] text-[#4e342e] focus:outline-none focus:border-[#8d6e63] transition-all duration-200"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#8d6e63] text-white uppercase font-semibold py-2 tracking-wide transition-transform hover:scale-[1.02] active:scale-100"
        >
          {isLoading ? "Signing In ..." : "Sign In"}
        </button>

        {isLoading && <Loader />}
      </form>

      <div className="mt-6 max-w-md">
        <p className="text-black">
          New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-[#a1887f] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>

    {/* Image side */}
    <div className="w-1/2 h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
        alt="Ecommerce shopping"
        className="w-full h-full object-cover"
      />
    </div>
  </section>
</div>

  )
}

export default Login