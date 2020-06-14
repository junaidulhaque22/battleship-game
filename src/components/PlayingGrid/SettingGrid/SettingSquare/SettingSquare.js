import React from 'react';
import PropTypes from 'prop-types';
import '../../PlayingGrid.scss';

const Square = ({
    shipHover, shipType, clickHandler, visible,
}) => {
    const [isHover, setIsHover] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };
    return (
        <div id="square" className="square" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => clickHandler()}>
            {shipType === 'n' && visible && isHover && shipHover && <div className={shipHover.horizontal ? 'horizontal' : 'vertical'}> </div>}
            {shipType !== 'n' && visible && <div className={shipType === 'hs' ? 'hs' : shipType === 'he' ? 'he' : shipType === 'vs' ? 'vs' : 've'}></div>}
        </div>
    );
};

export default Square;

Square.propTypes = {
    shipHover: PropTypes.object,
    shipType: PropTypes.string,
    clickHandler: PropTypes.func,
    visible: PropTypes.bool,
};
