import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineInfoCircle, AiOutlineUser} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navigation.css'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'

export const Navigation = () => {
    const { userInfo } = useSelector(state=>state.auth)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleDropdown = ()=>{
        setDropdownOpen(!dropdownOpen)
    }
    const toggleSidebar = ()=>{
        setShowSidebar(!showSidebar)
    }
    const closeSidebar = ()=>{
        setShowSidebar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall]  =useLogoutMutation()
    const logoutHandler = async()=>{
        try{
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }



  return (
    <div style={{zIndex:999}} className={`${showSidebar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#8D6E63] w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container">
        <div className="flex flex-col justify-center space-y-4">
            <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineHome className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">HOME</span>
            </Link>
            <Link to='/about' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineInfoCircle className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">ABOUT</span>
            </Link>
            <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineShopping className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">SHOP</span>
            </Link>
            <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineShoppingCart className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">CART</span>
            </Link>
            <Link to='/favourite' className='flex items-center transition-transform transform hover:translate-x-2'>
            <FaHeart className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">FAVOURITE</span>
            </Link>
        </div>

        <div className="relative">
            
            <div
                className="flex items-center justify-center xl:justify-start transition-transform transform hover:translate-x-2 mt-[2rem] cursor-pointer"
                onClick={toggleDropdown}
                >
                <span className={`hidden nav-item-name font-bold text-xl`}>{userInfo?.username}</span>

                    {userInfo && (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 ${dropdownOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                        />
                        </svg>
                    )}
                </div>



            {dropdownOpen && userInfo && (
                <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"
                }`}>
                    {userInfo.isAdmin && (
                        <>
                        <li>
                            <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to='/admin/productlist' className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
                        </li>
                        <li>
                            <Link to='/admin/categorylist' className='block px-4 py-2 hover:bg-gray-100'>Categories</Link>
                        </li>
                        <li>
                            <Link to='/admin/orderlist' className='block px-4 py-2 hover:bg-gray-100'>Orders</Link>
                        </li>
                        <li>
                            <Link to='/admin/userlist' className='block px-4 py-2 hover:bg-gray-100'>Users</Link>
                        </li>
                       
                        </>
                    )}
                     <li>
                            <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
                        </li>
                        <li>
                            <button onClick={logoutHandler}
                            className='block w-full px-4 py-2 text-left hover:bg-gray-100'>Logout</button>
                        </li>
                </ul>
            )}
        </div>


            {!userInfo  && (

           
        <ul>
            <li>
                <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineLogin className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">LOGIN</span>
            </Link>
            <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineUserAdd className="mr-2 mt-[2rem]"size={26} /> 
            <span className="hidden nav-item-name mt-[2rem]">REGISTER</span>
            </Link>
            </li>
        </ul>
         )
            }
    </div>
  )
}
