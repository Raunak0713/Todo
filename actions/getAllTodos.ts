'use server'

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const getAllTodos = async () => {
  // console.log("Fetching user...");
  const user = await currentUser();

  if (!user || !user.id) {
    console.error("User or user.id not found");
    throw new Error("User or user.id not found");
  }

  // console.log("User found:", user.id);

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id
    }
  });

  if (!existingUser) {
    console.error("User not in database");
    throw new Error("User not in database");
  }

  try {
    // console.log("Fetching todos for user with id:", user.id);

    const todos = await prisma.todo.findMany({
      where: { userId : existingUser.id },
      orderBy: { dateCreated : 'desc'}
    });

    // console.log("Todos fetched:", todos);
    return todos || [];
  } catch (error) {
    console.error("Error fetching todos", error);
    throw new Error("Error fetching todos");
  }
};

export { getAllTodos };
