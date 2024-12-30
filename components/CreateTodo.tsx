"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PenBox } from 'lucide-react';
import { makeTodo } from '@/actions/makeTodo';
import { useState } from 'react';
import { toast } from 'sonner';

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [create, setCreate] = useState<boolean>(false)

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      setCreate(true)
      await makeTodo({ title, description })
      setTitle('')
      setDescription('')
      toast.success("Todo created successfully")
      setCreate(false)
    } catch (error) {
      console.log("Error creating todo", error)
    }
  }

  return (
    <div className='max-w-2xl mx-auto mt-20'>
      <form onSubmit={handleSubmit}>
        <Card className='bg-black text-white'>
          <CardHeader>
            <CardTitle>Create Todo</CardTitle>
            <CardDescription className='font-bold'>Create a Todo with a title and description</CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="font-bold tracking-wide" htmlFor='title'>Todo's Title</Label>
            <Input 
              className='border font-bold border-gray-50/15 mt-1 mb-3' 
              type='text' 
              placeholder='Enter Todo Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
            />

            <Label className='font-bold tracking-wide mt-3' htmlFor='description'>Todo's Description</Label>
            <Input 
              className='border font-bold border-gray-50/15 mt-1 mb-3'  
              type='text' 
              placeholder='Enter Todo Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description" // Fixed this id from 'title' to 'description'
            />
            
          </CardContent>
          <CardFooter className='justify-center'>
            <Button disabled={create} variant={"destructive"} className='font-bold' type="submit">
              Create Todo
              <PenBox className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export { CreateTodo };