"use server"

import { cookies } from 'next/headers'
 
export async function removeToken() {
  cookies().set('token', '')
}

export async function getUrl(token) {
  
  
  
    const res = await fetch(`${process.env.NEXT_HOST}/url/geturl`,
      {
        cache:"no-store", headers: {
        Authorization: `Bearer ${token.token}`,
        }
      })
  
  const value=await res.json()
   return value
    
  
}