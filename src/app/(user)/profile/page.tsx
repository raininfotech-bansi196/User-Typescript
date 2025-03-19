"use client"
import ChangePassword from '@/componanats/profile/ChangePassword'
import EditProfile from '@/componanats/profile/EditProfile'
import Twofa from '@/componanats/profile/Twofa'
import { useAuthContext } from '@/context/auth'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from "ethers"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Web3 from 'web3'
const page = () => {
    const [tab, setTab] = useState(1)
    const { address } = useWeb3ModalAccount();
    const [bnbBalance, setBnbBalance] = useState<string>('');
    const [usdtBalance, setUsdtBalance] = useState<string>('');
    const CONTRACT_ADDRESS = "0x4Df8915307c1b9fe492681eCA926aD50A476cD7D"
    const [spinner, setSpinner] = useState(true);
    const { userDetails,setPageLoader } = useAuthContext();
    
    const getBalance = async () => {

        if (!window.ethereum) {
            toast.error("Please install MetaMask");
            return false;
        }
        if (address) {
            try {
                const web3 = new Web3(window.ethereum);

                // BNB Balance
                const rawBalance = await web3.eth.getBalance(address);
                const formattedBalance = web3.utils.fromWei(rawBalance, 'ether');
                setBnbBalance(formattedBalance);

                // USDT Balance
                const provider = new ethers.JsonRpcProvider(process.env.RPCURL);
                const usdtAbi = ["function balanceOf(address owner) view returns (uint256)"];
                const usdtContract = new ethers.Contract(CONTRACT_ADDRESS, usdtAbi, provider);
                const usdtBalance = await usdtContract.balanceOf(address);
                const formattedUsdt = ethers.formatUnits(usdtBalance, 18);
                setUsdtBalance(formattedUsdt)
            } catch (error) {
                console.error("Error fetching balance:", error);
                toast.error("Failed to get balance");
            }
        }
        setSpinner(false)
    }
    useEffect(() => {
        getBalance();
    }, [address])
    useEffect(() => {
        if(userDetails){
            setPageLoader(false)
        }
    },[])
    return (
        <>
            <section className="page-info-section">
                <div className="container">
                    <h2 className='fw-bold fw-bolder'>Profile</h2>
                    <div className="site-beradcamb">
                        <Link href="/">Home</Link>
                        <span>
                            <i className="fa fa-angle-right" /> Profile
                        </span>
                    </div>
                </div>
            </section>
            <section className='profile-info py-5'>
                <div className="container">
                    <div className='row'>
                        <div className='col-12'>
                            <div className='profile-details px-4 py-3 mb-4 d-flex align-items-center'>
                                <img src='/img/metamask.png' width={100} height={100} className='d-d-inline-block' />
                                <div className='pl-4 flex-grow-1 d-flex align-items-center justify-content-between'>
                                    {
                                        spinner ?
                                            <div className='spinner-border text-primary'></div> :
                                            <>
                                                <div>
                                                    <h5 className='fw-bold'>{address}</h5>
                                                    <span className='m-0 fw-semibold'><div className='green-dot bg-success mr-2'></div>Connected</span>
                                                </div>
                                                <div>
                                                    <span className='d-block fs-1 text-dark text-right'>{Number(bnbBalance).toFixed(5)} BNB</span>
                                                    <span className='d-block fs-1 text-dark text-right'>{Number(usdtBalance).toFixed(5)} USDT</span>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-4'>
                            <div className="profile-sidebar p-4">
                                <div className="profile-userpic mx-auto">
                                    <img src="/img/user.png" className="img-responsive" alt="" />
                                </div>
                                <div className='text-center mt-4'>
                                    <span className="fs-4 fw-bold d-block profile-name">
                                        {userDetails?.username || "John Doe"}
                                    </span>
                                    <p className="m-0 text-dark">
                                        {userDetails?.email}
                                    </p>
                                   {userDetails && <p className='m-0'>
                                        {userDetails?.address !== '' && <>{userDetails?.address}, </>}
                                        {userDetails?.city !== '' && <>{userDetails?.city}, </>}
                                        {userDetails?.state !== '' && <>{userDetails?.state}, </>}
                                        {userDetails?.country !== '' && <>{userDetails?.country}, </>}
                                        {userDetails?.pincode !== '' && <>{userDetails?.pincode} </>}
                                    </p>}
                                    <div className="social mt-5">
                                        <a href="" className="facebook">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </a>
                                        <a href="" className="google">
                                            <i className="fa-brands fa-google-plus-g"></i>
                                        </a>
                                        <a href="" className="instagram">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                        <a href="" className="twitter">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-8'>
                            <div className='profile-details'>
                                <div className='profile-tab'>
                                    <div onClick={() => setTab(1)} className={`tab-item ${tab === 1 && 'active'}`}>
                                        <span className='fw-bold'>Personal Information</span>
                                    </div>
                                    <div onClick={() => setTab(2)} className={`tab-item ${tab === 2 && 'active'}`}>
                                        <span className='fw-bold'>Change Password</span>
                                    </div>
                                    <div onClick={() => setTab(3)} className={`tab-item ${tab === 3 && 'active'}`}>
                                        <span className='fw-bold'>Two Factor Authentication</span>
                                    </div>
                                </div>
                                {
                                    tab === 1 && <EditProfile />
                                }
                                {
                                    tab === 2 && <ChangePassword />
                                }
                                {
                                    tab === 3 && <Twofa />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page