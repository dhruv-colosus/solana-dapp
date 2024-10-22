import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { FC, ReactNode, useMemo } from "react";
// import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaWalletProviderProps {
  children: ReactNode;
}
const Solanaprovider: FC<SolanaWalletProviderProps> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/nTzom10tC1iVDuR2c3a_INyCqagrz_7o"
      }
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider> {children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Solanaprovider;
