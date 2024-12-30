"use client"

import { Target } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, SignUp, SignUpButton, UserButton, useUser } from "@clerk/nextjs";


const Navbar = () => {
  const { isSignedIn } = useUser()

  return (
    <div className="p-2 border-gray-100/20 border-b flex justify-between items-center">
      <div className="text-3xl tracking-wide">
        <Link href={"/"} className="flex">
          Task
          <span className="flex items-center" style={{ color: "hsl(0, 84.2%, 60.2%)" }}>
            Ninja {" "}
            <Target size={35} />
          </span>
        </Link>
      </div>

      { isSignedIn ? (
        <div>
          <UserButton appearance={{
            elements : {
              userButtonAvatarBox : {
                width: '2rem',
                height: '2rem',
                marginTop: '0.5rem'
              }
            }
          }}/>
        </div>
      ) : (
        <div className="flex gap-4">
          <SignUpButton>
            <div>
              <Button variant={"destructive"}>Sign Up</Button>  
            </div>
          </SignUpButton>
          <div>
            <SignInButton>
              <Button variant={"white"}>Login</Button>
            </SignInButton>
          </div>
        </div>
      )}
      
    </div>
  );
}

export { Navbar };
