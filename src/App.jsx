import { useState, useRef,useEffect } from 'react';
import './App.css';


const TypingSpeedTester = () => {
  const sampleText = "The quick brown fox jumps over the lazy dog.";
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [typingTime, setTypingTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const handleStart = () => {
      setUserInput('');
      setTypingTime(null);
      setElapsedTime(0);
      setError('');
      const newStartTime = Date.now();
      setStartTime(newStartTime);
      inputRef.current.focus();

      // Start live timer
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
          setElapsedTime(((Date.now() - newStartTime) / 1000).toFixed(2));
      }, 100);
  };

  const handleChange = (e) => {
      const value = e.target.value;
      setUserInput(value);

      // Check for errors
      if (sampleText.startsWith(value)) {
          setError('');
      } else {
          setError('❌ Typing mistake! Check your input.');
      }

      if (value === sampleText) {
          setTypingTime(elapsedTime);
          clearInterval(timerRef.current);
      }
  };

  useEffect(() => {
      return () => clearInterval(timerRef.current);
  }, []);

  return (
      <div className="container">
          <h1 className="title">Typing Speed Tester 🚀</h1>
          <div className="header">
              <p className="instructions">Type the following sentence:</p>
              {startTime && (
                  <div className="timer">⏱ Time: {elapsedTime} s</div>
              )}
          </div>
          <blockquote className="sample-text">
              {sampleText}
          </blockquote>
          <textarea
              ref={inputRef}
              className="input-box"
              rows="4"
              value={userInput}
              onChange={handleChange}
              placeholder="Start typing here..."
              disabled={typingTime !== null}
          />
          <button
              onClick={handleStart}
              className="start-button"
          >
              Start Typing Test
          </button>
          {error && <p className="error">{error}</p>}
          {typingTime !== null && (
              <p className="result">
                  You finished in <span className="time">{typingTime} seconds</span>!
              </p>
          )}
      </div>
  );
};

export default TypingSpeedTester;
