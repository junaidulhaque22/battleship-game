import { combineReducers } from 'redux';
import { GameStates } from '../actions';

const initialLocationInfo = [[], []];

const initialShipLocation = [[], []];

const locationInfo = (state = initialLocationInfo, action) => {
    const newState = [...state];
    switch (action.type) {
    case 'SET_LOCATION_INFO':
        newState[action.playerNum] = action.locationInfo;
        return newState;
    default:
        return state;
    }
};

const shipLocation = (state = initialShipLocation, action) => {
    const newState = [...state];
    switch (action.type) {
    case 'SET_SHIP_LOCATION':
        newState[action.playerNum] = action.shipLocation;
        return newState;
    default:
        return state;
    }
};

const gameState = (state = GameStates.SETTING, action) => {
    switch (action.type) {
    case 'SET_GAME_STATE':
        return action.gameState;
    default:
        return state;
    }
};

const nextMove = (state = 1, action) => {
    switch (action.type) {
    case 'TOGGLE_NEXT_MOVE':
        if (state === 1) return 0;
        return 1;
    default:
        return state;
    }
};

const p1Ready = (state = false, action) => {
    switch (action.type) {
    case 'TOGGLE_P1_READY':
        return !state;
    default:
        return state;
    }
};

const cpuMode = (state = true, action) => {
    switch (action.type) {
    case 'TOGGLE_CPU_MODE':
        return !state;
    default:
        return state;
    }
};

const startGame = (state = false, action) => {
    switch (action.type) {
    case 'TOGGLE_START_GAME':
        return !state;
    default:
        return state;
    }
};

const shipInfo = (state = [], action) => {
    switch (action.type) {
    case 'SET_SHIP_INFO':
        return action.shipInfo;
    default:
        return state;
    }
};

const gridSize = (state = [], action) => {
    switch (action.type) {
    case 'SET_GRID_SIZE':
        return action.gridSize;
    default:
        return state;
    }
};

export default combineReducers({
    gameState,
    shipLocation,
    locationInfo,
    nextMove,
    p1Ready,
    cpuMode,
    startGame,
    shipInfo,
    gridSize,
});
