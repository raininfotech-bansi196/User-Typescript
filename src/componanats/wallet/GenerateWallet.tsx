import { useAuthContext } from '@/context/auth';
import { validate_string } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import { Selectconfigsfilter } from '@/utils/SelectConfig';
import React, { FormEvent, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Select from "react-select";
import { json } from 'stream/consumers';

interface PropsTypes {
    isCreateWallet: boolean;
    handleClose: () => void
}
const GenerateWallet: React.FC<PropsTypes> = ({ isCreateWallet, handleClose }) => {
    const { setAuthTkn } = useAuthContext()
    const [chainList, setChainList] = useState<any>([]);
    const [coinList, setCoinList] = useState<any>([]);
    const [chain, setChain] = useState<string>("")
    const [coin, setCoin] = useState<string>("")
    const handleGetChainList = async () => {
        try {
            const response = await fetchApi(`/filter/chain-list`, "", "GET");
            if (response?.statusCode === 200) {
                setChainList(response?.data?.data);
            } else {
                if (response?.data?.message === "Unauthorized") {
                    setAuthTkn(response?.data?.message)
                }
                toast.error(response?.data?.message)
            }
        } catch (error) {
            console.log({ error });
        }
    }
    const handleGetCoinList = async () => {
        try {
            const response = await fetchApi(`/filter/coin-list`, JSON.stringify({ chain }), "POST");
            if (response?.statusCode === 200) {
                setCoinList(response?.data?.data);
            } else {
                if (response?.data?.message === "Unauthorized") {
                    setAuthTkn(response?.data?.message)
                }
                toast.error(response?.data?.message)
            }
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(() => {
        if (isCreateWallet) {
            handleGetChainList();
        }
    }, [isCreateWallet])
    useEffect(() => {
        if (chain) {
            handleGetCoinList();
        }
    }, [chain])
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            validate_string(chain, "Chain", 1)
            validate_string(coin, "Coin", 1)
        } catch (error: string | any) {
            toast.error(error);
            return false
        }
        const response = await fetchApi(`/generate-user-wallet`, JSON.stringify({ chainId: chain, coinId: coin }), "POST");
        if (response.statusCode === 200) {
            toast.success(response?.data?.message)
            handleClose();
            setChain("");
            setCoin("");
        } else {
            toast.error(response?.data?.message)
            if (response?.data?.message === "Unauthorized") {
                setAuthTkn(response?.data?.message)
            }
        }
    }
    console.log({ chain });
    console.log({ coin });

    return (
        <Modal
            show={isCreateWallet}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
        >
            <Modal.Header className='d-flex align-items-center justify-content-between'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Create Your Secure Crypto Wallet</h4>
                </Modal.Title>
                <button onClick={handleClose} className='btn-close'><i className='fa fa-close'></i></button>
            </Modal.Header>
            <Modal.Body>
                <div className='contact-form'>
                    <div className="form-group">
                        <label className='form-label'>Select Chain</label>
                        <Select
                            instanceId="react-select-country"
                            className="react-select"
                            options={chainList}
                            value={chainList?.find((option: any) => option?.value === chain)}
                            onChange={(selectedOption: any) => setChain(selectedOption?.value)}
                            styles={Selectconfigsfilter}
                            placeholder="Select a chain"
                            isSearchable={true}
                        />
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Select Coin</label>
                        <Select
                            instanceId="react-select-country"
                            className="react-select"
                            options={coinList}
                            value={coinList?.find((option: any) => option?.value === coin)}
                            onChange={(selectedOption: any) => setCoin(selectedOption?.value)}
                            styles={Selectconfigsfilter}
                            placeholder="Select a coin"
                            isSearchable={true}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='site-btn site-btn-sm sb-gradients' onClick={handleSubmit}>Create Wallet</button>
            </Modal.Footer>
        </Modal>
    )
}

export default GenerateWallet