

import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
const Auth = ({children}) => {
 const encryptedToken = cookies().get('token')?.value
  const token = encryptedToken ? encryptedToken : null
  
  if (token) {
     redirect("/dashboard")
   }

 
    return (
    <div>
      {children}
    </div>
  )
}

export default Auth
