"use client";

import { useState } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "@/client";
import { formatEther } from "viem";

interface ConnectWalletProps {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
}

export default function ConnectWallet({
  isConnected,
  setIsConnected,
}: ConnectWalletProps) {
	const {handleClick} = useWallet();

  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 w-4/12">
      <button
        className="border border-slate-950 text-slate-950 px-4 py-2 mx-auto rounded-md w-40"
        onClick={handleClick}
        disabled={isConnected}
      >
        {isConnected ? "Connected" : "Connect Wallet"}
      </button>

      {isConnected && (
        <div className="border border-slate-950 p-5 rounded-md">
          <h1 className="text-xl">Wallet Info</h1>
          <h1>Address: {address}</h1>
          <h1>Balance: {balance}</h1>
        </div>
      )}
    </div>
  );
}
