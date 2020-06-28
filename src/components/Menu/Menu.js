import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setLocationInfo, setShipLocation, toggleCpuMode, toggleStartGame, setShipInfo, setGridSize
} from '../../actions';
import {
    possibleShips, possibleGrids,
} from '../../config';
import GameIcon from '../../assets/icons/invertedBattleship.png';
import LeftArrow from '../../assets/icons/left_arrow.png';
import RightArrow from '../../assets/icons/right_arrow.png';

import './Menu.scss';

const Menu = () => {
    const dispatch = useDispatch();
    const [cpuMode, setCpuMode] = useState(true);
    const [gridNum, setGridNum] = useState(0);
    const [ships, setShips] = useState(0);

    const validateVal = (xVal, yVal, index, idGrid, shipInfo) => {
        const tempShipGrid = [];
        if (shipInfo[index]) {
            // Out of Bounds
            if (shipInfo[index].horizontal) {
                if (xVal + shipInfo[index].length > possibleGrids[gridNum]) {
                    return false;
                }
            } else if (yVal + shipInfo[index].length > possibleGrids[gridNum]) {
                return false;
            }
            // Collision
            if (shipInfo[index].horizontal) {
                tempShipGrid.push({ y: yVal, x: xVal });
                tempShipGrid.push({ y: yVal, x: xVal + 1 });
            } else {
                tempShipGrid.push({ y: yVal, x: xVal });
                tempShipGrid.push({ y: yVal + 1, x: xVal });
            }
            for (let i = 0; i < tempShipGrid.length; i += 1) {
                const item = tempShipGrid[i];
                if (idGrid[item.y][item.x] !== -1) {
                    return false;
                }
            }
        }
        return true;
    };

    const createShipInfo = () => {
        const shipInfo = [];
        for (let i = 0; i < possibleShips[ships] / 2; i += 1) {
            shipInfo.push({ horizontal: true, length: 2 });
            shipInfo.push({ horizontal: false, length: 2 });
        }
        return shipInfo;
    };

    const setRandomShips = (shipInfo) => {
        const idGrid = new Array(possibleGrids[gridNum]).fill(-1).map(() => new Array(possibleGrids[gridNum]).fill(-1));
        const shipData = [];
        let i = 0;
        while (i < shipInfo.length) {
            const xVal = Math.round(Math.random() * 4);
            const yVal = Math.round(Math.random() * 4);
            if (validateVal(xVal, yVal, i, idGrid, shipInfo)) {
                shipData.push({ x: xVal, y: yVal });
                if (shipInfo[i].horizontal) {
                    idGrid[yVal][xVal] = i;
                    idGrid[yVal][xVal + 1] = i;
                } else {
                    idGrid[yVal][xVal] = i;
                    idGrid[yVal + 1][xVal] = i;
                }
                i += 1;
            }
        }
        dispatch(setLocationInfo(idGrid, 1));
        dispatch(setShipLocation(shipData, 1));
    };

    const handleShipChange = (isRight) => {
        if (isRight) {
            if (ships < possibleShips.length - 1) setShips(ships + 1);
            else setShips(0);
        } else {
            // eslint-disable-next-line no-lonely-if
            if (ships > 0) setShips(ships - 1);
            else setShips(possibleShips[possibleShips.length - 1]);
        }
    };

    const handleGridChange = (isRight) => {
        if (isRight) {
            if (gridNum < possibleGrids.length - 1) setGridNum(gridNum + 1);
            else setGridNum(0);
        } else {
            // eslint-disable-next-line no-lonely-if
            if (gridNum > 0) setGridNum(gridNum - 1);
            else setGridNum(possibleGrids[possibleGrids.length - 1]);
        }
    };

    const handleModeChange = () => {
        setCpuMode(!cpuMode);
    };

    const handleButtonClick = () => {
        const shipInfo = createShipInfo();
        dispatch(setShipInfo(shipInfo));
        dispatch(setGridSize(possibleGrids[gridNum]));
        if (!cpuMode) {
            dispatch(toggleCpuMode());
        } else setRandomShips(shipInfo);
        dispatch(toggleStartGame());
    };
    return (
        <div>
            <div className='menu'>
                <div className='menuWrapper'>
                    <div className="menuTop">
                        <img className='menuIcon' src={GameIcon} />
                        <div>BATTLESHIP</div>
                    </div>
                    <div className="gridContainer">
                        <div className="gridItem">
                            <div className='menuEntry'>
                                Number of Ships
                            </div>
                        </div>
                        <div className="gridItem">
                            <div className="selectionWrapper">
                                <div className="selection">
                                    <div className="leftArrow" onClick={() => handleShipChange(false)}>
                                        <img className="menuArrow" src={LeftArrow} />
                                    </div>
                                    <div className="selectionBox" onClick={() => handleShipChange(true)}>
                                        {possibleShips[ships]}
                                    </div>
                                    <div className="RightArrow" onClick={() => handleShipChange(true)}>
                                        <img className="menuArrow" src={RightArrow} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gridItem">
                            <div className='menuEntry'>
                                Grid Size
                            </div>
                        </div>
                        <div className="gridItem">
                            <div className="selectionWrapper">
                                <div className="selection">
                                    <div className="leftArrow" onClick={() => handleGridChange(false)}>
                                        <img className="menuArrow" src={LeftArrow} />
                                    </div>
                                    <div className="selectionBox" onClick={() => handleGridChange(true)}>
                                        {`${possibleGrids[gridNum]}x${possibleGrids[gridNum]}`}
                                    </div>
                                    <div className="RightArrow" onClick={() => handleGridChange(true)}>
                                        <img className="menuArrow" src={RightArrow} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gridItem">
                            <div className='menuEntry'>
                                Player 2
                            </div>
                        </div>
                        <div className="gridItem">
                            <div className="selectionWrapper">
                                <div className="selection">
                                    <div className="leftArrow" onClick={handleModeChange}>
                                        <img className="menuArrow" src={LeftArrow} />
                                    </div>
                                    <div className="selectionBox" onClick={handleModeChange}>
                                        {cpuMode ? 'CPU' : 'Human'}
                                    </div>
                                    <div className="RightArrow" onClick={handleModeChange}>
                                        <img className="menuArrow" src={RightArrow} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="startWrapper">
                        <div className="button" onClick={handleButtonClick}>
                            Start
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
