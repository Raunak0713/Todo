'use client'
import { deleteTodo } from '@/actions/deleteTodo';
import { getAllTodos } from '@/actions/getAllTodos';
import { toggleTodo } from '@/actions/toggleTodo';
import { updateTodo } from '@/actions/updateTodo';
import { userInDatabase } from '@/actions/userInDatabase';
import { Check, Loader2, Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Greetings } from './Greetings';
import { Button } from './ui/button';
import { Card, CardDescription } from './ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface User {
  id: number;
  clerkId: string;
  name: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  userId: number;
}

const YourTodos = () => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState<number | null>(null);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userInDatabase();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!user) return;
      try {
        const fetchedTodos = await getAllTodos();
        setTodos(fetchedTodos);
        setToggleLoading(null);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (user) {
      fetchTodos(); // Initial fetch
      
      // Set up interval for fetching every 2 hours
      const intervalId = setInterval(fetchTodos, 2000); // 2 hours in milliseconds
      
      // Cleanup function to clear interval when component unmounts
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const handleToggle = async (id: number) => {
    setToggleLoading(id);

    try {
      await toggleTodo(id);
      const fetchedTodos = await getAllTodos()
      setTodos(fetchedTodos)
    } catch (error) {
      console.error("Error toggling todo:", error);
      setToggleLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo({ id });
      toast.success("Todo Deleted Successfully");
      const fetchedTodos = await getAllTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error deleting this todo");
    }
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedTodo) return;
    try {
      await updateTodo({ id : selectedTodo.id, title : updatedTitle, description : updatedDescription})
      toast.success("Todo Updated Successfully");
      setIsEditDialogOpen(false);
      const fetchedTodos = await getAllTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error saving the todo");
      toast.error("Failed to update todo");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    user ? (
      <div className="mt-20">
        <Greetings />
        <div className="mt-20">
          {todos.map(todo => (
            <Card
              key={todo.id}
              className={`${
                todo.isActive ? 'bg-gray-200/20' : 'bg-black'
              } mt-5 max-w-4xl mx-auto text-white transition-all duration-300`}
            >
              <div className="p-2 px-4 flex items-center justify-between">
                <div>
                  <span className={`${todo.isActive ? 'line-through' : ''}`}>
                    {todo.title}
                  </span>
                </div>
                <div className="flex gap-x-5 items-center translate-y-2.5">
                  <Button
                    onClick={() => handleToggle(todo.id)}
                    className="bg-gray-200 w-9 h-9 p-2 rounded-full"
                  >
                    <Check
                      className={`${
                        todo.isActive ? 'text-gray-400' : 'text-black'
                      } transition-all duration-300`}
                    />
                  </Button>
                  <Button onClick={() => handleEdit(todo)} className="rounded-full bg-blue-500 p-3 w-9 h-9">
                    <Pencil size={20} />
                  </Button>
                  <Button onClick={() => handleDelete(todo.id)} className="rounded-full bg-red-500 p-3 w-9 h-9">
                    <X size={25} />
                  </Button>
                </div>
              </div>
              <CardDescription className={`${todo.isActive ? ' ml-4 line-through' : 'ml-4'}`}>
                {todo.description}
              </CardDescription>
            </Card>
          ))}
        </div>

        {/* Edit Todo Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className='bg-black border-gray-100/30'>
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <div>
                <Label htmlFor="title"  className='font-bold tracking-wide mt-3' >Title</Label>
                <Input
                  id="title"
                  type="text"
                  className="border font-bold border-gray-50/15 mt-1 mb-3"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="description" className='font-bold tracking-wide mt-3'>Description</Label>
                <Textarea
                  id="description"
                  className="border font-bold border-gray-50/15 mt-1 mb-3"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <div className="button-group">
                <Button onClick={handleSaveEdit}>Save</Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
};

export { YourTodos };
