import React from 'react';
import PropTypes from 'prop-types';
import '../../PlayingGrid.scss';

const Square = ({ displayType, clickHandler, isActive }) => {
    const [isHover, setIsHover] = React.useState(false);
    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div id="square" className="square" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => clickHandler()}>
            {displayType === 'n' ? (isActive && isHover && <div className="focus" />) : displayType === 'x' ? <div className={displayType}>x</div> : <div className={displayType} />}
        </div>
    );
};

export default Square;

Square.propTypes = {
    displayType: PropTypes.string,
    clickHandler: PropTypes.func,
    isActive: PropTypes.bool,
};
