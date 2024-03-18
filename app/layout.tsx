import ToastProvider from "@/components/toast-provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="png" href="logo.png" />
      </head>
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
