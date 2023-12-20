import React, { useRef, useEffect } from 'react';

const OutsideClickHandler = ({ onOutsideClick, children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onOutsideClick();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onOutsideClick]);

    return <div ref={containerRef}>{children}</div>;
};

export default OutsideClickHandler;