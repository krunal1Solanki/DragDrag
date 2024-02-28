import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import '../App.css';

const ResizableComponent = ({ id, initialWidth, initialHeight, onUpdateSize, onUpdateContent, children }) => {
  const componentRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialWidthState, setInitialWidth] = useState(initialWidth);
  const [initialHeightState, setInitialHeight] = useState(initialHeight);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');

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
      if (resizing) {
        setResizing(false);
        onUpdateSize(width, height);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, initialMouseX, initialMouseY, initialWidthState, initialHeightState, onUpdateSize, width, height]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setResizing(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
    setInitialWidth(width);
    setInitialHeight(height);
  };

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

  return (
    <div ref={componentRef} className="resizable-component" style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="resize-handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
      <div className="resize-handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
      <div className="resize-handle top" onMouseDown={(e) => handleMouseDown(e, 'top')}></div>
      <div className="resize-handle top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')}></div>
      <div className="resize-handle right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
      <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
      <div className="resize-handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
      <div className="resize-handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
      <div className="resize-handle left" onMouseDown={(e) => handleMouseDown(e, 'left')}></div>

      <div className="content">
        {children}
        <Button size="sm" onClick={handleOpenModal} position="absolute" top={2} right={2}>
          Update Content
        </Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Content</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <input
                type="text"
                placeholder="Enter new content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
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
