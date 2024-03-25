"use client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import React from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: url,
        },
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};
