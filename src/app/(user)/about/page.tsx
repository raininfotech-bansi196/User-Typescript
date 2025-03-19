"use client"
import { useAuthContext } from '@/context/auth'
import React, { useEffect } from 'react'

const page = () => {
    const { setPageLoader } = useAuthContext();
    useEffect(() => {
        setPageLoader(false)
    }, [])
    return (
        <>
            {/* Page info section */}
            <section className="page-info-section">
                <div className="container">
                    <h2>About Us</h2>
                    <div className="site-beradcamb">
                        <a href="">Home</a>
                        <span>
                            <i className="fa fa-angle-right" /> About Us
                        </span>
                    </div>
                </div>
            </section>
            {/* Page info end */}
            {/* About section */}
            <section className="about-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-6 about-text">
                            <h2>What is Bitcoin</h2>
                            <h5>
                                Bitcoin is an innovative payment network and a new kind of money.
                            </h5>
                            <p>
                                Bitcoin is one of the most important inventions in all of human
                                history. For the first time ever, anyone can send or receive any
                                amount of money with anyone else, anywhere on the planet,
                                conveniently and without restriction. It’s the dawn of a better,
                                more free world.
                            </p>
                            <a href="" className="site-btn sb-gradients sbg-line mt-5">
                                Get Started
                            </a>
                        </div>
                    </div>
                    <div className="about-img">
                        <img src="img/about-img.png" alt="" />
                    </div>
                </div>
            </section>
            {/* About section end */}
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
            <section className="team-section spad">
                <div className="container">
                    <div className="section-title text-center">
                        <h2>Meet Our Team</h2>
                        <p>
                            Our experts in the field of crypto currency can always help you with
                            any of your questions!
                        </p>
                    </div>
                </div>
                <div className="team-members clearfix">
                    {/* Team member */}
                    <div className="member">
                        <div className="member-text">
                            <div className="member-img set-bg" data-setbg="img/member/1.jpg" />
                            <h2>Tom Binegar</h2>
                            <span>Business Development</span>
                        </div>
                        <div className="member-social">
                            <a href="">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin" />
                            </a>
                            <a href="">
                                <i className="fa fa-twitter" />
                            </a>
                        </div>
                        <div className="member-info">
                            <div className="member-img mf set-bg" data-setbg="img/member/1.jpg" />
                            <div className="member-meta">
                                <h2>Tom Binegar</h2>
                                <span>Marketing Director</span>
                            </div>
                            <p>
                                Jackson Nash is a full-time faculty member of the Marketing and
                                Behavioural Science Division at the Sauder School of Business at
                                UBC. He leads the Entrepreneurship Group, in the undergraduate and
                                graduate programs, teaching actively in both of these.
                            </p>
                        </div>
                    </div>
                    {/* Team member */}
                    <div className="member">
                        <div className="member-text">
                            <div className="member-img set-bg" data-setbg="img/member/2.jpg" />
                            <h2>Jackson Nash</h2>
                            <span>Business Development</span>
                        </div>
                        <div className="member-social">
                            <a href="">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin" />
                            </a>
                            <a href="">
                                <i className="fa fa-twitter" />
                            </a>
                        </div>
                        <div className="member-info">
                            <div className="member-img mf set-bg" data-setbg="img/member/2.jpg" />
                            <div className="member-meta">
                                <h2>Jackson Nash</h2>
                                <span>Marketing Director</span>
                            </div>
                            <p>
                                Jackson Nash is a full-time faculty member of the Marketing and
                                Behavioural Science Division at the Sauder School of Business at
                                UBC. He leads the Entrepreneurship Group, in the undergraduate and
                                graduate programs, teaching actively in both of these.
                            </p>
                        </div>
                    </div>
                    {/* Team member */}
                    <div className="member">
                        <div className="member-text">
                            <div className="member-img set-bg" data-setbg="img/member/3.jpg" />
                            <h2>Tom Binegar</h2>
                            <span>Business Development</span>
                        </div>
                        <div className="member-social">
                            <a href="">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin" />
                            </a>
                            <a href="">
                                <i className="fa fa-twitter" />
                            </a>
                        </div>
                        <div className="member-info">
                            <div className="member-img mf set-bg" data-setbg="img/member/3.jpg" />
                            <div className="member-meta">
                                <h2>Aaron Ballance</h2>
                                <span>Ceo Bitcoin</span>
                            </div>
                            <p>
                                Jackson Nash is a full-time faculty member of the Marketing and
                                Behavioural Science Division at the Sauder School of Business at
                                UBC. He leads the Entrepreneurship Group, in the undergraduate and
                                graduate programs, teaching actively in both of these.
                            </p>
                        </div>
                    </div>
                    {/* Team member */}
                    <div className="member">
                        <div className="member-text">
                            <div className="member-img set-bg" data-setbg="img/member/4.jpg" />
                            <h2>Melissa Barth</h2>
                            <span>Product Manager</span>
                        </div>
                        <div className="member-social">
                            <a href="">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin" />
                            </a>
                            <a href="">
                                <i className="fa fa-twitter" />
                            </a>
                        </div>
                        <div className="member-info">
                            <div className="member-img mf set-bg" data-setbg="img/member/4.jpg" />
                            <div className="member-meta">
                                <h2>Melissa Barth</h2>
                                <span>Product Manager</span>
                            </div>
                            <p>
                                Jackson Nash is a full-time faculty member of the Marketing and
                                Behavioural Science Division at the Sauder School of Business at
                                UBC. He leads the Entrepreneurship Group, in the undergraduate and
                                graduate programs, teaching actively in both of these.
                            </p>
                        </div>
                    </div>
                    {/* Team member */}
                    <div className="member">
                        <div className="member-text">
                            <div className="member-img set-bg" data-setbg="img/member/5.jpg" />
                            <h2>Katy Abrams</h2>
                            <span>Head of Design</span>
                        </div>
                        <div className="member-social">
                            <a href="">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin" />
                            </a>
                            <a href="">
                                <i className="fa fa-twitter" />
                            </a>
                        </div>
                        <div className="member-info">
                            <div className="member-img mf set-bg" data-setbg="img/member/5.jpg" />
                            <div className="member-meta">
                                <h2>Katy Abrams</h2>
                                <span>Head of Design</span>
                            </div>
                            <p>
                                Jackson Nash is a full-time faculty member of the Marketing and
                                Behavioural Science Division at the Sauder School of Business at
                                UBC. He leads the Entrepreneurship Group, in the undergraduate and
                                graduate programs, teaching actively in both of these.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
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
        </>
    )
}

export default page