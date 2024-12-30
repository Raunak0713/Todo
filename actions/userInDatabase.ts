'use server'

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const userInDatabase = async () => {
  const user = await currentUser()
  if(!user) throw new Error("User not found")
  
  const exisitingUser = await prisma.user.findUnique({
    where : {
      clerkId : user.id
    }
  })
  if(!exisitingUser) throw new Error("User not found in database")

  return exisitingUser
}

export { userInDatabase };
