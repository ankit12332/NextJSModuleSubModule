import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
// Importing CSS for TreeView

function TreeView({ node, onToggle ,onSubmoduleSelect }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const springProps = useSpring({
        to: {
          maxHeight: isOpen ? 500 : 0, // Adjust the max height to fit your content
          opacity: isOpen ? 1 : 0,
        },
        from: {
          maxHeight: 0,
          opacity: 0,
        },
        config: {
          tension: 170, // Reduced tension for a softer spring effect
          friction: 40, // Increased friction for a slower motion
          mass: 1, // Adjust mass for the heaviness
          duration: 800, // Duration of the animation in milliseconds
        }
      });
  
    const handleToggle = () => {
        if (node.submodules && node.submodules.length > 0) {
          setIsOpen(!isOpen);
          if (onToggle) {
            onToggle();
          }
        }
      };
      
      const handleSubmoduleClick = (submodule) => {
        if (onSubmoduleSelect) {
            onSubmoduleSelect(submodule);
        }
    };

    // Only show icon if there are submodules
    const showIcon = node.submodules && node.submodules.length > 0;
  
    // Choose icon based on isOpen state
    const icon = isOpen ? '▼' : '▶'; // Unicode characters for triangles

    return (
        <div className=" ml-1 tree-view">
        <div className="node-title" onClick={handleToggle}>
          <span className="title-text">{node.name}</span>
          {showIcon && <span className="icon">{icon}</span>} {/* Icon conditionally rendered */}
        </div>
        <animated.div style={springProps} className="submodules">
          {isOpen && node.submodules && node.submodules.map((submodule, index) => (
            <div key={index} onClick={() => handleSubmoduleClick(submodule)}>
              <TreeView key={index} node={submodule} />
            </div>
          ))}
        </animated.div>
      </div>
    );
  }
  

export default TreeView;
