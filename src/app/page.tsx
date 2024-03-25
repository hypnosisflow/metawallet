"use client";

import { Test } from "@/components/test";
import { MetaMaskProvider } from "@metamask/sdk-react";

export default function Home() {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-start p-4 gap-4">
        <h1 className="text-2xl font-medium">Stakewolle</h1>

        <Test />
      </main>
    </MetaMaskProvider>
  );
}
