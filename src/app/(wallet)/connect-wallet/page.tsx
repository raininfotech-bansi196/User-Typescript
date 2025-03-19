"use client"
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
    const { open } = useWeb3Modal()
    const { address } = useWeb3ModalAccount();
    const router = useRouter();
    const handleDisconnect = async () => {
        await open({ view: 'Account' });
    }
    useEffect(() => {
        if(address){
            router.push("/")
        }
    },[address])
    return (
        <div className='wallet-create-container'>
            <div className='container-xxl'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-12 col-lg-6 create-wallet-div'>
                            <div className='col-12 col-md-8 col-lg-12 col-xl-8 mx-auto ml-lg-auto'>
                                <h5 className='fw-bold text-uppercase'>Connect Your Crypto Wallet</h5>
                                <h2>
                                    Securely Access Your Digital Assets
                                </h2>
                                <p>Connect your crypto wallet to seamlessly manage transactions, track balances, and interact with blockchain networks. Choose your preferred wallet and get started in just a few clicks. 🚀</p>
                                <button className="site-btn sb-gradients" onClick={() => { address ? handleDisconnect() : open({ view: 'Connect' }) }} >
                                    {address ? "Disconnect Wallet" : "Connect Wallet"}
                                </button>
                            </div>
                        </div>
                        <div className='d-none d-lg-flex col-12 col-lg-6 create-wallet-div'>
                            <img src='/img/wallet.png' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page