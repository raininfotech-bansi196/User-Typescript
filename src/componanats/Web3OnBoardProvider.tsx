// "use client";

// import injectedModule from "@web3-onboard/injected-wallets";
// import { Web3OnboardProvider, init } from "@web3-onboard/react";
// import walletConnectModule from "@web3-onboard/walletconnect";
// import { useEffect, useState } from "react";

// const injected = injectedModule();
// const walletConnect = walletConnectModule({
//     projectId: "b42d401a370c3fb6e7e7635609e76337",
//     version: 2,
//     requiredChains: [1, 42161, 280],
// });

// const wallets = [injected, walletConnect];
// const rpcUrl = "https://rpc.ankr.com/eth";

// const chains = [
//     { id: '0x1', token: 'ETH', label: 'Ethereum Mainnet', rpcUrl },
//     { id: '0xa4ba', token: 'ARB', label: 'Arbitrum Nova', rpcUrl: 'https://nova.arbitrum.io/rpc' },
//     { id: '0x2105', token: 'ETH', label: 'Base', rpcUrl: 'https://mainnet.base.org' },
// ];

// export default function Web3Provider({ children }: { children: React.ReactNode }) {
//     const [web3Onboard, setWeb3Onboard] = useState<any>(null);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const web3Instance = init({
//                 wallets,
//                 chains,
//                 appMetadata: {
//                     name: "Web3-Onboard Demo",
//                     icon: "<svg>App Icon</svg>",
//                     description: "A demo of Web3-Onboard."
//                 },
//                 theme: 'dark'
//             });
//             setWeb3Onboard(web3Instance);
//         }
//     }, []);

//     if (!web3Onboard) return null;

//     return (
//         <Web3OnboardProvider web3Onboard={web3Onboard}>
//             {/* <WalletConnector /> */}
//             {children}
//         </Web3OnboardProvider>
//     );
// }