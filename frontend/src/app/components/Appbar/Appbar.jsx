'use client'
import React from 'react'
import  Image  from 'next/image'

import profile from "@/assests/profile.png"
import {useRouter} from "next/navigation"
import { removeToken } from '@/app/dashboard/action'

const Appbar = () => {
  const router=useRouter()
 const handleClick = async () => {
    
    await removeToken()
    router.push("/auth/signin",{scroll:false})
  }

  return (
    <div className='flex flex-row items-center justify-between w-full h-16 bg-slate-100 p-5 shadow-lg z-10'>
          <div>
              <h1 className='text-blue-400 font-bold text-3xl'>URL SHORTENER</h1>
          </div>
          <div className='flex cursor-pointer' onClick={handleClick}>
              <Image src={profile} alt="profile" className='rounded-full' width={40} height={40}/> 
          </div>
    </div>
  )
}

export default Appbar
