import { combineReducers } from 'redux'
import { GameStates } from "./../actions"
import { num } from "./../config"

// Create and push grid twice for each player
const initialLocationInfo = []

for (let i = 0; i < 2; i++) {
    initialLocationInfo.push(new Array(num).fill(-1).map(() => new Array(num).fill(-1)));
}

const initialShipLocation = [[], []]

const locationInfo = (state = initialLocationInfo, action) => {
    switch (action.type) {
        case 'SET_LOCATION_INFO':
            let newState = [...state]
            newState[action.playerNum] = action.locationInfo
            return newState
        default:
            return state
    }
}

const shipLocation = (state = initialShipLocation, action) => {
    switch (action.type) {
        case 'SET_SHIP_LOCATION':
            let newState = [...state]
            newState[action.playerNum] = action.shipLocation
            return newState
        default:
            return state
    }
}

const gameState = (state = GameStates.SETTING, action) => {
    switch (action.type) {
        case 'SET_GAME_STATE':
            return action.gameState
        default:
            return state
    }
}

const nextMove = (state = 0, action) => {
    switch (action.type) {
        case 'TOGGLE_NEXT_MOVE':
            if (state === 1)
                return 0
            else 
                return 1
        default:
            return state
    }
}

const p1Ready = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_P1_READY':
            return !state
        default:
            return state
    }
}

export default combineReducers({
    gameState,
    shipLocation,
    locationInfo,
    nextMove,
    p1Ready
})