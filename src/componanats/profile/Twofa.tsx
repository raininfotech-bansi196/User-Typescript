import { useAuthContext } from '@/context/auth';
import { chk_otp, encryption_key, passEnc } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Twofa = () => {
    const { userDetails } = useAuthContext();
    const [isTowFa, setIsTwoFa] = useState(userDetails?.isTwoFAEnabled === 0 ? false : true);
    const [spinner, setSpinner] = useState(false);
    const [otp, setOtp] = useState("");
    const [twofa, setTwofa] = useState({
        secret: "",
        url: ""
    })
    const [isDisable, setIsDisable] = useState(false);

    const generateTwoFa = async () => {
        if (!isTowFa) {
            setSpinner(true)
            try {
                const res = await fetchApi(`/generate-twofa`, JSON.stringify({ a: 1 }), "POST");
                if (res.statusCode == 200) {
                    toast.success(res.data.message);
                    setTwofa({
                        secret: res?.data?.secretKey,
                        url: res?.data?.qrcode
                    })
                } else {
                    toast.error(res.data.message);
                }
            } catch (error: any) {
                toast.error(error);
            }
            setSpinner(false)
        } else {
            setIsDisable(true)
        }
    }
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    const verifyTwoFa = async () => {
        try {
            try {
                chk_otp(otp);
            } catch (error: string | any) {
                toast.error(error);
                return false
            }
            
            const response = await fetchApi(`/verify-twofa`, JSON.stringify({ otp, disable: isDisable ? 1 : 0, secret: passEnc(twofa?.secret,encryption_key('twofaKey')) }), "POST");
            if (response.statusCode == 200) {
                if (isDisable) {
                    setIsTwoFa(false);
                    setIsDisable(false);
                    setOtp('')
                    toast.success("Two factor authentication disabled successfully");
                } else {
                    setOtp('')
                    setIsTwoFa(true);
                    setTwofa({
                        secret: "",
                        url: ""
                    })
                    toast.success("Two factor authentication enabled successfully");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=' p-4'>
            <div className='bg-white d-flex align-items-center justify-content-between px-2 two-fa-box rounded-100'>
                <div>
                    <h5 className='mb-0 pl-4 fw-bold'>Two Factor Authentication</h5>
                </div>
                <div className="button r form-control" id="button-4">
                    <input type="checkbox" checked={isTowFa || isDisable} disabled={spinner} onChange={(e) => console.log("")} className="checkbox" onClick={() => generateTwoFa()} />
                    <div className="knobs"></div>
                    <div className="layer"></div>
                </div>
            </div>
            {
                twofa?.secret && twofa?.url &&
                <div className='mt-4 contact-form'>
                    <img src={twofa?.url} alt="twofa" className='mx-auto d-block' />
                    <div className='two-fa-box mt-4 d-flex align-items-center justify-content-between pl-4 pr-1 bg-white'>
                        <span>{twofa?.secret}</span>
                        <div className='copy-btn' onClick={() => copyToClipboard(twofa?.secret)}>
                            <i className="fa-regular fa-copy"></i>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='form-group mb-4'>
                            <input type="text" className='d-block w-100 check-form px-4' placeholder='Enter OTP' value={otp} onChange={(e) => e.target.value.length <= 6 && setOtp(e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1"))} />
                        </div>
                        <button onClick={() => verifyTwoFa()} disabled={spinner} className="site-btn fw-bold d-inline-block sb-gradients">
                            {spinner && <div className="btn-loader mr-2"></div>}<span>Submit</span>
                        </button>
                    </div>
                </div>
            }
            {
                isDisable &&
                <div className='mt-4 contact-form'>
                    <div className='form-group mb-4'>
                        <label>Enter OTP for disable two factor authentication</label>
                        <input type="text" className='d-block w-100 check-form px-4' placeholder='Enter OTP' value={otp} onChange={(e) => e.target.value.length <= 6 && setOtp(e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1"))} />
                    </div>
                    <button onClick={() => verifyTwoFa()} disabled={spinner} className="site-btn fw-bold d-inline-block sb-gradients">
                        {spinner && <div className="btn-loader mr-2"></div>}<span>Submit</span>
                    </button>
                </div>
            }
        </div>
    )
}

export default Twofa