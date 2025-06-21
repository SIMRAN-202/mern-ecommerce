import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit, buttonText = 'Submit', handleDelete}) => {
  return (
    <div className='p-3'>
        <form onSubmit={handleSubmit} className='space-y-3'>
            <input type="text" className='py-3 px-4 border w-full' value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Write Category Name' />

            <div className="flex justify-between">
               <button className="bg-[#8d6e63] text-white rounded-full px-6 py-2">
                {buttonText}
                </button>

                {handleDelete && (
                <button 
                    type="button" 
                    className="bg-red-900 text-white rounded-full px-6 py-2 ml-4"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                )}

            </div>
        </form>
    </div>
  )
}

export default CategoryForm