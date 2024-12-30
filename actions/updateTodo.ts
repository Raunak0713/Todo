"use server"

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

interface updateTodoProps {
  id : number;
  title : string;
  description : string;
}

const updateTodo = async ({ id, title, description } : updateTodoProps) => {
  const user = await currentUser();
  if(!user) throw new Error("User not found")

  const existingUser = await prisma.user.findUnique({
    where : {
      clerkId : user.id
    }
  })

  if(!existingUser) throw new Error("User not in database")
  
  const correctTodo = await prisma.todo.findUnique({
    where : {
      id : id
    }
  })

  if(correctTodo?.userId !== existingUser.id){
    throw new Error("You can edit your todos only")
  }

  await prisma.todo.update({
    where : {
      id : id
    },
    data : {
      title : title,
      description : description
    }
  })

  return;
} 

export { updateTodo };
