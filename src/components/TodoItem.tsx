import { CheckIcon } from "@heroicons/react/solid";
import { useRef } from "react";

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoItemType = {
  todo: TodoType;
  toggleTodo: (ref: React.MutableRefObject<null>, id: number) => void;
  isCompleted: boolean;
};

export const TodoItem = ({ todo, toggleTodo, isCompleted }: TodoItemType) => {
  const todoRef = useRef(null);

  return (
    <div
      ref={todoRef}
      className={`${
        isCompleted ? "completed" : ""
      } todo flex items-center space-x-1 bg-[#333] py-3 pl-2 pr-5 rounded-lg`}
    >
      <div
        className="p-3 cursor-pointer group"
        onClick={() => toggleTodo(todoRef, todo.id)}
      >
        <CheckIcon
          className={`check-icon h-5 border border-white border-opacity-10 rounded-sm duration-300 group-active:scale-75 ${
            todo.completed ? "bg-orange-400 text-white" : "text-transparent"
          }`}
        />
      </div>
      <h2
        className={`todo-title font-medium text-sm ${
          todo.completed ? "text-gray-400 before:right-0" : "before:right-full"
        }`}
      >
        {todo.title}
      </h2>
    </div>
  );
};
