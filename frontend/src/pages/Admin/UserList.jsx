import React, { useEffect, useState } from 'react'
import {useGetUsersQuery,
   useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';

const UserList = () => {

    const {data:users,refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(()=>{
        refetch()
    },[refetch])

    const deleteHandler = async(id)=>{
        if(window.confirm("Are you sure?")){
            try {
              await deleteUser(id)  
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = (id, username, email) =>{
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler= async (id)=>{
        try {
            await updateUser({
                userId :id, 
                username: editableUserName, 
                email: editableUserEmail
            })
            setEditableUserId(null)
            refetch()
        }
        catch (error) {
            toast.error(error.data.message || error.error)
        }
    }

  return (
    <div className='p-6 bg-[#d7ccc8] min-h-screen ml-[3.5rem]'>
  <AdminMenu />
  <h1 className="text-3xl font-bold text-[#4e342e] mb-6">Users</h1>

  {isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>
      {error?.data.message || error.message}
    </Message>
  ) : (
    <div className='overflow-x-auto'>
      <table className='w-full overflow-hidden border border-[#bcaaa4] bg-white'>
        <thead className='bg-[#8d6e63] text-white'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase'>ID</th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase'>Name</th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase'>Email</th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase'>Admin</th>
            <th className='px-6 py-3 text-left'></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-white'}>
              <td className='px-6 py-4 text-sm text-gray-800'>{user._id}</td>
              <td className='px-6 py-4'>
                {editableUserId === user._id ? (
                  <div className='flex items-center gap-2'>
                    <input
                      type="text"
                      value={editableUserName}
                      onChange={e => setEditableUserName(e.target.value)}
                      className='p-2 border border-[#bcaaa4] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#8d6e63]'
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className='bg-[#8d6e63] hover:bg-[#6d4c41] text-white p-2 rounded-lg'
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    {user.username}
                    <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                      <FaEdit className='text-[#8d6e63] hover:text-[#5d4037]' />
                    </button>
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>
                {editableUserId === user._id ? (
                  <div className='flex items-center gap-2'>
                    <input
                      type="text"
                      value={editableUserEmail}
                      onChange={e => setEditableUserEmail(e.target.value)}
                      className='p-2 border border-[#bcaaa4] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#8d6e63]'
                    />
                    <button
                      onClick={() => updateHandler(user._id)}
                      className='bg-[#8d6e63] hover:bg-[#6d4c41] text-white p-2 rounded-lg'
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <p>{user.email}</p>
                    <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                      <FaEdit className='text-[#8d6e63] hover:text-[#5d4037]' />
                    </button>
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>
                {user.isAdmin ? (
                  <FaCheck className='text-green-600' />
                ) : (
                  <FaTimes className='text-red-600' />
                )}
              </td>
              <td className="px-6 py-4">
                {!user.isAdmin && (
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg'
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  )
}

export default UserList