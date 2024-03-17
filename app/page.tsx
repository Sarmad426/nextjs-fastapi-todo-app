import React from "react";

interface todos {
  title: string;
  completed: boolean;
}

const Home = async () => {
  const apiRequest = await fetch("http://localhost:3000/api/todos");
  const data: { todos: todos[] } = await apiRequest.json();
  const { todos } = data;
  console.log(todos);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-gray-200 text-black rounded-lg p-4 shadow mb-4 flex justify-between items-center"
          >
            <span>{todo.title}</span>
            <input
              type="checkbox"
              checked={todo.completed}
              // onChange={() => handleTodoToggle(todo.id)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
