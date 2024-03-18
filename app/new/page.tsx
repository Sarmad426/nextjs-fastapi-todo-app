"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      toast.success("Todo Added successfully.");
    } catch (error) {
      console.error("Error submitting todo:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-x-5"
    >
      <input
        type="text"
        className="text-black w-[18rem] h-[2.3rem]"
        name="title"
        required
      />
      <button className="bg-white text-black p-3 rounded-md hover:bg-gray-100">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
