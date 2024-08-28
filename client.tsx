import { createWalletClient, createPublicClient, custom, http } from "viem";
import { polygonAmoy } from "viem/chains";
import "viem/window";

export async function ConnectWalletClient() {
  if (!window.ethereum) {
    const errorMessage =
      "Metamask or other wallet is not detected. Please install one to proceed.";
    throw new Error(errorMessage);
  }

  const walletClient = createWalletClient({
    chain: polygonAmoy,
    transport: custom(window.ethereum!),
  });

  return walletClient;
}

export function ConnectPublicClient() {
  const apiURL = process.env.API_URL;
  const publicClient = createPublicClient({
    chain: polygonAmoy,
    transport: http(apiURL),
  });

  return publicClient;
}
