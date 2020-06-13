import React from 'react'
import { useDispatch } from 'react-redux'
import { setLocationInfo, setShipLocation, setGameState, toggleP1Ready, GameStates } from './../../../actions'
import SettingSquare from "./SettingSquare/SettingSquare"
import { shipInfo, num } from "./../../../config"
import "./../PlayingGrid.scss"


const SettingGrid = ({ playerNum, active }) => {
    const dispatch = useDispatch();
    // There are 2 ships. 
    // 1. Horizontal length 2 
    // 2. Vertical length 2
    const [displayGrid, setDisplayGrid] = React.useState(new Array(num).fill("n").map(() => new Array(num).fill("n")));
    const [shipData, setShipData] = React.useState([])
    const [idGrid, setIdGrid] = React.useState(new Array(num).fill(-1).map(() => new Array(num).fill(-1)))
    const [shipsPlaced, setShipsPlaced] = React.useState(0)
    React.useEffect(() => {
        updateGridInfo();
    }, [shipData])

    const updateGridInfo = () => {
        shipData.forEach((ship, index) => {
            let tempDisplayInfo = [...displayGrid];
            let tempIdGrid = [...idGrid]
            if (shipInfo[index].horizontal) {
                tempDisplayInfo[ship.y][ship.x] = "hs"
                tempDisplayInfo[ship.y][ship.x + 1] = "he"
                tempIdGrid[ship.y][ship.x] = index
                tempIdGrid[ship.y][ship.x + 1] = index
            }
            else {
                tempDisplayInfo[ship.y][ship.x] = "vs"
                tempDisplayInfo[ship.y + 1][ship.x] = "ve"
                tempIdGrid[ship.y][ship.x] = index
                tempIdGrid[ship.y + 1][ship.x] = index
            }
            setDisplayGrid(tempDisplayInfo)
            setIdGrid(tempIdGrid)
            setShipsPlaced(shipsPlaced + 1)
        });
    }

    const handleSquareClick = (xVal, yVal) => {
        if (active && shipsPlaced < shipInfo.length) {
            if (validateVal(xVal, yVal)) {
                let tempShipLocation = [...shipData]
                tempShipLocation.push({ x: xVal, y: yVal })
                setShipData(tempShipLocation)
            }
        }
    }

    const handleReadyClick = () => {
        endSetting()
    }

    const endSetting = () => {
        dispatch(setLocationInfo(idGrid, playerNum))
        dispatch(setShipLocation(shipData, playerNum))
        if (playerNum === 0)
            dispatch(toggleP1Ready())
        else
            dispatch(setGameState(GameStates.GAME))
    }

    const validateVal = (xVal, yVal) => {
        let index = shipData.length
        let tempShipGrid = []
        if (shipInfo[index]) {
            // Out of Bounds
            if (shipInfo[index].horizontal) {
                if (xVal + shipInfo[index].length > num) {
                    alert("OUT OF BOUNDS")
                    return false
                }
            }
            else {
                if (yVal + shipInfo[index].length > num) {
                    alert("OUT OF BOUNDS")
                    return false
                }
            }
            // Collision
            if (shipInfo[index].horizontal) {
                tempShipGrid.push({ y: yVal, x: xVal })
                tempShipGrid.push({ y: yVal, x: xVal + 1 })
            }
            else {
                tempShipGrid.push({ y: yVal, x: xVal })
                tempShipGrid.push({ y: yVal + 1, x: xVal })
            }
            for (let i = 0; i < tempShipGrid.length; i++) {
                const item = tempShipGrid[i];
                if (idGrid[item.y][item.x] !== -1) {
                    alert(`Collision on ${item.x} and ${item.y}`)
                    return false
                }
            }
            return true
        }
    }

    return (
        <div>
            {
                [...Array(num)].map((e, i) => <div className="boxRow" key={i}>
                    {[...Array(num)].map((e, j) =>
                        <SettingSquare key={j.toString() + i.toString()} shipHover={shipInfo[shipsPlaced]} shipType={displayGrid[i][j]} visible={active} clickHandler={() => { handleSquareClick(j, i) }}>

                        </SettingSquare>)}
                </div>)
            }
            <button disabled={!active || shipsPlaced < shipInfo.length} onClick={handleReadyClick}> Ready</button>
        </div>
    )
}

export default SettingGrid