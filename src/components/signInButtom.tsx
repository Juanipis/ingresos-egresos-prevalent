"use client"
import { signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  return (
    <Button 
      onClick={() => signIn("auth0")}
      className="w-full max-w-xs"
    >
      Sign In with auth0
    </Button>
  )
}

export function SignOut() {
  return (
    <Button 
      onClick={() => signOut()}
      className="w-full max-w-xs"
    >
      Sign Out
    </Button>
  )
}