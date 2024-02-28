import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const ResizableComponent = ({ id, initialWidth, initialHeight, children }) => {
  const componentRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;

        setWidth(initialWidth + deltaX);
        setHeight(initialHeight + deltaY);
      }
    };

    const handleMouseUp = () => {
      setResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, initialMouseX, initialMouseY, initialWidth, initialHeight]);

  const handleMouseDown = (e, direction) => {
    e.preventDefault();
    setResizing(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
  };

  return (
    <div
      ref={componentRef}
      className="resizable-component"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="resize-handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
      <div className="resize-handle top" onMouseDown={(e) => handleMouseDown(e, 'top')}></div>
      <div className="resize-handle top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')}></div>
      <div className="resize-handle right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
      <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
      <div className="resize-handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
      <div className="resize-handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
      <div className="resize-handle left" onMouseDown={(e) => handleMouseDown(e, 'left')}></div>

      <div className="content">{children}</div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="layout">
      <ResizableComponent id="component1" initialWidth={300} initialHeight={200}>
        Component 1
      </ResizableComponent>
      <ResizableComponent id="component2" initialWidth={200} initialHeight={300}>
        Component 2
      </ResizableComponent>
      <ResizableComponent id="component3" initialWidth={400} initialHeight={250}>
        Component 3
      </ResizableComponent>
    </div>
  );
};

const App = () => {
  return (
    <div className="wrapper">
      <Layout />
    </div>
  );
};

export default App;
