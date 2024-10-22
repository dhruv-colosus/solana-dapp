import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function AirDrop() {
  const [balance, setBalance] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();
  console.log(wallet.publicKey?.toBase58());

  useEffect(() => {
    async function getBalance() {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    }

    getBalance();
  }, [connection, wallet.publicKey]);

  function airdrop(amount: number) {
    if (wallet.publicKey) {
      connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
    }
  }

  return (
    <>
      <h1 className="mb-3">Airdop Some Sol on your testnet/devnet </h1>
      <div className=" flex gap-2 mb-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          placeholder="Enter The Amount"
          required
        />
        <button
          onClick={() => airdrop(amount)}
          className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
        >
          Airdrop
        </button>
      </div>
      <h1>Current Balance is : {balance} SOL </h1>
    </>
  );
}

export default AirDrop;
