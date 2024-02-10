

import React from 'react'
import DashboardComponent from '../components/DashboardComponent'
import toast, { Toaster } from "react-hot-toast"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'



const Dashboard = async () => {
    
  const encryptedToken = cookies().get('token')?.value
  const token = encryptedToken ? encryptedToken : null
  console.log("emc", JSON.stringify(token).toString())
  // const getUrlFunction = async () => {
    
  //   const url = await getUrl(token)
  //   return url
  // }
    
    
  return (
    <div>
      <DashboardComponent  token={token} />
          <Toaster position='top-right'/>
    </div>
  )
}

export default Dashboard
