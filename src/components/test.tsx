"use client";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { Wallet } from "./wallet";
import { Button } from "@mui/material";

export const Test = () => {
  const {
    sdk,
    account,
    extensionActive,
    provider,
    balance,
    chainId,
    connected,
  } = useSDK();

  const [response, setResponse] = useState("");

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  const sendTransaction = async (to: string, amount: string) => {
    const hexValue = (+amount * Math.pow(10, 18)).toString(16);
    const transactionParameters = {
      to,
      from: provider?.getSelectedAddress(),
      value: hexValue,
    };

    try {
      const txHash = (await provider?.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })) as string;

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const changeNetwork = async (hexChainId: string) => {
    console.debug(`switching to network chainId=${hexChainId}`);
    try {
      const response = await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex  gap-2">
        <span>
          Connect with <span className="font-medium">MetaMask</span>
        </span>

        {connected ? (
          <Button color="warning" variant="outlined" onClick={disconnect}>
            <span>Close</span>
          </Button>
        ) : (
          <Button color="primary" variant="outlined" onClick={connect}>
            <span>Open</span>
          </Button>
        )}
      </div>

      <span>
        Extension status:{" "}
        <span className="text-orange-600 font-bold">
          {extensionActive ? "active" : "none"}{" "}
        </span>
      </span>

      <Wallet
        wallet={{ account, chainId, balance, changeNetwork, sendTransaction }}
      />
    </div>
  );
};
