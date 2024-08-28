"use client";
import { ConnectPublicClient, ConnectWalletClient } from "@/client";
import React, { useEffect, useState } from "react";
import { getContract, Hex } from "viem";
import funJson from "../../Fun.json";

const ContractForm = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Hex;
  const { abi } = funJson["contracts"]["contracts/Fun.sol:Fun"];

  const getCurrentValue = async () => {
    const publicClient = await ConnectPublicClient();

    const contract = getContract({
      address: contractAddress,
      abi,
      client: publicClient,
    });

    try {
      const x = await contract.read.x();
      setCurrentValue(Number(x));
    } catch (error) {
      console.error("Error reading contract value:", error);
    }
  };

  const handleChangeValue = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const walletClient = await ConnectWalletClient();

      const [account] = await walletClient.getAddresses();

      if (!account) {
        throw new Error("No account found. Please connect your wallet.");
      }

      const contract = getContract({
        address: contractAddress,
        abi,
        client: walletClient,
      });

      const hash = await contract.write.changeX([inputValue], {
        account,
      });

      alert(`Transaction sent! Hash: ${hash}`);

      const publicClient = await ConnectPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Watch for the event
      await contract.watchEvent.XWasChanged({
        onLogs: (logs) => console.log(logs),
      });

      // Update the current value
      getCurrentValue();
      // Reset input value
      setInputValue(0);
    } catch (error) {
      console.error("Error changing X:", error);
      alert("Failed to change X. Please check the console for details.");
    }
  };

  useEffect(() => {
    getCurrentValue();
  }, []);

  return (
    <form action="">
      <div className="text-center py-5">
        <p className="pb-2">Current value of X</p>
        <div className="flex justify-center items-center mx-auto border bg-slate-950 rounded-md text-white w-16 h-16">
          <p>{currentValue}</p>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 py-3">
        <label htmlFor="valueId">Change value of X</label>
        <input
          className="border border-slate-950 p-1 rounded-md"
          id="valueId"
          type="number"
          placeholder="Value of X"
          onChange={(e) => setInputValue(Number(e.target.value))}
          value={inputValue}
        />
        <button
          className="border border-slate-950 text-slate-950 px-4 py-2 rounded-md"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleChangeValue(e);
          }}
        >
          Change Value
        </button>
      </div>
    </form>
  );
};

export default ContractForm;
