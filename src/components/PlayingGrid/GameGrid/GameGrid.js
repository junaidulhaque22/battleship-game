import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Square from "./GameSquare/GameSquare"
import { toggleNextMove, setGameState, GameStates } from './../../../actions'

import { shipInfo, num } from "./../../../config"
import "./../PlayingGrid.scss"

const PlayingGrid = ({ playerNum, active }) => {
    const dispatch = useDispatch()
    const locationGrid = useSelector(state => state.locationInfo[playerNum])
    const shipLocation = useSelector(state => state.shipLocation[playerNum])

    const [guessGrid, setGuessGrid] = React.useState(new Array(num).fill(-2).map(() => new Array(num).fill(-2)));
    const [displayGrid, setDisplayGrid] = React.useState(new Array(num).fill("n").map(() => new Array(num).fill("n")));

    const drawShips = (ships, grid) => {
        let tempGrid = [...grid]
        ships.forEach(index => {
            if (shipInfo[index].horizontal) {
                grid[shipLocation[index].y][shipLocation[index].x] = "hs"
                grid[shipLocation[index].y][shipLocation[index].x + 1] = "he"
            }
            else {
                grid[shipLocation[index].y][shipLocation[index].x] = "vs"
                grid[shipLocation[index].y + 1][shipLocation[index].x] = "ve"
            }
        });
        return tempGrid
    }

    const handleSquareClick = (x, y) => {
        if (active && guessGrid[y][x] === -2) {
            let tempGuessGrid = [...guessGrid]
            let tempDisplayGrid = [...displayGrid]
            let numShipPoints = Array(shipInfo.length).fill(0)
            let discoveredShips = []

            if (locationGrid[y][x] !== -1)
                tempGuessGrid[y][x] = locationGrid[y][x]
            else
                tempGuessGrid[y][x] = -1

            tempGuessGrid.forEach((element) => {
                element.forEach((item) => {
                    if (item > -1)
                        numShipPoints[item] = numShipPoints[item] + 1
                })
            });

            numShipPoints.forEach((item, index) => {
                if (item === shipInfo[index].length)
                    discoveredShips.push(index)
            });

            for (let i = 0; i < tempGuessGrid.length; i++) {
                for (let j = 0; j < tempGuessGrid.length; j++) {
                    if (tempGuessGrid[i][j] === -1)
                        tempDisplayGrid[i][j] = "x"
                    else if (tempGuessGrid[i][j] > -1 && !discoveredShips.includes(tempGuessGrid[i][j])) {
                        tempDisplayGrid[i][j] = "o"
                    }
                }
            }
            tempDisplayGrid = drawShips(discoveredShips, tempDisplayGrid)
            setGuessGrid(tempGuessGrid)
            setDisplayGrid(tempDisplayGrid)
            dispatch(toggleNextMove())
            if (discoveredShips.length === shipInfo.length) {
                if (playerNum === 0)
                    dispatch(setGameState(GameStates.P1COMPLETE))
                else
                    dispatch(setGameState(GameStates.P2COMPLETE))
            }

        }
    }

    return (
        <div>
            {
                [...Array(num)].map((e, i) => <div className="boxRow" key={i}>
                    {[...Array(num)].map((e, j) =>
                        <Square key={j.toString() + i.toString()} displayType={displayGrid[i][j]} isActive={active} clickHandler={() => { handleSquareClick(j, i) }}>

                        </Square>)}
                </div>)
            }
        </div>
    )
}

export default PlayingGrid