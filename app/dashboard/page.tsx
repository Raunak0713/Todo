import { CreateTodo } from '@/components/CreateTodo';
import { Navbar } from '@/components/Navbar';
import { YourTodos } from '@/components/YourTodos';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <CreateTodo />
      <YourTodos />
    </div>
  );
}

export default page;
