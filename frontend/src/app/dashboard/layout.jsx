import Appbar from '@/components/Appbar/Appbar'
import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
function DashboardLayout({ children }) {
  
const encryptedToken = cookies().get('token')?.value
  const token = encryptedToken ? encryptedToken : null
  
  if (!token) {
     redirect("/auth/signin")
   }

    return (
        <div>
        <Appbar/>
      {children}      
      </div>
      
  )
}

export default DashboardLayout