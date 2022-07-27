import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { TodoItem } from "./components/TodoItem";
import dummyData from "./dummyData.json";

function App() {
  const [todos, setTodos] = useState(dummyData.todos);

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
        return prev.map((todo) => {
          if (todo.id === id) return { ...todo, completed: !todo.completed };
          return todo;
        });
      });
    }, 500);
  };

  return (
    <div className="App space-y-2 mx-auto max-w-md">
      {todos
        .filter((todo) => !todo.completed)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            isCompleted={false}
          />
        ))}

      <div className="p-4 flex space-x-2 text-gray-400">
        <ChevronDownIcon className="h-5" />
        <p className="text-sm">
          Completed {todos.filter((todo) => todo.completed).length}
        </p>
      </div>

      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
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
