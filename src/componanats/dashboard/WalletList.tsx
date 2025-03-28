import { useAuthContext } from '@/context/auth';
import { convert_date, copyAddress, shortenAddress } from '@/utils/common';
import { fetchApi } from '@/utils/frontend';
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import TableLoader from '../TableLoader';
import ReactPaginate from 'react-paginate';
import Select from "react-select";
import { SelectconfigsfilterForList } from '@/utils/SelectConfig';
import Link from 'next/link';

interface WalletListType {
    num: number;
    chainName: string;
    coinName: string;
    address: string;
    balance: number;
    createdOn: number
}
interface ChainListType {
    label: string;
    value: string;
}
interface CoinListType {
    label: string;
    value: string;
}
const WalletList = () => {
    const { setAuthTkn, setPageLoader } = useAuthContext();
    const [walletList, setWalletList] = useState<WalletListType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [order, setOrder] = useState<number>(0);
    const [spinner, setSpinner] = useState<boolean>(true)
    const [orderClm, setOrderClm] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const [searchLdr, setSearchLdr] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [chainList, setChainList] = useState<ChainListType[]>([]);
    const [coinList, setCoinList] = useState<CoinListType[]>([]);
    const [chain, setChain] = useState<string>('')
    const [coin, setCoin] = useState<string>('')
    const getWalletList = async () => {
        try {
            const response = await fetchApi(`/user-wallet-list`, JSON.stringify({ page: page, search: search, orderColumn: orderClm, order: order, chain, coin, address }), "POST");
            if (response?.statusCode === 200) {
                setWalletList(response?.data?.data);
                setTotalPage(response?.data?.totalPages)
            } else {
                toast.error(response?.data?.message)
                if (response?.data?.message === "Unauthorized") {
                    setAuthTkn(response?.data?.message)
                }
            }
            setPageLoader(false)
            setSpinner(false)
            setSearchLdr(false)
        } catch (error) {
            console.log({ error });
        }
    }
    const getWalletListFilter = async () => {
        const response = await fetchApi(`/filter/wallet-list-filter`, "", "GET");
        if (response?.statusCode === 200) {
            setChainList([{ label: "All", value: "" }, ...response?.data?.chains]);
            setCoinList([{ label: "All", value: "" }, ...response?.data?.coins]);
        } else {
            toast.error(response?.data?.message)
            if (response?.data?.message === "Unauthorized") {
                setAuthTkn(response?.data?.message)
            }
        }
    }
    useEffect(() => {
        getWalletListFilter();
    }, [])

    useEffect(() => {
        getWalletList();
    }, [order, orderClm, page])

    const sortData = (column: number, sort: number) => {
        setOrder(sort)
        setOrderClm(column)
    }
    const pagginationHandler = (page: any) => {
        var p = page.selected
        setPage(p + 1)
    }
    const searchList = (e: FormEvent) => {
        e.preventDefault();
        setSearchLdr(true)
        if (!searchLdr) {
            setPage(1)
            setSearchLdr(true)
            getWalletList();
        }
    }
    return (
        <>
            <div className='cust-card contact-form list-filter p-4 bg-white mb-4'>
                <form className='row' onSubmit={(e) => searchList(e)}>
                    <div className='col-12 col-sm-6 mb-3 mb-lg-0 col-lg-3 px-sm-2'>
                        <div className="form-group mb-0">
                            <label className='form-label'>Chain Name</label>
                            <Select
                                instanceId="react-select-country"
                                className="react-select"
                                options={chainList}
                                value={chainList?.find((option: any) => option?.value === chain)}
                                onChange={(selectedOption: any) => setChain(selectedOption?.value)}
                                styles={SelectconfigsfilterForList}
                                isSearchable={true}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 mb-3 mb-lg-0 col-lg-3 px-sm-2'>
                        <div className="form-group mb-0">
                            <label className='form-label'>Coin Name</label>
                            <Select
                                instanceId="react-select-country"
                                className="react-select"
                                options={coinList}
                                value={coinList?.find((option: any) => option?.value === coin)}
                                onChange={(selectedOption: any) => setCoin(selectedOption?.value)}
                                styles={SelectconfigsfilterForList}
                                isSearchable={true}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 mb-3 mb-sm-0 col-lg-3 px-sm-2'>
                        <div className="form-group mb-0">
                            <label className='form-label'>Address</label>
                            <input
                                className="check-form"
                                type="text"
                                placeholder="Search Address"
                                name='userName'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-lg-3 px-sm-2 d-flex align-items-end'>
                        <button className='site-btn site-btn-sm sb-gradients' disabled={searchLdr} type='submit'> {searchLdr && <div className="btn-loader mr-2"></div>}Search</button>
                    </div>
                </form>
            </div>
            <div className="table-responsive">
                <table className="table m-0 table-bordered table-hover">
                    <thead>
                        <tr className='border-none'>
                            <th className='sort' onClick={() => sortData(0, order === 0 ? 1 : 0)}>
                                #
                                <span className='position-relative d-inline-flex g-1 flex-column'>
                                    <i className={`fa-solid fa-sort-up ${orderClm === 0 && order === 0 ? 'sort-enable' : 'sort-disable'}`}></i>
                                    <i className={`fa-solid fa-sort-down position-absolute ${orderClm === 0 && order === 1 ? 'sort-enable' : 'sort-disable'}`}></i>
                                </span>
                            </th>
                            <th className='sort' onClick={() => sortData(1, order === 0 ? 1 : 0)}>
                                Chain Name
                                <span className='position-relative d-inline-flex g-1 flex-column'>
                                    <i className={`fa-solid fa-sort-up ${orderClm === 1 && order === 0 ? 'sort-enable' : 'sort-disable'}`}></i>
                                    <i className={`fa-solid fa-sort-down position-absolute ${orderClm === 1 && order === 1 ? 'sort-enable' : 'sort-disable'}`}></i>
                                </span>
                            </th>
                            <th className='sort' onClick={() => sortData(2, order === 0 ? 1 : 0)}>
                                Coin Name
                                <span className='position-relative d-inline-flex g-1 flex-column'>
                                    <i className={`fa-solid fa-sort-up ${orderClm === 2 && order === 0 ? 'sort-enable' : 'sort-disable'}`}></i>
                                    <i className={`fa-solid fa-sort-down position-absolute ${orderClm === 2 && order === 1 ? 'sort-enable' : 'sort-disable'}`}></i>
                                </span>
                            </th>
                            <th className='sort' onClick={() => sortData(3, order === 0 ? 1 : 0)}>
                                Balance
                                <span className='position-relative d-inline-flex g-1 flex-column'>
                                    <i className={`fa-solid fa-sort-up ${orderClm === 3 && order === 0 ? 'sort-enable' : 'sort-disable'}`}></i>
                                    <i className={`fa-solid fa-sort-down position-absolute ${orderClm === 3 && order === 1 ? 'sort-enable' : 'sort-disable'}`}></i>
                                </span>
                            </th>
                            <th className='sort' onClick={() => sortData(4, order === 0 ? 1 : 0)}>
                                Address
                                <span className='position-relative d-inline-flex g-1 flex-column'>
                                    <i className={`fa-solid fa-sort-up ${orderClm === 4 && order === 0 ? 'sort-enable' : 'sort-disable'}`}></i>
                                    <i className={`fa-solid fa-sort-down position-absolute ${orderClm === 4 && order === 1 ? 'sort-enable' : 'sort-disable'}`}></i>
                                </span>
                            </th>
                            <th className='sort' onClick={() => sortData(5, order === 0 ? 1 : 0)}>
                                Created On
                                <span className='position-relative d-inline-flex g-1 flex-column'>
                                    <i className={`fa-solid fa-sort-up ${orderClm === 5 && order === 0 ? 'sort-enable' : 'sort-disable'}`}></i>
                                    <i className={`fa-solid fa-sort-down position-absolute ${orderClm === 5 && order === 1 ? 'sort-enable' : 'sort-disable'}`}></i>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !spinner && walletList?.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{x?.num}</td>
                                        <td>{x?.chainName}</td>
                                        <td>{x?.coinName}</td>
                                        <td>{x?.balance}</td>
                                        <td className='d-flex align-items-center justify-content-between'>
                                            {
                                                x?.chainName?.includes("Tron") || x?.chainName?.includes("tron") ?
                                                    <Link target='_blank' className='address-link' href={`https://tronscan.org/#/address/${x?.address}`}>{shortenAddress(x?.address)}</Link> :
                                                    <Link target='_blank' className='address-link' href={`https://testnet.bscscan.com/address/${x?.address}`}>{shortenAddress(x?.address)}</Link>
                                            }
                                            <span className='address-copy' onClick={() => copyAddress(x?.address)}><i className='fa fa-copy'></i></span>
                                        </td>
                                        <td>{convert_date(x?.createdOn)}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            spinner || walletList?.length === 0 ?
                                <tr className='table-loader'>
                                    <td colSpan={9}>
                                        <div className='text-center'>
                                            {spinner ? <TableLoader /> : walletList?.length === 0 &&
                                                <img src="/img/nodata.png" alt="no data" className='nodata my-3' />
                                            }
                                        </div>
                                    </td>
                                </tr> : <></>
                        }
                    </tbody>
                </table>
            </div>
            {
                walletList.length > 0 ? <div className="row w-100 paginationBox justify-content-end">
                    <ReactPaginate
                        className=''
                        breakLabel={'...'}
                        nextLabel={<i className="fa fa-angle-right"></i>}
                        previousLabel={<i className="fa fa-angle-left"></i>}
                        pageRangeDisplayed={5}
                        renderOnZeroPageCount={null}
                        activeClassName={'active'}
                        containerClassName={'pagination pagination-sm pagination-gutter justify-content-end '}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item page-indicator'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item page-indicator'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        forcePage={page - 1}
                        pageCount={totalPage}
                        onPageChange={(page: any) => pagginationHandler(page)}
                    />
                </div> : ''
            }
        </>
    )
}

export default WalletList