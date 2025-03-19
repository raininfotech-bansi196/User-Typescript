"use client"
import ResendOtp from '@/componanats/ResendOtp';
import { chk_OTP, validate_string } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const [spinner, setSpinner] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            try {
                validate_string(otp, "OTP");
                chk_OTP(otp);
            } catch (error: string | any) {
                toast.error(error);
                return false
            }
            setSpinner(true)
            const token = await getCookie("acsmailtkn");
            const res = await fetchApi(`/verify-account`, JSON.stringify({ token, otp }), "POST");
            if (res.statusCode == 200) {
                deleteCookie("acsmailtkn");
                toast.success(res.data.message);
                router.push("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        setSpinner(false)
    }
    const handleResendOtp = async () => {
        try {
            const token = getCookie("acsmailtkn");
            const res = await fetchApi(`/resend-otp`, JSON.stringify({ token }), "POST");
            if (res.statusCode == 200) {
                toast.success(res.data.message);
                setCookie("otpResendTime", 300)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="contact-page spad">
            <div className="container">
                <div className="col-lg-8 mx-auto">
                    <h3>Verify Your Email</h3>
                    <p>Enter the OTP sent to your email to verify your account.</p>
                    <form className="contact-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="check-form"
                                        type={"text"}
                                        placeholder="6 Digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='px-4 col-12'>
                                <ResendOtp handleResendOtp={handleResendOtp} />
                            </div>
                            <div className="col-md-12 mt-4">
                                <button disabled={spinner} className="site-btn w-100 fw-bold d-block sb-gradients">
                                    {spinner && <div className="btn-loader mr-2"></div>}<span>Submit</span>
                                </button>
                            </div>
                            <div className='mt-4 col-12'>
                                <p className='text-center d-block'>Don't have an account? <Link href="/register">Create Account</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default page