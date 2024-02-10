import React from 'react'
import { FaClipboard } from "react-icons/fa";
import toast from 'react-hot-toast';
const CopyClipboard = ({ code }) => {
    
    const handleClick = async() => {
        if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(code);
             toast.success("Copy to clipboard")
        } else {
            document.execCommand("copy", true, "Text which you want to copy");
        }
       
    }
  return (
      <div className='flex flex-row bg-blue-400 rounded-lg p-2 gap-1'>
          <div>
          <span className=' text-xl'>{code}</span>
              
          </div>
          <div className='flex items-center justify-center p-1 bg-slate-200 rounded cursor-pointer' onClick={handleClick}>
          <FaClipboard className='text-2xl' />
              
          </div>
    </div>
  )
}

export default CopyClipboard
