import React from 'react'
import { useSelector } from 'react-redux'
import SettingGrid from "./SettingGrid/SettingGrid"
import GameGrid from "./GameGrid/GameGrid"
import { GameStates } from "./../../actions"

import "./PlayingGrid.scss"

const PlayingGrid = () => {
    const gameState = useSelector(state => state.gameState)
    const p1Ready = useSelector(state => state.p1Ready)
    const nextMove = useSelector(state => state.nextMove)

    return (
        <div>
            <div>
                {gameState === GameStates.P1COMPLETE && "P2 WINS"}
                {gameState === GameStates.P2COMPLETE && "P1 Wins"}
            </div>
            <div className="playField">
                <div className="playerSide">
                    {gameState === GameStates.SETTING ? <SettingGrid playerNum={0} active={!p1Ready}>

                    </SettingGrid> : <GameGrid playerNum={0}
                        active={gameState !== GameStates.P1COMPLETE &&
                            gameState !== GameStates.P2COMPLETE &&
                            nextMove === 0}></GameGrid>}
                </div>
                <div className="playerSide">
                    {gameState === GameStates.SETTING ? <SettingGrid playerNum={1} active={p1Ready}>
                    </SettingGrid> : <GameGrid playerNum={1}
                        active={gameState !== GameStates.P1COMPLETE &&
                            gameState !== GameStates.P2COMPLETE &&
                            nextMove === 1}></GameGrid>}

                </div>
            </div>
        </div>)
}
export default PlayingGrid