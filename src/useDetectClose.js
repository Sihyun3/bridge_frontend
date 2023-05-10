import { useState, useEffect } from 'react';


/* 메일 주소 드롭다운 */
const useDetectClose = (ref, initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);

    useEffect(() => {
        const pageClickEvent = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(!isOpen);
            }
        };

        if (isOpen) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        };
    }, [isOpen, ref]);
    return [isOpen, setIsOpen];
}

export default useDetectClose;
