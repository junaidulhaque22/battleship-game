import React from 'react';
import { useSelector } from 'react-redux';
import SettingGrid from './SettingGrid/SettingGrid';
import GameGrid from './GameGrid/GameGrid';
import CpuGrid from './CpuGrid/CpuGrid';
import { GameStates } from '../../actions';

import RestartIcon from '../../assets/icons/refresh-24px.svg';
import './PlayingGrid.scss';

const PlayingGrid = () => {
    const gameState = useSelector((state) => state.gameState);
    const p1Ready = useSelector((state) => state.p1Ready);
    const nextMove = useSelector((state) => state.nextMove);
    const cpuMode = useSelector((state) => state.cpuMode);

    const handleRestart = () => {
        window.location.reload();
    };
    return (
        <div>
            <div className="status">
                {gameState === GameStates.P1COMPLETE && (cpuMode ? 'CPU wins' : 'Player 2 Wins')}
                {gameState === GameStates.P2COMPLETE && 'Player 1 Wins'}
                {gameState === GameStates.SETTING && 'Select boxes to place your ships'}
                {gameState === GameStates.GAME && 'Select a box to fire'}
            </div>
            { cpuMode
                ? <div className="playField">
                    <div>
                        <div className={gameState === GameStates.SETTING ? !p1Ready ? 'playerSideActive' : 'playerSide' : gameState === GameStates.GAME && nextMove === 0 ? 'playerSideActive' : 'playerSide'}>
                            {gameState === GameStates.SETTING ? <SettingGrid playerNum={0} active={!p1Ready}>
                            </SettingGrid> : <CpuGrid playerNum={0}
                                active={gameState !== GameStates.P1COMPLETE
                                && gameState !== GameStates.P2COMPLETE
                                && nextMove === 0}></CpuGrid>}
                        </div>
                    Player 1
                    </div>
                    <div>
                        <div className={gameState === GameStates.SETTING ? p1Ready ? 'playerSideActive' : 'playerSide' : gameState === GameStates.GAME && nextMove === 1 ? 'playerSideActive' : 'playerSide'}>
                            {gameState === GameStates.SETTING ? <SettingGrid playerNum={1} active={false}>
                            </SettingGrid> : <GameGrid playerNum={1}
                                active={gameState !== GameStates.P1COMPLETE
                                    && gameState !== GameStates.P2COMPLETE
                                    && nextMove === 1}></GameGrid>}
                        </div>
                    CPU
                    </div>
                </div>
                : <div className="playField">
                    <div>
                        <div className={gameState === GameStates.SETTING ? !p1Ready ? 'playerSideActive' : 'playerSide' : gameState === GameStates.GAME && nextMove === 0 ? 'playerSideActive' : 'playerSide'}>
                            {gameState === GameStates.SETTING ? <SettingGrid playerNum={0} active={!p1Ready}>
                            </SettingGrid> : <GameGrid playerNum={0}
                                active={gameState !== GameStates.P1COMPLETE
                            && gameState !== GameStates.P2COMPLETE
                            && nextMove === 0}></GameGrid>}

                        </div>
                Player 1
                    </div>
                    <div>
                        <div className={gameState === GameStates.SETTING ? p1Ready ? 'playerSideActive' : 'playerSide' : gameState === GameStates.GAME && nextMove === 1 ? 'playerSideActive' : 'playerSide'}>
                            {gameState === GameStates.SETTING ? <SettingGrid playerNum={1} active={p1Ready}>
                            </SettingGrid> : <GameGrid playerNum={1}
                                active={gameState !== GameStates.P1COMPLETE
                                && gameState !== GameStates.P2COMPLETE
                                && nextMove === 1}></GameGrid>}
                        </div>
                Player 2
                    </div>
                </div>

            }
            <div className = "restartWrapper">
                <div className="button" onClick={handleRestart}>
                    <img src={RestartIcon} className="icon" />
                    Restart
                </div>
            </div>
        </div>);
};
export default PlayingGrid;
