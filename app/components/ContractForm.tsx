"use client";
import { ConnectPublicClient, ConnectWalletClient } from "@/client";
import React, { useEffect, useState } from "react";
import { getContract, Hex } from "viem";
import funJson from "../../Fun.json";

const ContractForm = () => {
  const {getCurrentValue, handleChangeValue } = useForm();

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
