"use client";

import { Test } from "@/components/test";
import { Provider } from "./provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 gap-4">
      <h1 className="text-2xl font-medium">Stakewolle</h1>

        <Test />
    </main>
  );
}
