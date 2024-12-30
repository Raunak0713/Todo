"use client"

import { useUser } from "@clerk/nextjs"

const Greetings = () => {
  const { user } = useUser()
  return (
    <div className="text-red-500 text-5xl text-center">
      {user?.firstName}'s Todos
    </div>
  );
}

export { Greetings }; 
