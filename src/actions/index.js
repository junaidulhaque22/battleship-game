export const setLocationInfo = (locationInfo, playerNum) => ({
    type: 'SET_LOCATION_INFO',
    locationInfo,
    playerNum,
});

export const setShipLocation = (shipLocation, playerNum) => ({
    type: 'SET_SHIP_LOCATION',
    shipLocation,
    playerNum,
});

export const setGameState = (gameState) => ({
    type: 'SET_GAME_STATE',
    gameState,
});

export const toggleNextMove = () => ({
    type: 'TOGGLE_NEXT_MOVE',
});

export const toggleP1Ready = () => ({
    type: 'TOGGLE_P1_READY',
});

export const toggleCpuMode = () => ({
    type: 'TOGGLE_CPU_MODE',
});

export const toggleStartGame = () => ({
    type: 'TOGGLE_START_GAME',
});

export const setShipInfo = (shipInfo) => ({
    type: 'SET_SHIP_INFO',
    shipInfo,
});

export const setGridSize = (gridSize) => ({
    type: 'SET_GRID_SIZE',
    gridSize,
});

export const GameStates = {
    SETTING: 'SETTING',
    GAME: 'GAME',
    P1COMPLETE: 'P1COMPLETE',
    P2COMPLETE: 'P2COMPLETE',
};
