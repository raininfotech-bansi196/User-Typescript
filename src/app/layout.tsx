"use client";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const projectId = process.env.WALLET_CONNECT_ID || "";
  // const chainId = process.env.CHAINID ? parseInt(process.env.CHAINID) : 11155111; // Default to Sepolia Testnet
  // const rpcUrl = process.env.RPCURL || "https://sepolia.infura.io/v3/YOUR_INFURA_KEY";

  // const chain = [
  //   {
  //     chainId,
  //     name: process.env.CHAINNAME || "Ethereum Sepolia",
  //     currency: process.env.CURRENCY || "ETH",
  //     explorerUrl: process.env.EXPLORER_URL || "https://sepolia.etherscan.io",
  //     rpcUrl,
  //   },
  // ];

  // const metadata = {
  //   name: process.env.SITENAME || "MyDApp Testnet",
  //   description: "Testnet Wallet Connection using Web3Modal",
  //   url: process.env.BASE_URL || "https://mytestdapp.com",
  //   icons: [`${process.env.BASE_URL || "https://mytestdapp.com"}/next.svg`],
  // };

  // const ethersConfig = defaultConfig({ metadata });

  // createWeb3Modal({
  //   ethersConfig,
  //   chains: chain,
  //   projectId,
  //   enableAnalytics: true,
  // });

  const projectId = process.env.WALLET_CONNECT_ID || ""
  interface Chain {
    chainId: number;
    name: string;
    currency: string;
    explorerUrl: string;
    rpcUrl: string;
  }
  const chain: Chain[] = [
    {
      chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID || "1"),
      name: process.env.NEXT_PUBLIC_CHAINNAME || "Ethereum",
      currency: process.env.NEXT_PUBLIC_CURRENCY || "ETH",
      explorerUrl: process.env.NEXT_PUBLIC_EXPLORER_URL || "https://etherscan.io",
      rpcUrl: process.env.NEXT_PUBLIC_RPCURL || "https://mainnet.infura.io/v3/",
    },
  ]
  interface Metadata {
    name: string;
    description: string;
    url: string;
    icons: string[];
  }
  const metadatas: Metadata = {
    name: process.env.NEXT_PUBLIC_SITENAME || "My Crypto Site",
    description: process.env.NEXT_PUBLIC_SITENAME || "My Crypto Site",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://example.com",
    icons: [`${process.env.NEXT_PUBLIC_BASE_URL || ""}/next.svg`],
  }

  const ethersConfig = defaultConfig({
    metadata: metadatas,
  })

  createWeb3Modal({
    ethersConfig,
    chains: chain,
    projectId,
    enableAnalytics: true
  })

  return (
    <html lang="en">
      <head>
        <title>Cryptocurrency - Landing Page Template</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Cryptocurrency Landing Page Template" />
        <meta name="keywords" content="cryptocurrency, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/img/favicon.ico" rel="shortcut icon" />
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />

        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/themify-icons.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>
        <Toaster position="top-right" />
        {children}
        <script src="/js/jquery-3.2.1.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/main.js"></script>
      </body>
    </html>
  );
}
