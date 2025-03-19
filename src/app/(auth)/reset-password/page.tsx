"use client"
import ResendOtp from '@/componanats/ResendOtp';
import { chk_confirm_password, chk_OTP, chk_password, validate_string } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [eyeOpen, setEyeOpen] = useState(false)
    const [ceyeOpen, setCeyeOpen] = useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            validate_string(password, "Password");
            chk_password(password);
            validate_string(confirmPassword, "Confirm Password");
            chk_confirm_password(password, confirmPassword, "Password and confirm password must be same");
            validate_string(otp, "OTP");
            chk_OTP(otp);
        } catch (error) {   
            console.log(error)
        }
        const token = await getCookie("acsmailtkn");
        const res = await fetchApi(`/reset-password`, JSON.stringify({ token, password, confirmPassword, otp }), "POST");
        if (res.statusCode == 200) {
            deleteCookie("acsmailtkn");
            toast.success(res.data.message);
            router.push("/login");
        } else {
            toast.error(res.data.message);
        }
    }
    const handleResendOtp = async () => {
        try {
            const token = getCookie("acsmailtkn");
            const res = await fetchApi(`/resend-otp`, JSON.stringify({ token }), "POST");
            if (res.statusCode == 200) {
                toast.success(res.data.message);
                setCookie("otpResendTime",300)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="contact-page spad">
            <div className="container">
                <div className="col-lg-8 mx-auto">
                    <h3>Create New Password</h3>
                    <p>Set a strong password to secure your account.</p>
                    <form className="contact-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group position-relative d-flex align-items-center justify-content-between">
                                    <input
                                        className="check-form"
                                        type={eyeOpen ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <i onClick={() => setEyeOpen(!eyeOpen)} className={`fa fa-solid cursor-pointer text-muted fa-eye${eyeOpen ? "" : "-slash"} eye-btn`}></i>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="check-form"
                                        type={ceyeOpen ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <i onClick={() => setCeyeOpen(!ceyeOpen)} className={`fa fa-solid cursor-pointer text-muted fa-eye${ceyeOpen ? "" : "-slash"} eye-btn`}></i>
                                </div>
                            </div>
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
                            <div className="col-md-12">
                                <button className="site-btn w-100 d-block sb-gradients mt-3">
                                    Submit
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