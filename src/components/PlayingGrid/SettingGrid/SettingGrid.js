import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLocationInfo, setShipLocation, setGameState, toggleP1Ready, GameStates,
} from '../../../actions';
import SettingSquare from './SettingSquare/SettingSquare';

import UndoIcon from '../../../assets/icons/undo-24px.svg';
import DoneIcon from '../../../assets/icons/done-24px.svg';

import '../PlayingGrid.scss';

const SettingGrid = ({ playerNum, active }) => {
    const dispatch = useDispatch();
    const cpuMode = useSelector((state) => state.cpuMode);
    const shipInfo = useSelector((state) => state.shipInfo);
    const gridSize = useSelector((state) => state.gridSize);
    // There are 2 ships.
    // 1. Horizontal length 2
    // 2. Vertical length 2
    const [displayGrid, setDisplayGrid] = React.useState(new Array(gridSize).fill('n').map(() => new Array(gridSize).fill('n')));
    const [shipData, setShipData] = React.useState([]);
    const [idGrid, setIdGrid] = React.useState(new Array(gridSize).fill(-1).map(() => new Array(gridSize).fill(-1)));
    const [shipsPlaced, setShipsPlaced] = React.useState(0);
    const [playerMessage, setPlayerMessage] = React.useState('');

    const updateGridInfo = () => {
        const tempDisplayInfo = new Array(gridSize).fill('n').map(() => new Array(gridSize).fill('n'));
        const tempIdGrid = new Array(gridSize).fill(-1).map(() => new Array(gridSize).fill(-1));
        shipData.forEach((ship, index) => {
            if (shipInfo[index].horizontal) {
                tempDisplayInfo[ship.y][ship.x] = 'hs';
                tempDisplayInfo[ship.y][ship.x + 1] = 'he';
                tempIdGrid[ship.y][ship.x] = index;
                tempIdGrid[ship.y][ship.x + 1] = index;
            } else {
                tempDisplayInfo[ship.y][ship.x] = 'vs';
                tempDisplayInfo[ship.y + 1][ship.x] = 've';
                tempIdGrid[ship.y][ship.x] = index;
                tempIdGrid[ship.y + 1][ship.x] = index;
            }
        });
        setDisplayGrid(tempDisplayInfo);
        setIdGrid(tempIdGrid);
        setShipsPlaced(shipData.length);
    };

    React.useEffect(() => {
        updateGridInfo();
    }, [shipData]);

    const validateVal = (xVal, yVal) => {
        const index = shipData.length;
        const tempShipGrid = [];
        if (shipInfo[index]) {
            // Out of Bounds
            if (shipInfo[index].horizontal) {
                if (xVal + shipInfo[index].length > gridSize) {
                    setPlayerMessage('Ship is out of bounds');
                    return false;
                }
            } else if (yVal + shipInfo[index].length > gridSize) {
                setPlayerMessage('Ship is out of bounds');
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
                    setPlayerMessage('There is a collision between ships');
                    return false;
                }
            }
        }
        setPlayerMessage('');
        return true;
    };

    const handleSquareClick = (xVal, yVal) => {
        if (active && shipsPlaced < shipInfo.length) {
            if (validateVal(xVal, yVal)) {
                const tempShipLocation = [...shipData];
                tempShipLocation.push({ x: xVal, y: yVal });
                setShipData(tempShipLocation);
            }
        }
    };
    const endSetting = () => {
        dispatch(setLocationInfo(idGrid, playerNum));
        dispatch(setShipLocation(shipData, playerNum));
        if (playerNum === 0) {
            dispatch(toggleP1Ready());
            if (cpuMode) dispatch(setGameState(GameStates.GAME));
        } else dispatch(setGameState(GameStates.GAME));
    };

    const handleReadyClick = () => {
        if (active && shipsPlaced === shipInfo.length) {
            endSetting();
        }
    };

    const handleUndoClick = () => {
        if (active && shipsPlaced !== 0) {
            const tempShipData = [...shipData];
            tempShipData.pop();
            setShipData(tempShipData);
            setShipsPlaced(shipsPlaced - 1);
        }
    };

    return (
        <div>
            <div className = "playerMessage">
                {playerMessage}
            </div>
            {
                [...Array(gridSize)].map((e, i) => <div className="boxRow" key={i}>
                    {[...Array(gridSize)].map((e, j) => <SettingSquare key={j.toString() + i.toString()}
                        shipHover={shipInfo[shipsPlaced]}
                        shipType={displayGrid[i][j]}
                        visible={active}
                        clickHandler={() => { handleSquareClick(j, i); }}>

                    </SettingSquare>)}
                </div>)
            }
            <div className="settingInfo">
                <div className = {!active || shipsPlaced === 0 ? 'disabledSmallButton' : 'smallButton'}
                    onClick={handleUndoClick}>
                    <img src={UndoIcon} className = "smallIcon"/>
                    Undo
                </div>
                <div> {`Ships Placed: ${shipsPlaced}/${shipInfo.length}`}</div>
                <div className = {!active || shipsPlaced < shipInfo.length ? 'disabledSmallButton' : 'smallButton'}
                    onClick={handleReadyClick}>
                    <img src={DoneIcon} className = "smallIcon" />
                    Ready
                </div>
            </div>
        </div>
    );
};

export default SettingGrid;
