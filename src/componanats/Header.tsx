"use client"
import { useAuthContext } from '@/context/auth'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

const Header = () => {
  const { authTkn, setAuthTkn } = useAuthContext();
  const router = useRouter();
  const handleLogOut = (e: FormEvent) => {
    e.preventDefault();
    deleteCookie("acsmailtkn");
    setAuthTkn('');
    router.push('/login')
  }
  return (
    <header className="header-section clearfix">
      <div className="container-fluid">
        <a href="index.html" className="site-logo">
          <img src="img/logo.png" alt="" />
        </a>
        <div className="responsive-bar">
          <i className="fa fa-bars" />
        </div>
        <a href="" className="user">
          <i className="fa fa-user" />
        </a>
        {
          authTkn ?
            <button onClick={(e) => handleLogOut(e)} className="site-btn bg-transparent">
              Log out
            </button> :
            <Link href="/login" className="site-btn">
              Sign Up Free
            </Link>
        }
        <nav className="main-menu">
          <ul className="menu-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

  )
}

export default Header