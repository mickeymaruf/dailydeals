import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="p-10 pb-6 bg-base-200 text-base-content">
            <div className='max-w-screen-lg mx-auto'>
                <footer className='footer mb-6'>
                    <div>
                        <span className="footer-title">Services</span>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a href="https://maruf-dev.netlify.com/" target="_blank" className="link link-hover">Portfolio</a>
                        <a href="https://github.com/mickeymaruf" target="_blank" className="link link-hover">Github</a>
                        <a href="https://www.linkedin.com/in/mickeymaruf/" target="_blank" className="link link-hover">LinkedIn</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                    <div>
                        <span className="footer-title">Newsletter</span>
                        <div className="form-control w-80">
                            <label className="label">
                                <span className="label-text">Enter your email address</span>
                            </label>
                            <div className="relative">
                                <input type="text" placeholder="example@site.com" className="input input-bordered w-full pr-16" />
                                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none" disabled>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </footer>
                <footer className="footer mb-0 px-10 pt-6 border-t bg-base-200 text-base-content border-base-300">
                    <p>Copyright © Daily Deals</p>
                    <div className="md:place-self-center md:justify-self-end">
                        <div className="grid grid-flow-col gap-4">
                            <a href="https://www.linkedin.com/in/mickeymaruf/"><FaLinkedin size={25} /></a>
                            <a href="https://github.com/mickeymaruf"><BsGithub size={25} /></a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;