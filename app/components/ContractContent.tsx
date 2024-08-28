import React from "react";
import ContractForm from "./ContractForm";

const ContractContent = () => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  return (
    <div className="border border-slate-950 p-5 rounded-md w-4/12">
      <h1 className="text-xl">Contract Content</h1>
      <p>Contract Address: {contractAddress}</p>

      <div className="border-t border-slate-950 mt-5">
        <ContractForm />
      </div>
    </div>
  );
};

export default ContractContent;
