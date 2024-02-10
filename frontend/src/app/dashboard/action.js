"use server"

import { cookies } from 'next/headers'
 
export async function removeToken() {
  cookies().set('token', '')
}

export async function getUrl(token) {
  
  const host="https://url-shortener-ychf.onrender.com"
  
    const res = await fetch(`${host}/url/geturl`,
      {
        cache:"no-store", headers: {
        Authorization: `Bearer ${token.token}`,
        }
      })
  
  const value=await res.json()
   return value
    
  
}