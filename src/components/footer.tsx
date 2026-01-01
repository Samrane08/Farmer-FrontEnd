import React from 'react';
import mahaitlogo from '../../src/Images/Maha_IT_LogoB.png'; // Adjust the path as necessary

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <div className='row align-items-center'>
                <div className='col-12 col-md text-center text-md-start'>
                 Copyright © 2025. Design and Developed By MAHAIT.
                </div>
                <div className='col-12 col-md text-end text-md-end'>
                     <a href="https://mahait.org/" target="_blank" rel="noopener noreferrer">
            <img src={mahaitlogo}  alt="MAHAIT Logo" className="mahaitlogo" ></img>
          </a>
                </div>
            </div>

</footer>
    );
};

export default Footer;