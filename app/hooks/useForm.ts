
const useForm = () => {
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


  return {getCurrentValue, handleChangeValue };
}
