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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
        className="text-gray-800 p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-5 h-5"
        />
        Completed
      </label>
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
