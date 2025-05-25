
import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";
import { SummaryButton } from "./SummaryButton";
import { useToast } from "@/hooks/use-toast";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Review project requirements and create development plan",
      completed: false,
      createdAt: new Date()
    },
    {
      id: "2", 
      text: "Set up development environment with React and Supabase",
      completed: true,
      createdAt: new Date()
    },
    {
      id: "3",
      text: "Implement frontend todo management interface",
      completed: false,
      createdAt: new Date()
    }
  ]);

  const { toast } = useToast();

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos([newTodo, ...todos]);
    toast({
      title: "Todo added",
      description: "Your new task has been added successfully.",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    toast({
      title: "Todo updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "Your task has been removed.",
      variant: "destructive"
    });
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <AddTodoForm onAdd={addTodo} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Tasks ({pendingTodos.length})
            </h2>
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          </div>
          <div className="space-y-3">
            {pendingTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            ))}
            {pendingTodos.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No pending tasks. Great job! 🎉
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Completed Tasks ({completedTodos.length})
            </h2>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="space-y-3">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            ))}
            {completedTodos.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No completed tasks yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <SummaryButton todos={pendingTodos} />
      </div>
    </div>
  );
};
