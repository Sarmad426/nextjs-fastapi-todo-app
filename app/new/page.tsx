"use client";

// components/TodoForm.tsx

import { useState } from "react";
import axios from "axios";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = { title, completed };
      await axios.post("http://localhost:3000/api/todos/new", data);
      // Reset the form fields after successful submission
      setTitle("");
      setCompleted(false);
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-4">
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
