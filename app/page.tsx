"use client";

import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import ContractContent from "./components/ContractContent";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <main className="p-5">
      <h1 className="text-2xl text-center p-3">Viem x Next.js</h1>
      <div className="content flex flex-col justify-center items-center gap-y-5">
        <ConnectWallet
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        {isConnected && <ContractContent />}
      </div>
    </main>
  );
}
