"use client";

import { fetchApi } from '@/utils/frontend';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface UserDetails {
    email: string;
    isTwoFAEnabled: number;
    isVerified: number;
    password: string;
    username?: string;
    _id?: string;
    referral_code: string,
    country: string,
    phoneNumber: string,
    city: string,
    pincode: string,
    state: string,
    address: string
}

interface AuthContextType {
    authTkn: string;
    setAuthTkn: (authTkn: string) => void;
    pageLoader: boolean;
    setPageLoader: (pageLoader: boolean) => void;
    userDetails: UserDetails | null;
    setUserDetails: (userDetails: UserDetails) => void;
    isConnectWallet: boolean;
    setIsConnectWallet: (isConnectWallet: boolean) => void;
    isMaintenance: boolean;
    setIsMaintenance: (isConnectWallet: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    authTkn: 'init',
    setAuthTkn: () => { },
    pageLoader: true,
    setPageLoader: () => { },
    userDetails: null,
    setUserDetails: () => { },
    isConnectWallet: false,
    setIsConnectWallet: () => { },
    isMaintenance: false,
    setIsMaintenance: () => { },
});

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
    const [authTkn, setAuthTkn] = useState<string>('init');
    const [pageLoader, setPageLoader] = useState<boolean>(true);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isConnectWallet, setIsConnectWallet] = useState<boolean>(false);
    const [isMaintenance, setIsMaintenance] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        const token = getCookie("acsmailtkn");
        if (token) {
            setAuthTkn(token.toString());
            getMaintennace();
        } else {
            router.push("/login");
        }
    }, []);
    const getMaintennace = async () => {
        try {
            const response = await fetchApi(`/get-maintenance`, "", "GET");
            if (response?.statusCode === 200) {
                setIsMaintenance(response?.data?.maintananceStatus === 1 ? true : false);
                getUserDetails();
            } else {
                if (response?.data?.message === "Unauthorized") {
                    setAuthTkn(response?.data?.message)
                }
                toast.error(response?.data?.message)
            }
            setPageLoader(false);
            console.log({ response });
        } catch (error) {
            console.log({ error });
        }
    }
    const getUserDetails = async () => {
        try {
            const res = await fetchApi(`/user-details`, "", "GET");
            if (res.data.message === "Unauthorized") {
                router.push("/login");
            }
            if (res.statusCode === 200) {
                setUserDetails(res.data.data);
            }
            setPageLoader(false);
        } catch (error) {
            console.error(error);
        }
    };
    const path = usePathname();
    useEffect(() => {
        setPageLoader(true)
    }, [path])

    return (
        <AuthContext.Provider value={{ authTkn, setAuthTkn, pageLoader, setPageLoader, userDetails, setUserDetails, isConnectWallet, setIsConnectWallet, isMaintenance, setIsMaintenance }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
