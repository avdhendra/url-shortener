

import React from 'react'
import DashboardComponent from '../components/DashboardComponent'
import toast, { Toaster } from "react-hot-toast"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getUrl(token) {
  console.log("ton was", token)
  
  
    const res = await fetch("http://localhost:5000/url/geturl",
      {
        cache:"no-store", headers: {
        Authorization: `Bearer ${token.token}`,
        }
      })
  
  const value=await res.json()
   return value
    
  
}

const Dashboard = async () => {
    
  const encryptedToken = cookies().get('token')?.value
  const token = encryptedToken ? encryptedToken : null
  console.log("emc",token)
  const url = await getUrl(token)
    
    
  return (
    <div>
      <DashboardComponent url={url} token={token} />
          <Toaster position='top-right'/>
    </div>
  )
}

export default Dashboard
