import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

const ResendOtp = ({ handleResendOtp }: { handleResendOtp: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const defaultTime = getCookie('otpResendTime');
        if (defaultTime) {
            setTimeLeft(parseInt(defaultTime.toString()));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) {
                    const newTime = prevTime - 1;
                    setCookie("otpResendTime", newTime);
                    return newTime;
                } else {
                    clearInterval(interval);
                    deleteCookie("otpResendTime");
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <>
            {timeLeft > 0 ? (
                <p className=" fw-medium mb-0">
                    Resend OTP after :
                    <span className="ml-1 text-primary">{formatTime(timeLeft)}</span>
                </p>
            ) : (
                <p className="mb-0 fw-medium">
                    Didn't get OTP? 
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleResendOtp();
                        }}
                        type="button"
                        className="resend-otp ml-1"
                    >
                        Resend OTP
                    </button>
                </p>
            )}
        </>
    )
}

export default ResendOtp