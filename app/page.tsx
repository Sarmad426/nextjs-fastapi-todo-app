import Todos from "@/components/todos";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { todos } from "@/lib/types";

export const revalidate = 0;

const Home = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const apiRequest = await fetch(`${apiUrl}/api/todos`);
  const data: { todos: todos[] } = await apiRequest.json();
  const { todos } = data;
  console.log("Todos: ", todos);
  const leftTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  return (
    <div>
      <div className="mt-3 mb-5 flex items-center justify-center">
        <div>
          <Image src={logo} alt="Logo" className="w-16 rounded-full my-3" />
          <h2 className="text-3xl font-semibold my-4">Todo App</h2>
          <p className="my-3 text-muted-foreground">
            Be Productive by managing tasks efficiently.
          </p>
        </div>
        <div>
          <Button className="text-gray-200 bg-black" asChild>
            <Link href="/new">
              Add New <PlusCircle className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-16 flex-wrap">
        <div className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border h-[25rem]">
          <h3 className="text-2xl font-semibold text-center text-gray-700">
            Pending Tasks
          </h3>
          <Todos todos={leftTodos} />
        </div>
        <div className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border h-[25rem]">
          <h3 className="text-2xl font-semibold text-center text-gray-700">
            Completed Tasks
          </h3>
          <Todos todos={completedTodos} />
        </div>
      </div>
    </div>
  );
};

export default Home;
