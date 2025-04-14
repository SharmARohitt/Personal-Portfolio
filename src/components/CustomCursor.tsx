
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const CustomCursor = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        // Precise centering by subtracting half of the cursor's dimensions
        cursorOuterRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        cursorInnerRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    // Handle hovering effects on interactive elements
    const handleMouseOver = () => {
      setIsHovering(true);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
      
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  // Define cursor colors based on theme with more vibrant and precise colors
  const outerColor = theme === 'dark' 
    ? 'rgba(138, 43, 226, 0.5)' 
    : 'rgba(102, 0, 255, 0.5)';
  
  const innerColor = theme === 'dark'
    ? 'rgba(255, 0, 200, 1)'
    : 'rgba(0, 242, 255, 1)';

  return (
    <>
      {/* Outer cursor - larger, follows with delay */}
      <motion.div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: isHovering ? 1.5 : 1,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: outerColor,
          transform: 'translate(-50%, -50%)', // Ensures perfect centering
          mixBlendMode: 'difference',
          filter: 'blur(5px)',
          boxShadow: `0 0 20px ${outerColor}`,
        }}
      />

      {/* Inner cursor - smaller, follows exactly */}
      <motion.div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: innerColor,
          transform: 'translate(-50%, -50%)', // Ensures perfect centering
          boxShadow: `0 0 10px ${innerColor}`,
        }}
      />
    </>
  );
};

export default CustomCursor;
