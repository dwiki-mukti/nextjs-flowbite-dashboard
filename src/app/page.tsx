'use client'

import { DarkThemeToggle } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/panel');
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">Pages React + Next.js</h1>
      <DarkThemeToggle />
    </main>
  );
}
