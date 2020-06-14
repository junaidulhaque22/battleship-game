import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Square from './GameSquare/GameSquare';
import { toggleNextMove, setGameState, GameStates } from '../../../actions';

import { shipInfo, num } from '../../../config';
import '../PlayingGrid.scss';

const PlayingGrid = ({ playerNum, active }) => {
    const dispatch = useDispatch();
    const locationGrid = useSelector((state) => state.locationInfo[playerNum]);
    const shipLocation = useSelector((state) => state.shipLocation[playerNum]);

    const [guessGrid, setGuessGrid] = React.useState(
        new Array(num).fill(-2).map(() => new Array(num).fill(-2)),
    );
    const [displayGrid, setDisplayGrid] = React.useState(new Array(num).fill('n').map(() => new Array(num).fill('n')));
    const [numDiscovered, setNumDiscovered] = React.useState(0);

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

            for (let i = 0; i < tempGuessGrid.length; i++) {
                for (let j = 0; j < tempGuessGrid.length; j++) {
                    if (tempGuessGrid[i][j] === -1) tempDisplayGrid[i][j] = 'x';
                    else if (tempGuessGrid[i][j] > -1 && !discoveredShips.includes(tempGuessGrid[i][j])) {
                        tempDisplayGrid[i][j] = 'o';
                    }
                }
            }
            tempDisplayGrid = drawShips(discoveredShips, tempDisplayGrid);
            setGuessGrid(tempGuessGrid);
            setDisplayGrid(tempDisplayGrid);
            setNumDiscovered(discoveredShips.length);
            dispatch(toggleNextMove());
            if (discoveredShips.length === shipInfo.length) {
                if (playerNum === 0) dispatch(setGameState(GameStates.P1COMPLETE));
                else dispatch(setGameState(GameStates.P2COMPLETE));
            }
        }
    };

    return (
        <div>
            <div className ="playerMessage"></div>
            {
                [...Array(num)].map((e, i) => <div className="boxRow" key={i}>
                    {[...Array(num)].map((e, j) => <Square key={j.toString() + i.toString()} displayType={displayGrid[i][j]} isActive={active}
                        clickHandler={() => { handleSquareClick(j, i); }}>

                    </Square>)}
                </div>)
            }
            <div className="gameInfo">
                {`Ships Discovered: ${numDiscovered}/${shipInfo.length}`}
            </div>
        </div>
    );
};

export default PlayingGrid;
