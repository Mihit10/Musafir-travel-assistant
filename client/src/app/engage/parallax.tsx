import { useState, useEffect, useRef } from "react";

type ParallaxScrollProps = {
    images: string[];
  };
  
  const ParallaxScroll: React.FC<ParallaxScrollProps> = ({ images }) => {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);
  
  // Create three rows with different scroll speeds
  const rows = [
    { images: images.slice(0, Math.min(5, images.length)), speed: 20, direction: 1 },
    { images: [...images].reverse().slice(0, Math.min(5, images.length)), speed: 30, direction: -1 },
    { images: images.slice(0, Math.min(5, images.length)), speed: 25, direction: 1 }
  ];
  
  useEffect(() => {
    const scrollContainers = document.querySelectorAll('.scroll-container');
    let animationFrameId: number;

    let positions = Array(scrollContainers.length).fill(0);
    
    const animate = () => {
        if (!isHovering) {
          scrollContainers.forEach((container, index) => {
            const { direction, speed } = rows[index];
            positions[index] += (0.2 * speed * direction) / 60;
    
            const containerWidth = container.scrollWidth / 2;
            if (Math.abs(positions[index]) >= containerWidth) {
              positions[index] = 0;
            }
    
            (container as HTMLElement).style.transform = `translateX(${positions[index]}px)`;
          });
        }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, rows]);
  
  return (
    <div 
      className="overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="py-4">
          <div className="scroll-container flex relative">
            {/* First set of images */}
            {row.images.map((image, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-3 w-72 h-48 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={image}
                  alt={`Parallax image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {row.images.map((image, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-3 w-72 h-48 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={image}
                  alt={`Parallax image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParallaxScroll;