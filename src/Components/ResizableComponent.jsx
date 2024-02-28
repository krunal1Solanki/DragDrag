import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import '../App.css';

const ResizableComponent = ({ id, initialWidth, initialHeight, onUpdateSize, onUpdateContent, children }) => {
  // Ref to the resizable component
  const componentRef = useRef(null);

  // State variables for resizing logic
  const [resizing, setResizing] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialWidthState, setInitialWidth] = useState(initialWidth);
  const [initialHeightState, setInitialHeight] = useState(initialHeight);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  // State variables for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');

  // Effect for handling mouse move and mouse up events during resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;

        // Update only initialWidthState when resizing from the left side
        setWidth(Math.max(50, initialWidthState + deltaX));

        // Update both initialHeightState and height when resizing from the top side
        setHeight(Math.max(50, initialHeightState + deltaY));
      }
    };

    const handleMouseUp = () => {
      if (resizing) {
        setResizing(false);
        onUpdateSize(width, height);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, initialMouseX, initialMouseY, initialWidthState, initialHeightState, onUpdateSize, width, height]);

  // Function to handle mouse down event for resizing
  const handleMouseDown = (e) => {
    e.preventDefault();
    setResizing(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
    setInitialWidth(width);
    setInitialHeight(height);
  };

  // Functions to handle modal open, close, and content update
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewContent('');
  };

  const handleUpdateContent = () => {
    if (newContent.length >= 3) {
      onUpdateContent(id, newContent);
      setIsModalOpen(false);
    }
  };

  // Render the resizable component with resize handles, content, and update button
  return (
    <div ref={componentRef} className="resizable-component" style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="resize-handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
      <div className="resize-handle top" onMouseDown={(e) => handleMouseDown(e, 'top')}></div>
      <div className="resize-handle top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')}></div>
      <div className="resize-handle right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
      <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
      <div className="resize-handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
      <div className="resize-handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
      <div className="resize-handle left" onMouseDown={(e) => handleMouseDown(e, 'left')}></div>

      {/* Content */}
      <div className="content">
        {children}

        {/* Button to open modal */}
        <Button size="sm" onClick={handleOpenModal} position="absolute" top={2} right={2}>
          Update Content
        </Button>

        {/* Modal for updating content */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Content</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Input for entering new content */}
              <input
                type="text"
                placeholder="Enter new content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              {/* Buttons to close and update content in the modal */}
              <Button colorScheme="blue" onClick={handleCloseModal}>
                Close
              </Button>
              <Button colorScheme="green" onClick={handleUpdateContent} ml={3} isDisabled={newContent.length < 3}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ResizableComponent;
