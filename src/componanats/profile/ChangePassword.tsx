import { chk_confirm_password, chk_password, validate_string } from '@/utils/common'
import { fetchApi } from '@/utils/frontend'
import { getCookie } from 'cookies-next'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import PasswordValidator from '../PasswordValidator'

const ChangePassword = () => {
    const [initialData, setInitialData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [spinner, setSpinner] = useState(false)
    const [eyeOpen, setEyeOpen] = useState(false)
    const [ceyeOpen, setCeyeOpen] = useState(false)
    const [neyeOpen, setNeyeOpen] = useState(false)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            validate_string(initialData?.oldPassword, "Old Password");
            chk_password(initialData?.oldPassword);
            validate_string(initialData?.newPassword, "New Password");
            chk_password(initialData?.newPassword);
            validate_string(initialData?.confirmPassword, "Confirm Password");
            chk_confirm_password(initialData?.newPassword, initialData?.confirmPassword, "New Password and Confirm Password does not match");
        } catch (error: any) {
            toast.error(error);
            return false
        }
        setSpinner(true)
        const response = await fetchApi(`/change-password`, JSON.stringify({ ...initialData, token: getCookie("acsmailtkn") }), "POST");
        if (response.statusCode == 200) {
            toast.success(response.data.message);
            setInitialData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } else {
            toast.error(response.data.message);
        }
        setSpinner(false)
    }
    return (
        <form className='p-4 contact-form' onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
                <label className='form-label'>Old Password</label>
                <div className='position-relative'>
                    <input
                        className="check-form"
                        type={eyeOpen ? "text" : "password"}
                        placeholder="Enter old password"
                        name='fullName'
                        value={initialData?.oldPassword}
                        onChange={(e) => setInitialData({ ...initialData, oldPassword: e.target.value })}
                    />
                    <i onClick={() => setEyeOpen(!eyeOpen)} className={`fa fa-solid cursor-pointer text-muted fa-eye${eyeOpen ? "" : "-slash"} eye-btn`}></i>
                </div>
            </div>
            <div className="form-group">
                <label className='form-label'>New Password</label>
                <div className='position-relative'>
                    <input
                        className="check-form"
                        type={neyeOpen ? "text" : "password"}
                        placeholder="Enter new password"
                        name='fullName'
                        value={initialData?.newPassword}
                        onChange={(e) => setInitialData({ ...initialData, newPassword: e.target.value })}
                    />
                    <i onClick={() => setNeyeOpen(!neyeOpen)} className={`fa fa-solid cursor-pointer text-muted fa-eye${neyeOpen ? "" : "-slash"} eye-btn`}></i>
                </div>
                <PasswordValidator password={initialData?.newPassword}/>
            </div>
            <div className="form-group">
                <label className='form-label'>Confirm Password</label>
                <div className='position-relative'>
                    <input
                        className="check-form"
                        type={ceyeOpen ? "text" : "password"}
                        placeholder="Enter confirm password"
                        name='fullName'
                        value={initialData?.confirmPassword}
                        onChange={(e) => setInitialData({ ...initialData, confirmPassword: e.target.value })}
                    />
                    <i onClick={() => setCeyeOpen(!ceyeOpen)} className={`fa fa-solid cursor-pointer text-muted fa-eye${ceyeOpen ? "" : "-slash"} eye-btn`}></i>
                </div>
            </div>
            <button disabled={spinner} className="site-btn mt-2 fw-bold d-inline-block sb-gradients">
                {spinner && <div className="btn-loader mr-2"></div>}<span>Submit</span>
            </button>
        </form>
    )
}

export default ChangePassword