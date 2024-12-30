'use server'
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

interface DeleteTodoProps {
  id: number;
}

const deleteTodo = async ({ id }: DeleteTodoProps): Promise<void> => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found in the database");
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  if (todo.userId !== existingUser.id) {
    throw new Error("You are not authorized to delete this todo");
  }

  await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  return;
};

export { deleteTodo };
