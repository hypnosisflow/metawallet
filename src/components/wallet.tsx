import React, { SyntheticEvent, useEffect, useState } from "react";
import { Wallet as W } from "@mui/icons-material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { formatBalance } from "@/utils";

const BTNS = [
  { label: "ETH", value: "0x1" },
  { label: "BNB", value: "0x38" },
  { label: "Sepolia", value: "0xaa36a7" },
];

interface IWallet {
  account?: string;
  chainId?: string;
  balance?: string;
  changeNetwork: (str: string) => Promise<void>;
  sendTransaction: (recipent: string, amount: string) => Promise<void>;
}

export const Wallet = ({ wallet }: { wallet: IWallet }) => {
  const [amount, setAmount] = useState("0x5AF3107A4000");
  const [recipent, setRecipent] = useState("");
  const [activeNetwork, setActiveNetwork] = useState("");

  const { account, chainId, balance, changeNetwork, sendTransaction } = wallet;

  useEffect(() => {
    const f = BTNS.filter((i) => i.value === chainId)[0];
    if (f) setActiveNetwork(f.label);
  }, [chainId]);

  const handleSwitchNewtwork = (btn: (typeof BTNS)[0]) => {
    setActiveNetwork(btn.label);
    changeNetwork(btn.value);
  };

  const handleTransactionSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendTransaction(recipent, amount);
  };

  return (
    <div className=" bg-white p-4 rounded-[16px] min-w-[360px] gap-4 shadow-md flex flex-col justify-between">
      {/* header / id  */}
      <div className="flex gap-2">
        <h3 className="font-medium">Wallet</h3>
        <W />
      </div>
      <span className="text-xs truncate "> {account}</span>

      {/* ballance */}
      <div className="text-sm">
        <p className="font-medium"> Network</p>
        <div className="flex gap-4">
          <div className="flex gap-2">
            {BTNS.map((i) => {
              return (
                <button
                  key={i.value}
                  onClick={() => handleSwitchNewtwork(i)}
                  className={` rounded-sm px-2 ${
                    activeNetwork === i.label ? "bg-black/30" : "bg-slate-100 "
                  }`}
                >
                  {i.label}
                </button>
              );
            })}
          </div>
          <div>
            <span>Current Balance: </span>
            {/* форматированный баланс работает только с BNB сеть */}
            {/* {balance && <span>{formatBalance(balance)}</span>} */}
            <span>{balance}</span>
          </div>
        </div>
      </div>

      {/* transaction */}
      <div className="text-sm">
        <p className="font-medium">Transaction</p>
        <form
          name="send-currency"
          onSubmit={handleTransactionSubmit}
          className="flex flex-col gap-2 text-sm"
        >
          <Input
            value={recipent}
            onChange={(e) => setRecipent(e.currentTarget.value)}
            placeholder="ID"
          />
          <Input
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            placeholder="Amount"
            fullWidth={false}
          />
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            className="mt-4"
          >
            <span>send transaction</span>
          </Button>
        </form>
      </div>
    </div>
  );
};
