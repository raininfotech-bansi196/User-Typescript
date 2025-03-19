import React, { useEffect, useState } from "react";

const PasswordValidator = ({ password }: { password: string }) => {
    const [charNumberValid, setCharNumberValid] = useState(false);
    const [specialCharValid, setSpecialCharValid] = useState(false);
    const [uppercaseValid, setUppercaseValid] = useState(false);
    const [numberValid, setNumberValid] = useState(false);
    const [lowercaseValid, setLowercaseValid] = useState(false);
    const checkPasswordLength = (password: string) => {
        setCharNumberValid(password.length >= 8 && password.length <= 20)
    };

    // Check for special characters
    const checkSpecialCharacters = (password: string) => {
        const pattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        setSpecialCharValid(pattern.test(password));
    };

    // Check for an uppercase character
    const checkUppercase = (password: string) => {
        const pattern = /[A-Z]/;
        setUppercaseValid(pattern.test(password));
    };

    const checkLowercase = (password: string) => {
        const pattern = /[a-z]/;
        setLowercaseValid(pattern.test(password));
    };

    // Check for a number
    const checkNumber = (password: string) => {
        const pattern = /[0-9]/;
        setNumberValid(pattern.test(password));
    };

    useEffect(() => {
        checkPasswordLength(password);
        checkSpecialCharacters(password);
        checkUppercase(password);
        checkNumber(password);
        checkLowercase(password)
    }, [password]);

    return (
        password?.length > 0 &&
        <div className="row mt-2">
            <p className={`col-6 fs-small px-2 pl-4 flex align-items-center m-0 ${charNumberValid ? "text-success" : "text-danger"}`}>
                <i className={`fa-solid mr-1 ${charNumberValid ? "fa-circle-check" : "fa-circle-xmark"} mb-1 me-1 ms-2 `} />
                8-20 characters
            </p>
            <p className={`col-6 fs-small px-2 pl-4 flex align-items-center m-0 ${specialCharValid ? "text-success" : "text-danger"}`}>
                <i className={`fa-solid mr-1 ${specialCharValid ? "fa-circle-check" : "fa-circle-xmark"} mb-1 me-1 ms-2 `} />
                1 special character
            </p>
            <p className={`col-6 fs-small px-2 pl-4 flex align-items-center m-0 ${uppercaseValid ? "text-success" : "text-danger"}`}>
                <i className={`fa-solid mr-1 ${uppercaseValid ? "fa-circle-check" : "fa-circle-xmark"} mb-1 me-1 ms-2 `} />
                1 uppercase letter
            </p>
            <p className={`col-6 fs-small px-2 pl-4 flex align-items-center m-0 ${lowercaseValid ? "text-success" : "text-danger"}`}>
                <i className={`fa-solid mr-1 ${lowercaseValid ? "fa-circle-check" : "fa-circle-xmark"} mb-1 me-1 ms-2 `} />
                1 lowecase letter
            </p>
            <p className={`col-6 fs-small px-2 pl-4 flex align-items-center m-0 ${numberValid ? "text-success" : "text-danger"}`}>
                <i className={`fa-solid mr-1 ${numberValid ? "fa-circle-check" : "fa-circle-xmark"} mb-1 me-1 ms-2 `} />
                1 number
            </p>
        </div>
    );
};

export default PasswordValidator;
