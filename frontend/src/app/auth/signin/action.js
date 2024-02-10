"use server"
import { cookies } from 'next/headers'

export const handleSign = async (body) => {
    try {

        const result = await fetch("http://localhost:5000/auth/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",


            },
            body: JSON.stringify(body),

        })
        console.log("resykt")
        const jwt = await result.json()
        console.log("token: " + jwt)
        cookies().set('token', jwt, {
            httpOnly: true,
            maxAge: 60 * 60,
            path: '/',
        })
        return true

    } catch (error) {
      return error.message
        
    }
}