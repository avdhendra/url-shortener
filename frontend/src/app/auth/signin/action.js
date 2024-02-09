"use server"
import { cookies } from 'next/headers'
import toast from "react-hot-toast"
export const handleSign = async (body) => {
    try {

        const result = await fetch("http://localhost:3000/auth/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",


            },
            body: JSON.stringify(body),

        })
        const jwt = await result.json()
        console.log("token: " + jwt)
        cookies().set('token', jwt, {
            httpOnly: true,
            maxAge: 60 * 60,
            path: '/',
        })
        return true

    } catch (error) {
        toast.error(error.message)
        return false
    }
}