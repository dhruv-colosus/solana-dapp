import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

const LauncToken = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    imageUrl: "",
    initialSupply: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { connection } = useConnection();
  const wallet = useWallet();

  const createToken = async () => {
    const keypair = Keypair.generate();

    const metadata = {
      mint: keypair.publicKey,
      name: "DHRUV",
      symbol: "DHR",
      uri: "https://cdn.100xdevs.com/metadata.json",
      additionalMetadata: [],
    };
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataLen
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        5,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
    );
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = wallet.publicKey;

    transaction.partialSign(keypair);

    const ress = await wallet.sendTransaction(transaction, connection);
    console.log("res", ress);
    console.log(`Token mint created at ${keypair.publicKey.toBase58()}`);

    console.log("Creating token with data:", formData);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-36">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create a Token</CardTitle>
          <CardDescription>
            Enter the details for your new token.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <Input
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="Symbol"
            />
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
            <Input
              name="initialSupply"
              value={formData.initialSupply}
              onChange={handleInputChange}
              placeholder="Initial Supply"
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={createToken} className="w-full">
            Create a token
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LauncToken;
