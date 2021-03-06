import React from 'react';
import './Navbar.scss';
import GitIcon from '../../assets/icons/git-mark.png';
import GameIcon from '../../assets/icons/battleship.png';

const Navbar = () => {
    const a = 'b';
    return (
        <div>
            <div className='navbarWrapper'>
                <div className='gameBrand'>
                    <img className='navbarIcon' src={GameIcon} />
                    <div>BATTLESHIP</div>
                </div>
                <div>
                    <a href="https://github.com/junaidulhaque22/battleship-game" target="_blank" rel="noreferrer">
                        <img className='navbarIcon' src={GitIcon} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
