import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import { NavLink } from 'react-router'

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
        <button className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-white p-2 fixed `} onClick={toggleMenu}>
            {isMenuOpen ? (
                <FaTimes color='black' />
            ) : (
                <>
                <div className="w-6 h-1 bg-black my-1"></div>
                <div className="w-6 h-1 bg-black my-1"></div>
                <div className="w-6 h-1 bg-black my-1"></div>
                </>
            )}
        </button>

        {isMenuOpen && (
            <section className='p-4 fixed right-7 top-5'>
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-utem py-2 px-3 block mb-5" to='/admin/dashboard' style={({isActive}) =>({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Admin Dashbaord
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-utem py-2 px-3 block mb-5" to='/admin/categorylist' style={({isActive}) =>({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Create Category 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-utem py-2 px-3 block mb-5" to='/admin/productlist' style={({isActive}) =>({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Create Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-utem py-2 px-3 block mb-5" to='/admin/allproductslist' style={({isActive}) =>({
                            color: isActive ? 'green' : 'black',
                        })}>
                            All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-utem py-2 px-3 block mb-5" to='/admin/userlist' style={({isActive}) =>({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-utem py-2 px-3 block mb-5" to='/admin/orderlist' style={({isActive}) =>({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Manage Orders
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}
    </>
  )
}

export default AdminMenu