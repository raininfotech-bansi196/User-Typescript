"use client"
import { chk_email, chk_password, validate_string } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [spinner, setSpinner] = useState(false);
    const [isTwofa, setIsTwofa] = useState(false)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            try {
                validate_string(email, "Email");
                chk_email(email);
                validate_string(password, "Password");
                chk_password(password);
            } catch (error: any) {
                toast.error(error);
                return false
            }
            setSpinner(true)
            const body = JSON.stringify({ email, password });
            const res = await fetchApi(`/login`, body, "POST");
            if (res.statusCode == 200) {
                if (res?.data?.isVerified === 0) {
                    setCookie("acsmailtkn", res?.data?.token);
                    router.push("/email-verification")
                } else if (res?.data?.isVerified === 0) {
                    setIsTwofa(true)
                } else {
                    setCookie("acsmailtkn", res?.data?.accessToken);
                    router.push("/")
                    toast.success(res.data.message);
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log({ error });
        }
        setSpinner(false)
    }
    const [eyeOpen, setEyeOpen] = useState(false)
    return (
        <section className="contact-page spad">
            <div className="container">
                <div className="col-lg-8 mx-auto">
                    <h3>Welcome Back !!</h3>
                    <p>Log in to you acount.</p>
                    <form className="contact-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="check-form"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
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
                            <div className="mb-3 col-12 px-4 d-flex justify-content-between align-items-center">
                                <label className="ct-label d-inline-flex align-items-center flex-grow-1">
                                    <input type="checkbox" name="radio" className='w-auto' />
                                    <span className="checkmark"></span>
                                    <span className='ml-2 d-inline-block user-select-none pointer-cursor'>Keep me signed in</span>
                                </label>
                                <Link href="/forgot-password" className="auth-link text-black">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="col-md-12">
                                <button disabled={spinner} className="site-btn w-100 fw-bold d-block sb-gradients">
                                    {spinner && <div className="btn-loader mr-2"></div>}<span>Submit</span>
                                </button>
                            </div>
                            <div className='mt-4 col-12'>
                                <p className='text-center d-block'>Don't have an account? <Link href="/register">Create account</Link></p>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </section>
    )
}

export default page