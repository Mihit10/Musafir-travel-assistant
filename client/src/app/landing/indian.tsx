"use client";
import { useRef, useState, useEffect } from 'react';

const IndiaMandala = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);

  // Custom hook for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollPosition(currentScrollPos);
      
      // Check if section is visible
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };

    // After 2 seconds, show the input field
    const timer = setTimeout(() => {
      setShowInput(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Calculate movement based on scroll position
  const calculateMovement = (baseDistance, direction) => {
    const moveAmount = Math.min(baseDistance * (scrollPosition / 1000), baseDistance);
    return moveAmount * direction;
  };

  return (
    <div 
      ref={sectionRef}
      className="mandala-section"
    >
      <div className="mandala-container">
        <div className={`mandala-wrapper ${isVisible ? 'visible' : ''}`}>
          {/* Mandala Background Circle */}
          <div className="mandala-circle">
            <img 
              src="/lovable-uploads/9651e3c1-aa2d-4410-a418-bb7952cd6176.png" 
              alt="Mandala Design" 
              className="mandala-img"
            />
          </div>
          
          {/* Gateway of India at bottom */}
          <div 
            className={`mandala-gateway ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translateY(${calculateMovement(50, 1)}px)`
            }}
          >
            <img 
              src="/lovable-uploads/900572fb-898e-4ec0-99ec-6128b0f38c09.png" 
              alt="Gateway of India" 
              className="gateway-img"
            />
          </div>
          
          {/* India Title */}
          <div 
            className={`mandala-title ${isVisible ? 'visible' : ''} ${showInput ? 'move-up' : ''}`}
          >
            <img 
              src="/lovable-uploads/543318f1-fed1-41c2-bfc9-5ecd884f58c3.png" 
              alt="India" 
              className="india-title-img"
            />
          </div>
          
          {/* Input Box */}
          <div 
            className={`mandala-input ${isVisible ? 'visible' : ''} ${showInput ? 'show' : ''}`}
          >
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your prompt here..."
                className="prompt-input"
              />
              <button 
                className="submit-button"
                onClick={() => console.log('Prompt submitted:', inputValue)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Seven components around the mandala circle */}
          {/* Component 1 - Top */}
          <div 
            className={`mandala-component component-top ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translateY(${calculateMovement(100, -1)}px)`
            }}
          >
            <div className="component-circle">
              <span>1</span>
            </div>
          </div>
          
          {/* Component 2 - Top Right */}
          <div 
            className={`mandala-component component-top-right ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translate(${calculateMovement(70, 1)}px, ${calculateMovement(70, -1)}px)`
            }}
          >
            <div className="component-circle">
              <span>2</span>
            </div>
          </div>
          
          {/* Component 3 - Right */}
          <div 
            className={`mandala-component component-right ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translateX(${calculateMovement(100, 1)}px)`
            }}
          >
            <div className="component-circle">
              <span>3</span>
            </div>
          </div>
          
          {/* Component 4 - Bottom Right */}
          <div 
            className={`mandala-component component-bottom-right ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translate(${calculateMovement(70, 1)}px, ${calculateMovement(70, 1)}px)`
            }}
          >
            <div className="component-circle">
              <span>4</span>
            </div>
          </div>
          
          {/* Component 5 - Bottom Left */}
          <div 
            className={`mandala-component component-bottom-left ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translate(${calculateMovement(70, -1)}px, ${calculateMovement(70, 1)}px)`
            }}
          >
            <div className="component-circle">
              <span>5</span>
            </div>
          </div>
          
          {/* Component 6 - Left */}
          <div 
            className={`mandala-component component-left ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translateX(${calculateMovement(100, -1)}px)`
            }}
          >
            <div className="component-circle">
              <span>6</span>
            </div>
          </div>
          
          {/* Component 7 - Top Left */}
          <div 
            className={`mandala-component component-top-left ${isVisible ? 'visible' : ''}`}
            style={{
              transform: `translate(${calculateMovement(70, -1)}px, ${calculateMovement(70, -1)}px)`
            }}
          >
            <div className="component-circle">
              <span>7</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer to ensure scroll functionality */}
      <div className="scroll-spacer"></div>

      <style jsx>{`
        .mandala-section {
          min-height: 150vh;
          position: relative;
          overflow: hidden;
        }
        
        .mandala-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .mandala-wrapper {
          position: relative;
          width: 90vmin;
          height: 90vmin;
          opacity: 0;
          transform: translateY(-50px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .mandala-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mandala-circle {
          position: absolute;
          inset: 0;
          background-color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .mandala-wrapper.visible .mandala-circle {
          opacity: 1;
          transform: scale(1);
          transition-delay: 0s;
        }
        
        .mandala-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .mandala-gateway {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .mandala-gateway.visible {
          opacity: 1;
          transition-delay: 0.6s;
        }
        
        .gateway-img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .mandala-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          max-width: 400px;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .mandala-title.visible {
          opacity: 1;
          transition-delay: 0.8s;
        }
        
        .mandala-title.move-up {
          transform: translate(-50%, calc(-50% - 50px));
        }
        
        .india-title-img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .mandala-input {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 400px;
          opacity: 0;
          scale: 0.8;
          transition: opacity 0.6s ease, transform 0.6s ease, scale 0.6s ease;
        }
        
        .mandala-input.show {
          opacity: 1;
          scale: 1;
          transition-delay: 2.2s;
        }
        
        .input-container {
          position: relative;
          margin-top: 64px;
        }
        
        .prompt-input {
          width: 100%;
          padding: 16px 16px 16px 24px;
          padding-right: 48px;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: 2px solid rgba(128, 0, 128, 0.2);
          outline: none;
          color: #4a5568;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        
        .prompt-input::placeholder {
          color: #a0aec0;
        }
        
        .prompt-input:focus {
          border-color: rgba(255, 140, 0, 0.5);
        }
        
        .submit-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #800080;
          color: white;
          padding: 8px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .submit-button:hover {
          background-color: #FF8C00;
        }
        
        .button-icon {
          height: 20px;
          width: 20px;
        }
        
        .scroll-spacer {
          height: 150vh;
        }
        
        /* Component styles */
        .mandala-component {
          position: absolute;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .mandala-component.visible {
          opacity: 1;
        }
        
        .component-circle {
          width: 60px;
          height: 60px;
          background-color: rgba(255, 140, 0, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        /* Position the components around the circle */
        .component-top {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          transition-delay: 0.3s;
        }
        
        .component-top-right {
          top: 15%;
          right: 15%;
          transition-delay: 0.4s;
        }
        
        .component-right {
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          transition-delay: 0.5s;
        }
        
        .component-bottom-right {
          bottom: 15%;
          right: 15%;
          transition-delay: 0.6s;
        }
        
        .component-bottom-left {
          bottom: 15%;
          left: 15%;
          transition-delay: 0.7s;
        }
        
        .component-left {
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          transition-delay: 0.8s;
        }
        
        .component-top-left {
          top: 15%;
          left: 15%;
          transition-delay: 0.9s;
        }
      `}</style>
    </div>
  );
};

export default IndiaMandala;