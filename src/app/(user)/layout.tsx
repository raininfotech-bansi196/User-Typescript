
import Header from "@/componanats/Header";
import Footer from "@/componanats/Footer";
import { AuthContextProvider } from "@/context/auth";
import PageLoader from "@/componanats/PageLoader";

export default function RootLayout({ children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <AuthContextProvider>
            <PageLoader />
            <Header />
            {children}
            <Footer />
        </AuthContextProvider>
    );
}
