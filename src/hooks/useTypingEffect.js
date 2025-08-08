import { useState, useEffect } from 'react';

export const useTypingEffect = (text, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      
      const typingTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingTimer);
        }
      }, speed);

      return () => clearInterval(typingTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return { displayText, isTyping };
};