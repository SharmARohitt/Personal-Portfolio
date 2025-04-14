
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  speed = 70,
  delay = 0 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(false);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Delay before starting typing
    const delayTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [text, delay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    if (currentIndex < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, speed, text]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="border-r-2 border-primary animate-blink">&nbsp;</span>}
    </span>
  );
};

export default AnimatedText;
