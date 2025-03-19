import Web3Provider from "@/componanats/Web3OnBoardProvider";
import { AuthContextProvider } from "@/context/auth";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthContextProvider>
       {children}
        </AuthContextProvider>
    );
}
