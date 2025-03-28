"use client"
import GenerateWallet from "@/componanats/wallet/GenerateWallet";
import { useAuthContext } from "@/context/auth";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { open } = useWeb3Modal()
  const { setIsConnectWallet, setPageLoader } = useAuthContext();
  const { address } = useWeb3ModalAccount();
  const [isCreate, setIsCreate] = useState(false)
  useEffect(() => {
    if (!window.ethereum) {
      setIsCreate(true)
    }
  }, [])
  useEffect(() => {
    setPageLoader(false)
  }, [])
  const[isCreateWallet,setIsCreateWallet] = useState(false);
  const handleClose = () => {
    setIsCreateWallet(false)
  }
  return (
    <>
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 hero-text">
              <h2>
                Invest in <span>Bitcoin</span> <br />
                Bitcoin Trading
              </h2>
              <h4>Use modern progressive technologies of Bitcoin to earn money</h4>
              <Link href={address ? "/" : "/connect-wallet"} className="site-btn mt-4 sb-gradients" onClick={() => address ? open({ view: 'Account' }) : setIsConnectWallet(true)}>
                {address ? 'Disconnect Wallet' : 'Connect Wallet'}
              </Link>
              {
                isCreate && <button className="site-btn mt-4 sb-gradients">Create wallet</button>
              }
            </div>
            <div className="col-md-6">
              <img src="img/laptop.png" className="laptop-image" alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* Hero section end */}
      {/* About section */}
      <section className="about-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6 about-text">
              <h2>Create Your Secure Crypto Wallet</h2>
              <p>
                Unlock the power of decentralized finance with your own web3 wallet.
              </p>
              <p>
                Generate your own Web3-enabled crypto wallet in seconds. Securely store, send, and receive cryptocurrencies across multiple blockchains. Experience true financial freedom with a non-custodial wallet that puts you in control. Start your journey in the decentralized world today!
              </p>
              <button onClick={() => setIsCreateWallet(true)} className="site-btn sb-gradients sbg-line mt-5">
                Create wallet
              </button>
            </div>
          </div>
          <div className="about-img">
            <img src="img/about-img.png" alt="" />
          </div>
        </div>
      </section>
      {/* About section end */}
      {/* Features section */}
      <section className="features-section spad gradient-bg">
        <div className="container text-white">
          <div className="section-title text-center">
            <h2>Our Features</h2>
            <p>Bitcoin is the simplest way to exchange money at very low cost.</p>
          </div>
          <div className="row">
            {/* feature */}
            <div className="col-md-6 col-lg-4 feature">
              <i className="ti-mobile" />
              <div className="feature-content">
                <h4>Mobile Apps</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
                <a href="" className="readmore">
                  Readmore
                </a>
              </div>
            </div>
            {/* feature */}
            <div className="col-md-6 col-lg-4 feature">
              <i className="ti-shield" />
              <div className="feature-content">
                <h4>Safe &amp; Secure</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
                <a href="" className="readmore">
                  Readmore
                </a>
              </div>
            </div>
            {/* feature */}
            <div className="col-md-6 col-lg-4 feature">
              <i className="ti-wallet" />
              <div className="feature-content">
                <h4>Wallet</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
                <a href="" className="readmore">
                  Readmore
                </a>
              </div>
            </div>
            {/* feature */}
            <div className="col-md-6 col-lg-4 feature">
              <i className="ti-headphone-alt" />
              <div className="feature-content">
                <h4>Experts Support</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
                <a href="" className="readmore">
                  Readmore
                </a>
              </div>
            </div>
            {/* feature */}
            <div className="col-md-6 col-lg-4 feature">
              <i className="ti-reload" />
              <div className="feature-content">
                <h4>Instant Exchange</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
                <a href="" className="readmore">
                  Readmore
                </a>
              </div>
            </div>
            {/* feature */}
            <div className="col-md-6 col-lg-4 feature">
              <i className="ti-panel" />
              <div className="feature-content">
                <h4>Recuring Buys</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
                <a href="" className="readmore">
                  Readmore
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features section end */}
      {/* Process section */}
      <section className="process-section spad">
        <div className="container">
          <div className="section-title text-center">
            <h2>Get Started With Bitcoin</h2>
            <p>
              Start learning about Bitcoin with interactive tutorials. It’s fun,
              easy, and takes only a few minutes!{" "}
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 process">
              <div className="process-step">
                <figure className="process-icon">
                  <img src="img/process-icons/1.png" alt="#" />
                </figure>
                <h4>Create Your Wallet</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 process">
              <div className="process-step">
                <figure className="process-icon">
                  <img src="img/process-icons/2.png" alt="#" />
                </figure>
                <h4>Create Your Wallet</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4 process">
              <div className="process-step">
                <figure className="process-icon">
                  <img src="img/process-icons/3.png" alt="#" />
                </figure>
                <h4>Create Your Wallet</h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                  officia deserunt mollit anim id est laborum.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process section end */}
      {/* Fact section */}
      <section className="fact-section gradient-bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="fact">
                <h2>60</h2>
                <p>
                  Support <br /> Countries
                </p>
                <i className="ti-basketball" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="fact">
                <h2>12K</h2>
                <p>
                  Transactions <br /> per hour
                </p>
                <i className="ti-panel" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="fact">
                <h2>5B</h2>
                <p>
                  Largest <br /> Transactions
                </p>
                <i className="ti-stats-up" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="fact">
                <h2>240</h2>
                <p>
                  Years <br /> of Experience
                </p>
                <i className="ti-user" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Fact section end */}

      {/* Team section */}
      {/* Review section */}
      <section className="review-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 push-8">
              <img src="img/quote.png" alt="" className="quote mb-5" />
              <div className="review-text-slider owl-carousel">
                <div className="review-text">
                  <p>
                    "Bitcoin is exciting because it shows how cheap it can be.
                    Bitcoin is better than currency in that you don’t have to be
                    physically in the same place and, of course, for large
                    transactions, currency can get pretty inconvenient.”
                  </p>
                </div>
                <div className="review-text">
                  <p>
                    "Bitcoin is exciting because it shows how cheap it can be.
                    Bitcoin is better than currency in that you don’t have to be
                    physically in the same place and, of course, for large
                    transactions, currency can get pretty inconvenient.”
                  </p>
                </div>
                <div className="review-text">
                  <p>
                    "Bitcoin is exciting because it shows how cheap it can be.
                    Bitcoin is better than currency in that you don’t have to be
                    physically in the same place and, of course, for large
                    transactions, currency can get pretty inconvenient.”
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 pr-0 pull-3">
              <div className="review-meta-slider owl-carousel pt-5">
                <div className="author-meta">
                  <div
                    className="author-avatar set-bg"
                    data-setbg="img/review/1.jpg"
                  />
                  <div className="author-name">
                    <h4>Aaron Ballance</h4>
                    <p>Ceo Bitcoin</p>
                  </div>
                </div>
                <div className="author-meta">
                  <div
                    className="author-avatar set-bg"
                    data-setbg="img/review/2.jpg"
                  />
                  <div className="author-name">
                    <h4>Jackson Nash</h4>
                    <p>Head of Design</p>
                  </div>
                </div>
                <div className="author-meta">
                  <div
                    className="author-avatar set-bg"
                    data-setbg="img/review/3.jpg"
                  />
                  <div className="author-name">
                    <h4>Katy Abrams</h4>
                    <p>Product Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Review section end */}
      {/* Newsletter section */}
      <section className="newsletter-section gradient-bg">
        <div className="container text-white">
          <div className="row">
            <div className="col-lg-7 newsletter-text">
              <h2>Subscribe to our Newsletter</h2>
              <p>
                Sign up for our weekly industry updates, insider perspectives and
                in-depth market analysis.
              </p>
            </div>
            <div className="col-lg-5 col-md-8 offset-lg-0 offset-md-2">
              <form className="newsletter-form">
                <input type="text" placeholder="Enter your email" />
                <button>Get Started</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter section end */}
      {/* Blog section */}
      <section className="blog-section spad">
        <div className="container">
          <div className="section-title text-center">
            <h2>Latest News</h2>
            <p>Bitcoin is the simplest way to exchange money at very low cost.</p>
          </div>
          <div className="row">
            {/* blog item */}
            <div className="col-md-4">
              <div className="blog-item">
                <figure className="blog-thumb">
                  <img src="img/blog/1.jpg" alt="" />
                </figure>
                <div className="blog-text">
                  <div className="post-date">03 jan 2018</div>
                  <h4 className="blog-title">
                    <a href="">
                      Coinbase to Reopen the GDAX Bitcoin Cash-Euro Order Book
                    </a>
                  </h4>
                  <div className="post-meta">
                    <a href="">
                      <span>by</span> Admin
                    </a>
                    <a href="">
                      <i className="fa fa-heart-o" /> 234 Likes
                    </a>
                    <a href="">
                      <i className="fa fa-comments-o" /> 08 comments
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* blog item */}
            <div className="col-md-4">
              <div className="blog-item">
                <figure className="blog-thumb">
                  <img src="img/blog/2.jpg" alt="" />
                </figure>
                <div className="blog-text">
                  <div className="post-date">28 dec 2018</div>
                  <h4 className="blog-title">
                    <a href="">
                      Blockchain Rolls Out Trading Feature for 22 States in the U.S
                    </a>
                  </h4>
                  <div className="post-meta">
                    <a href="">
                      <span>by</span> Admin
                    </a>
                    <a href="">
                      <i className="fa fa-heart-o" /> 234 Likes
                    </a>
                    <a href="">
                      <i className="fa fa-comments-o" /> 08 comments
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* blog item */}
            <div className="col-md-4">
              <div className="blog-item">
                <figure className="blog-thumb">
                  <img src="img/blog/3.jpg" alt="" />
                </figure>
                <div className="blog-text">
                  <div className="post-date">28 aug 2018</div>
                  <h4 className="blog-title">
                    <a href="">This Week in Bitcoin: Up, Down and Sideways</a>
                  </h4>
                  <div className="post-meta">
                    <a href="">
                      <span>by</span> Admin
                    </a>
                    <a href="">
                      <i className="fa fa-heart-o" /> 234 Likes
                    </a>
                    <a href="">
                      <i className="fa fa-comments-o" /> 08 comments
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog section end */}
      <GenerateWallet isCreateWallet={isCreateWallet} handleClose={handleClose}/>
    </>
  );
}
