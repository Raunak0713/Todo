'use server'

import prisma from "@/lib/db";
import { userInDatabase } from "./userInDatabase";

interface makeTodoProps {
  title : string;
  description : string;
}

const makeTodo = async ({ title, description } : makeTodoProps) => {
  const user = await userInDatabase();

  if(!user){
    throw new Error("User not found")
  }

  if(!title || !description){
    throw new Error("All fields are mandatory")
  }

  await prisma.todo.create({
    data : {
      title : title,
      description : description,
      isActive : false,
      userId : user.id,
    }
  })
}

export{ makeTodo };
