import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const ResizableComponent = ({ id, initialWidth, initialHeight, children }) => {
  const componentRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialWidthState, setInitialWidth] = useState(initialWidth);
  const [initialHeightState, setInitialHeight] = useState(initialHeight);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;

        setWidth(Math.max(50, initialWidthState + deltaX));
        setHeight(Math.max(50, initialHeightState + deltaY));
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
  }, [resizing, initialMouseX, initialMouseY, initialWidthState, initialHeightState]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setResizing(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
    setInitialWidth(width);
    setInitialHeight(height);
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
  const [components, setComponents] = useState([
    { id: 'component1', initialWidth: 300, initialHeight: 200, content: 'Component 1' },
    { id: 'component2', initialWidth: 200, initialHeight: 300, content: 'Component 2' },
    { id: 'component3', initialWidth: 400, initialHeight: 250, content: 'Component 3' },
  ]);

  const addComponent = () => {
    const newComponent = {
      id: `component${components.length + 1}`,
      initialWidth: 200,
      initialHeight: 150,
      content: `Component ${components.length + 1}`,
    };

    setComponents([...components, newComponent]);
  };

  const renderComponents = () => {
    const rows = [];
    for (let i = 0; i < components.length; i += 2) {
      const rowComponents = components.slice(i, i + 2);
      const row = (
        <div key={`row${i}`} className="row">
          {rowComponents.map((component) => (
            <ResizableComponent
              key={component.id}
              id={component.id}
              initialWidth={component.initialWidth}
              initialHeight={component.initialHeight}
            >
              {component.content}
            </ResizableComponent>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <div className="layout">
      {renderComponents()}
      <button onClick={addComponent}>Add Component</button>
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
