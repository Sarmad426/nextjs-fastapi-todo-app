"use client";

import { useState } from "react";

import TodoForm from "@/components/todo-form";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

const NewTodoForm = () => {
  return (
    <main>
      <div className="mt-3 mb-5 flex items-center justify-center gap-x-32">
        <Image src={logo} alt="Logo" className="w-16 rounded-full" />
        <Button className="bg-black text-gray-200" asChild>
          <Link href="/" className={buttonVariants()}>
            View Todos <EyeIcon className="ml-2" />
          </Link>
        </Button>
      </div>
      <TodoForm />
    </main>
  );
};

export default NewTodoForm;
