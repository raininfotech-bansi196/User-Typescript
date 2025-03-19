"use client"
import { useAuthContext } from '@/context/auth'
import React from 'react'

const PageLoader = () => {
    const { pageLoader } = useAuthContext();
    return (
        pageLoader && <div className='page-loader'>
            <div className='pageloader'></div>
        </div>
    )
}

export default PageLoader