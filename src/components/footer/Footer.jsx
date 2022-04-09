import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <h4>© Academlo 2022 | Frank Urbina</h4>
            <div className='social-media'>
                <a href="https://www.instagram.com/regeneracion_del_alma/"
                     target="blank"
                     rel='noopener'
                >
                    <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/frank-urbina-b46393234/"
                     target="blank"
                     rel='noopener'
                >
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a 
                    href="https://github.com/franksymon"
                    target="blank"
                    rel='noopener'
                >
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;