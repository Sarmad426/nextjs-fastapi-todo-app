"use client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { todos } from "@/lib/types";
import axios from "axios";

const TodoItem = ({ id, title, completed }: todos) => {
  const router = useRouter();

  const handleDelete = async (id: any) => {
    try {
      await axios.post(`http://localhost:3000/api/delete/${id}`, {
        id,
      });
      router.refresh();
      toast.success("Todo deleted successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };
  async function toggleTodo(id: string, completed: boolean) {
    console.log({ id, completed });
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, {
        id,
        completed,
      });
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="flex items-center justify-normal gap-12">
      <section className="flex-1 my-4">
        <input
          type="checkbox"
          className="peer cursor-pointer"
          defaultChecked={completed}
          id={id}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500 mx-4 text-sm lg:text-lg"
        >
          {title}
        </label>
      </section>
      <section>
        <Button
          size="sm"
          className="bg-rose-600 text-gray-100"
          onClick={() => handleDelete(id)}
        >
          <Trash />
        </Button>
      </section>
    </div>
  );
};

export default TodoItem;
