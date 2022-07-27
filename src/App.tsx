import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { TodoItem } from "./components/TodoItem";
import dummyData from "./dummyData.json";

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

type Todos = {
  completed: TodoType[];
  notCompleted: TodoType[];
};

function App() {
  const [todos, setTodos] = useState<Todos>(dummyData.todos);

  const toggleTodo = (ref: React.MutableRefObject<null>, id: number) => {
    const todo = ref.current! as HTMLDivElement;

    if (todo.classList.contains("completed")) {
      todo.classList.add("not-completed");
      todo.classList.remove("completed");
    } else {
      todo.classList.add("completed");
    }

    setTimeout(() => {
      setTodos((prev) => {
        if (prev.completed.find((todo) => todo.id === id)) {
          const ourTodo = prev.completed.find((todo) => todo.id === id);
          return {
            completed: prev.completed.filter((todo) => todo.id !== id),
            notCompleted: [
              { id, title: ourTodo!.title, completed: false },
              ...prev.notCompleted,
            ],
          };
        } else {
          const ourTodo = prev.notCompleted.find((todo) => todo.id === id);
          return {
            completed: [
              { id, title: ourTodo!.title, completed: true },
              ...prev.completed,
            ],
            notCompleted: prev.notCompleted.filter((todo) => todo.id !== id),
          };
        }
      });
    }, 500);
  };

  return (
    <div className="App space-y-2 mx-auto max-w-md">
      {todos.notCompleted.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          isCompleted={false}
        />
      ))}

      {todos.completed.length !== 0 && (
        <div className="p-4 flex space-x-2 text-gray-400">
          <ChevronDownIcon className="h-5" />
          <p className="text-sm">Completed {todos.completed.length}</p>
        </div>
      )}

      {todos.completed &&
        todos.completed.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            isCompleted
          />
        ))}
    </div>
  );
}

export default App;
