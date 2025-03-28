"use client"
import WalletList from '@/componanats/dashboard/WalletList'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [tab, setTab] = useState<number>(1)
  return (
    <>
      <section className="page-info-section">
        <div className="container">
          <h2 className='fw-bold fw-bolder'>Wallets</h2>
          <div className="site-beradcamb">
            <Link href="/">Home</Link>
            <span>
              <i className="fa fa-angle-right" /> Wallets
            </span>
          </div>
        </div>
      </section>
      <section className='container py-5'>
        <div className='profile-details'>
          <div className='profile-tab'>
            <div onClick={() => setTab(1)} className={`tab-item ${tab === 1 && 'active'}`}>
              <span className='fw-bold'>User Wallets</span>
            </div>
            <div onClick={() => setTab(2)} className={`tab-item ${tab === 2 && 'active'}`}>
              <span className='fw-bold'>Change Password</span>
            </div>
            <div onClick={() => setTab(3)} className={`tab-item ${tab === 3 && 'active'}`}>
              <span className='fw-bold'>Two Factor Authentication</span>
            </div>
          </div>
          <div className='p-4'>
            {tab === 1 && <WalletList />}
          </div>
        </div>
      </section>
    </>
  )
}

export default page