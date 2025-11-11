import React, { useEffect, useState } from 'react';
import './ScrollToTopButton.css'; 

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            style={{ display: isVisible ? 'block' : 'none' ,alignItems:'center',cursor:'pointer',transform:'scale(0.95)',fontWeight:'600', borderColor:'transparent', fontSize:'30px' }}
        >
            Вверх
        </button>
    );
};

export default ScrollToTopButton;