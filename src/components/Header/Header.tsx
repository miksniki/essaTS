import React from 'react';
import Logo from './img/logomusic.jpg';

import './Header.scss';

function Header() {
    return(
        <div className="header">
            <h1>
                Skully
                <img style={{width: '80px',height: '50px'}} className="logo" src={Logo} alt="logo"></img>
            </h1>
        </div>
    )
}

export default Header;