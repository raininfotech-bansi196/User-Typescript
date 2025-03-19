"use client"
import { chk_email, validate_string } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            try {
                validate_string(email, "Email");
                chk_email(email);
            } catch (error: any) {
                toast.error(error);
                return false
            }
            const body = JSON.stringify({ email });
            const res = await fetchApi(`/forgot-password`, body, "POST");
            if (res.statusCode == 200) {
                setCookie("acsmailtkn", res?.data?.token);
                setCookie("otpResendTime",300)
                router.push("/reset-password")
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log({ error });
        }
    }
    return (
        <section className="contact-page spad">
            <div className="container">
                <div className="col-lg-10 mx-auto">
                    <h3>Forgot Password?</h3>
                    <p>Don't worry, Enter email to reset your password.</p>
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
                            <div className="col-md-12">
                                <button className="site-btn w-100 fw-bold d-block sb-gradients">
                                    Submit
                                </button>
                            </div>
                            <div className='mt-4 col-12'>
                                <p className='text-center d-block'>Back to login? <Link href="/login">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default page