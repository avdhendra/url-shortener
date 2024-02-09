

import React from 'react'
import DashboardComponent from '../components/DashboardComponent'
import toast, { Toaster } from "react-hot-toast"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
  

async function getUrl(token) {
  console.log("ton was", token)
  
  try {
    const res = await fetch("http://localhost:3000/url/geturl",
        { next: { revalidate: 60 }} ,{
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  })
   return res.json()
    
  } catch (error) {
    toast.error(error.message)
  }
}

const Dashboard = async () => {
    
  const encryptedToken = cookies().get('token')?.value
  const token = encryptedToken ? encryptedToken : null
  
  const url = await getUrl(token)
    
    
  return (
    <div>
      <DashboardComponent url={url} token={token} />
          <Toaster position='top-right'/>
    </div>
  )
}

export default Dashboard
