import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";

interface TokenProps {
  mint: string;
  amount: string;
  name?: string;
  symbol?: string;
  logoURI?: string;
}

function TokenList() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [splTokens, setSplTokens] = useState<TokenProps[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  // Fetch SPL token balances
  const fetchSplTokenBalances = async () => {
    if (!publicKey) return;

    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ), // SPL Token Program ID
        }
      );

      console.log("Token accounts:", tokenAccounts.value);

      const tokens: TokenProps[] = tokenAccounts.value.map((accountInfo) => {
        const tokenInfo = accountInfo.account.data.parsed.info;
        return {
          mint: tokenInfo.mint,
          amount: tokenInfo.tokenAmount.uiAmount,
        };
      });

      // Map token metadata from token list
      const enrichedTokens = tokens.map((token) => {
        const tokenMetadata = tokenMap.get(token.mint);
        return {
          ...token,
          name: tokenMetadata?.name,
          symbol: tokenMetadata?.symbol,
          logoURI: tokenMetadata?.logoURI,
        };
      });

      setSplTokens(enrichedTokens);
    } catch (error) {
      console.error("Failed to fetch SPL token balances:", error);
    }
  };

  // Load the token list
  const loadTokenList = async () => {
    const tokens = await new TokenListProvider().resolve();
    const tokenList = tokens.filterByChainId(101).getList(); // Chain ID 101 is for Solana mainnet
    const tokenMap = tokenList.reduce((map, item) => {
      map.set(item.address, item);
      return map;
    }, new Map<string, TokenInfo>());
    console.log(tokenMap);

    setTokenMap(tokenMap);
  };

  useEffect(() => {
    loadTokenList();
  }, []);

  useEffect(() => {
    fetchSplTokenBalances();
  }, [tokenMap]);

  return (
    <div>
      <h1 className="text-3xl my-5 text-violet-200 font-bold">
        Wallet Token Balances
      </h1>
      {publicKey ? (
        <div>
          <ul className="mb-2">
            {splTokens.length > 0 ? (
              splTokens.map((token, index) => (
                <li key={index} className="flex items-center space-x-4 mb-3">
                  {token.logoURI ? (
                    <img
                      src={token.logoURI}
                      alt={token.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  )}
                  <span>
                    {token.name || "Unknown"} ({token.symbol || "N/A"}):{" "}
                    {token.amount}
                  </span>
                </li>
              ))
            ) : (
              <li>No SPL tokens found.</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  );
}

export default TokenList;
