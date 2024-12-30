'use server'

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const signInRedirect = async () => {
  const user = await currentUser();

  if(!user){
    throw new Error("User not found!!")
  }

  const existingUser = await prisma.user.findUnique({
    where : {
      clerkId : user.id
    }
  })

  if(!existingUser){
    await prisma.user.create({
      data : {
        clerkId : user.id,
        name : user.fullName || "Unknown User",
        email : user.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/dashboard")
}

export { signInRedirect }