import { useState, useEffect } from 'react';

/**
 * Custom typewriter hook
 * @param {string} text - Target string to type
 * @param {number} speed - Milliseconds per character
 * @param {number} startDelay - Initial delay before typing begins
 * @returns {{ displayed: string, done: boolean }}
 */
export function useTypewriter(text, speed = 35, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let intervalId;
    setDisplayed('');
    setDone(false);

    const timeoutId = setTimeout(() => {
      let index = 0;
      intervalId = setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default useTypewriter;

