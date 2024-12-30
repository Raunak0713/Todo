'use server'

import prisma from "@/lib/db";

export async function toggleTodo(id: number) {
  try {
    const currentTodo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!currentTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { isActive: !currentTodo.isActive }
    });

    return updatedTodo;
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
}