'use client';

import { useEffect, useState } from 'react';

const GoToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-7 right-4 bg-green-300 text-white p-3 rounded-full shadow-md transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Top
    </button>
  );
};

export default GoToTopBtn;
