"use server"

import { cookies } from 'next/headers'
 
export async function removeToken() {
  cookies().set('token', '')
}

export async function getUrl(token) {
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