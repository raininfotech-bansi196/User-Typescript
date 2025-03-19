"use client"
import { chk_confirm_password, chk_email, chk_password, chk_username, validate_string } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [refferalCode, setReferalCode] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            try {
                validate_string(name, "Name");
                chk_username(name);
                validate_string(email, "Email");
                chk_email(email);
                validate_string(password, "Password");
                chk_password(password);
                validate_string(confirmPassword, "Confirm Password");
                chk_confirm_password(password, confirmPassword, "Password and Confirm Password does not match");
            } catch (error: string | any) {
                toast.error(error);
                return false
            }
            const body = JSON.stringify({ name, email, password, confirmPassword, uplineCode: refferalCode });
            const response = await fetchApi(`/register`, body, "POST");
            if (response.statusCode == 200) {
                toast.success(response.data.message);
                router.push('/login')
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [eyeOpen, setEyeOpen] = useState(false)
    const [ceyeOpen, setCeyeOpen] = useState(false)
    return (
        <section className="contact-page spad">
            <div className="container">
                <div className="col-lg-8 mx-auto">
                    <h3>Hello! let's get started !!</h3>
                    <p>Signing up is easy. It only takes a few steps.</p>
                    <form className="contact-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="check-form"
                                        type="text"
                                        placeholder="First Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="check-form"
                                        type="text"
                                        placeholder="Email Adress"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input
                                        className="check-form"
                                        type="text"
                                        placeholder="Refferal Code"
                                        value={refferalCode}
                                        onChange={(e) => setReferalCode(e.target.value)}
                                    />
                                </div>
                            </div>
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
                            <div className="col-md-12">
                                <button className="site-btn w-100 d-block sb-gradients mt-4">
                                    Submit
                                </button>
                            </div>
                            <div className='mt-4 col-12'>
                                <p className='text-center d-block'>Already have an account? <Link href="/login">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default page