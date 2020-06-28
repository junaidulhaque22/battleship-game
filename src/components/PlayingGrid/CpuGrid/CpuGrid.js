import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Square from './CpuSquare/CpuSquare';
import { toggleNextMove, setGameState, GameStates } from '../../../actions';

import '../PlayingGrid.scss';

const CpuGrid = ({ playerNum, active }) => {
    const dispatch = useDispatch();
    const locationGrid = useSelector((state) => state.locationInfo[playerNum]);
    const shipLocation = useSelector((state) => state.shipLocation[playerNum]);
    const shipInfo = useSelector((state) => state.shipInfo);
    const gridSize = useSelector((state) => state.gridSize);

    const [guessGrid, setGuessGrid] = React.useState(
        new Array(gridSize).fill(-2).map(() => new Array(gridSize).fill(-2)),
    );
    const [displayGrid, setDisplayGrid] = React.useState(new Array(gridSize).fill('n').map(() => new Array(gridSize).fill('n')));
    const [discovered, setDiscovered] = React.useState([]);

    const drawShips = (ships, grid) => {
        const tempGrid = [...grid];
        ships.forEach((index) => {
            if (shipInfo[index].horizontal) {
                tempGrid[shipLocation[index].y][shipLocation[index].x] = 'hs';
                tempGrid[shipLocation[index].y][shipLocation[index].x + 1] = 'he';
            } else {
                tempGrid[shipLocation[index].y][shipLocation[index].x] = 'vs';
                tempGrid[shipLocation[index].y + 1][shipLocation[index].x] = 've';
            }
        });
        return tempGrid;
    };

    const handleSquareClick = (x, y) => {
        if (active && guessGrid[y][x] === -2) {
            const tempGuessGrid = [...guessGrid];
            let tempDisplayGrid = [...displayGrid];
            const numShipPoints = Array(shipInfo.length).fill(0);
            const discoveredShips = [];

            if (locationGrid[y][x] !== -1) tempGuessGrid[y][x] = locationGrid[y][x];
            else tempGuessGrid[y][x] = -1;

            tempGuessGrid.forEach((element) => {
                element.forEach((item) => {
                    if (item > -1) numShipPoints[item] += 1;
                });
            });

            numShipPoints.forEach((item, index) => {
                if (item === shipInfo[index].length) discoveredShips.push(index);
            });

            for (let i = 0; i < tempGuessGrid.length; i += 1) {
                for (let j = 0; j < tempGuessGrid.length; j += 1) {
                    if (tempGuessGrid[i][j] === -1) tempDisplayGrid[i][j] = 'x';
                    else if (tempGuessGrid[i][j] > -1 && !discoveredShips.includes(tempGuessGrid[i][j])) {
                        tempDisplayGrid[i][j] = 'o';
                    }
                }
            }
            tempDisplayGrid = drawShips(discoveredShips, tempDisplayGrid);
            setGuessGrid(tempGuessGrid);
            setDisplayGrid(tempDisplayGrid);
            setDiscovered(discoveredShips);
            dispatch(toggleNextMove());
            if (discoveredShips.length === shipInfo.length) {
                if (playerNum === 0) dispatch(setGameState(GameStates.P1COMPLETE));
                else dispatch(setGameState(GameStates.P2COMPLETE));
            }
        }
    };

    const calculateBestGuess = () => {
        let verticalLeft = false;
        let horizontalLeft = false;
        shipInfo.forEach((element, i) => {
            if (!discovered.includes(i)) {
                if (element.horizontal) horizontalLeft = true;
                else verticalLeft = true;
            }
        });
        let item = {};
        const priority = [];
        const possible = [];
        for (let i = 0; i < gridSize; i += 1) {
            for (let j = 0; j < gridSize; j += 1) {
                if (guessGrid[i][j] === -2) {
                    if (verticalLeft && i - 1 >= 0 && guessGrid[i - 1][j] !== -1 && displayGrid[i - 1][j] === 'o') {
                        priority.push({ i, j });
                    } else if (verticalLeft && i + 1 <= 4 && guessGrid[i + 1][j] !== -1 && displayGrid[i + 1][j] === 'o') {
                        priority.push({ i, j });
                    } else if (horizontalLeft && j - 1 >= 0 && guessGrid[i][j - 1] !== -1 && displayGrid[i][j - 1] === 'o') {
                        priority.push({ i, j });
                    } else if (horizontalLeft && j + 1 <= 5 && guessGrid[i][j + 1] !== -1 && displayGrid[i][j + 1] === 'o') {
                        priority.push({ i, j });
                    } else {
                        possible.push({ i, j });
                    }
                }
            }
        }
        if (priority.length > 0) item = priority[Math.floor(Math.random() * priority.length)];
        else item = possible[Math.floor(Math.random() * possible.length)];
        return item;
    };

    React.useEffect(() => {
        if (active === true) {
            const guess = calculateBestGuess();
            handleSquareClick(guess.j, guess.i);
        }
    }, [active]);

    return (
        <div>
            <div className="playerMessage"></div>
            {
                [...Array(gridSize)].map((e, i) => <div className="boxRow" key={i}>
                    {[...Array(gridSize)].map((e, j) => <Square key={j.toString() + i.toString()} displayType={displayGrid[i][j]} isActive={active}
                        clickHandler={() => { handleSquareClick(j, i); }}>

                    </Square>)}
                </div>)
            }
            <div className="gameInfo">
                {`Ships Discovered: ${discovered.length}/${shipInfo.length}`}
            </div>
        </div>
    );
};

export default CpuGrid;
