import Head from "next/head";
import { api } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Logo } from "@/components/logo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  // Načítání dat
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Head>
        <title>Moje Stravovani Interview</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Logo className="mx-auto mb-6 h-8" />
        <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">Todo App</h1>
          <div className="mb-4 flex">
            <Input
              type="text"
              placeholder="Add a new todo"
              className="mr-2 flex-grow"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded bg-gray-100 p-2"
              >
                <div className="flex items-center">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`${todo.completed ? "text-gray-500 line-through" : ""}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}