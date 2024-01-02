// ScrollShow.jsx
import React, { useState, useEffect, useRef } from 'react';

const ScrollShow = ({ children, delay = 200, start = 'right', repeat = true }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                } else {
                    if (repeat) setVisible(false);
                }
            });
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, [repeat]);

    return (
        <div ref={ref} className={`${visible ? 'visible' : ''} ${start}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

export default ScrollShow;