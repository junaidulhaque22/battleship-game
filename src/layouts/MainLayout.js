import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import PlayingGrid from '../components/PlayingGrid/PlayingGrid';
import Menu from '../components/Menu/Menu';

const MainLayout = () => {
    const gameStart = useSelector((state) => state.startGame);
    return (
        <div>
            <Navbar> </Navbar>
            {gameStart ? <PlayingGrid></PlayingGrid> : <Menu></Menu>}
        </div>
    );
};

export default MainLayout;
