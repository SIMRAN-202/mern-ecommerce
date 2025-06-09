import React from 'react'

const Loader = () => {
  return (
    <div
      className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#8d6e63] border-b-[#bcaaa4] border-l-[#d7ccc8] border-r-[#efebe9]"
      role="status"
      aria-label="Loading"
    ></div>
  )
}

export default Loader
