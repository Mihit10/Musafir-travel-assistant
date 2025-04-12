"use client";
import { useRef, useState, useEffect } from 'react';

const IndiaMandala = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Set to true initially to show on load
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  
  // Custom hook for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Determine scroll direction
      if (currentScrollPos > lastScrollTop) {
        setScrollDirection('down');
      } else if (currentScrollPos < lastScrollTop) {
        setScrollDirection('up');
      }
      
      setLastScrollTop(currentScrollPos);
      setScrollPosition(currentScrollPos);
      
      // Check if section is visible
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visibility threshold - fade out when scrolling past 20% of the section
        const visibilityThreshold = viewportHeight * 0.2;
        
        // Gradually change opacity based on scroll position
        if (rect.top <= viewportHeight && rect.bottom >= 0) {
          if (rect.top <= -visibilityThreshold) {
            // Scrolling down - start fading out
            setIsVisible(false);
          } else {
            // Scrolling up or section is in view - fade in
            setIsVisible(true);
          }
        }
      }
    };

    // After 1 second, show the input field
    const timer = setTimeout(() => {
      setShowInput(true);
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollTop]);

  // Calculate movement based on scroll position
  const calculateMovement = (baseDistance: number, direction: number) => {
    const moveAmount = Math.min(baseDistance * (scrollPosition / 1000), baseDistance);
    return moveAmount * direction;
  };
  
  return (
    <div 
      ref={sectionRef}
      className="mandala-section w-full h-full absolute"
    >
      <div className="mandala-container w-full h-full">
        <div className={`mandala-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
          {/* Mandala Background Circle */}
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <img 
              src="/mand.png" 
              alt="Mandala Design" 
              className="scale-[1.8] object-cover"
            />
          </div>

  
          
          {/* Input Box */}
          <div 
            className={`mandala-input ${isVisible ? 'visible' : 'hidden'} ${showInput ? 'show' : ''}`}
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

          {/* Peacock 1 - Top Left */}
          <div 
            className={`mandala-component peacock-left ${isVisible ? 'visible' : 'hidden'}`}
            style={{
                transform: `translate(-30px, -80px) translate(${calculateMovement(100, -1)}px, ${calculateMovement(20, -1)}px)`
            }}
          >
            <div className="component-image-container">
              <img 
                src="/p2.gif" 
                alt="Peacock" 
                className="component-image"
              />
            </div>
          </div>
          
          {/* Peacock 2 - Top Right */}
          <div 
            className={`mandala-component peacock-right ${isVisible ? 'visible' : 'hidden'}`}
            style={{
               transform: `translate(-82px, -80px) translate(${calculateMovement(100, -1)}px, ${calculateMovement(20, -1)}px)`
            }}
          >
            <div className="component-image-container">
              <img 
                src="/p1.gif" 
                alt="Peacock"
                style={{ width: '150px', height: '150px' }}
                className="component-image"
              />
            </div>
          </div>
          
          {/* Elephant 1 - Bottom Right */}
          <div 
            className={`mandala-component elephant-right ${isVisible ? 'visible' : 'hidden'}`}
            style={{
              transform: `translate(${calculateMovement(60, 1)}px, ${calculateMovement(60, 1)}px)`
            }}
          >
            <div className="component-image-container">
              <img 
                src="/e1.gif" 
                alt="Elephant" 
                className="component-image elephant-image"
              />
            </div>
          </div>
          
          {/* Elephant 2 - Bottom Left */}
          <div 
            className={`mandala-component elephant-left ${isVisible ? 'visible' : 'hidden'}`}
            style={{
              transform: `translate(${calculateMovement(60, -1)}px, ${calculateMovement(60, 1)}px)`
            }}
          >
            <div className="component-image-container">
              <img 
                src="/ele2.gif" 
                alt="Elephant" 
                className="component-image elephant-image"
              />
            </div>
          </div>
          
          {/* Fort - Bottom */}
          <div 
            className={`mandala-component component-bottom ${isVisible ? 'visible' : 'hidden'}`}
            style={{
              transform: `translateY(${calculateMovement(70, 1)}px)`
            }}
          >
            <div className="component-image-container">
              <img 
                src="/fort.png" 
                alt="Fort" 
                className="component-image"
              />
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
          width: 95vmin;
          height: 95vmin;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .mandala-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mandala-wrapper.hidden {
          opacity: 0;
          transform: translateY(-30px);
        }
        
        .mandala-circle {
          position: absolute;
          inset: 0;
          background-color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .mandala-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .mandala-gateway {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .mandala-gateway.visible {
          opacity: 1;
        }
        
        .mandala-gateway.hidden {
          opacity: 0;
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
          width: 70%;
          max-width: 500px;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .mandala-title.visible {
          opacity: 1;
        }
        
        .mandala-title.hidden {
          opacity: 0;
        }
        
        .mandala-title.move-up {
          transform: translate(-50%, calc(-50% - 60px));
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
          width: 85%;
          max-width: 500px;
          opacity: 0;
          scale: 0.8;
          transition: opacity 0.7s ease, transform 0.7s ease, scale 0.7s ease;
        }
        
        .mandala-input.show {
          opacity: 1;
          scale: 1;
          transition-delay: 1.0s;
        }
        
        .mandala-input.hidden {
          opacity: 0;
        }
        
        .input-container {
          position: relative;
          margin-top: 80px;
        }
        
        .prompt-input {
          width: 100%;
          padding: 18px 18px 18px 28px;
          padding-right: 60px;
          border-radius: 9999px;
          box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.15), 0 6px 8px -2px rgba(0, 0, 0, 0.08);
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          border: 3px solid rgba(128, 0, 128, 0.2);
          outline: none;
          color: #4a5568;
          font-size: 18px;
          transition: border-color 0.3s ease;
        }
        
        .prompt-input::placeholder {
          color: #a0aec0;
        }
        
        .prompt-input:focus {
          border-color: rgba(255, 140, 0, 0.6);
        }
        
        .submit-button {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #800080;
          color: white;
          padding: 10px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .submit-button:hover {
          background-color: #FF8C00;
        }
        
        .button-icon {
          height: 24px;
          width: 24px;
        }
        
        .scroll-spacer {
          height: 150vh;
        }
        
        /* Component styles */
        .mandala-component {
          position: absolute;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .mandala-component.visible {
          opacity: 1;
        }
        
        .mandala-component.hidden {
          opacity: 0;
        }
        
        .component-image-container {
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .component-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .elephant-image {
          transform: scale(1.8);
        }
        
        /* Position the components around the circle to match description */
        .peacock-left {
          top: 10%;
          left: 40%;
          transform: translateX(-50%);
        }
        
        .peacock-right {
          top: 10%;
          left: 60%;
          transform: translateX(-50%);
        }
        
        .elephant-left {
          bottom: 15%;
          left: 15%;
        }
        
        .elephant-right {
          bottom: 15%;
          right: 15%;
        }
        
        .component-bottom {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        
        /* For smooth transitions based on scroll direction */
        @media (prefers-reduced-motion: no-preference) {
          .mandala-wrapper,
          .mandala-component,
          .mandala-gateway,
          .mandala-title,
          .mandala-input {
            transition-duration: 0.8s;
          }
        }
      `}</style>
    </div>
  );
};

export default IndiaMandala;