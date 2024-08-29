const useWallet = () => {
  async function handleClick() {
    try {
      const walletClient = await ConnectWalletClient();
      const publicClient = await ConnectPublicClient();

      const [address] = await walletClient.requestAddresses();
      const balance = formatEther(await publicClient.getBalance({ address }));

      setAddress(address);
      setBalance(balance);
      setIsConnected(true);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return {handleClick}
}
