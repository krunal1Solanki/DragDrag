// App.js

import React from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableBox = ({ width, height, onResize, children }) => (
  <Resizable
    width={width}
    height={height}
    onResize={onResize}
    draggableOpts={{ enableUserSelectHack: false }}
    resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']} // Enable all 8 handles
  >
    <Box
      width="100%"
      height="100%"
      border="1px solid #ddd"
      position="relative"
      overflow="hidden"
      resize="both"
    >
      {children}
    </Box>
  </Resizable>
);

const App = () => {
  const handleResize = (event, { size }) => {
    // Handle resizing logic here
    console.log(`Resized to width: ${size.width}, height: ${size.height}`);
  };

  return (
    <ChakraProvider>
      <Flex height="100vh" direction="row">
        <ResizableBox width={200} height={400} onResize={handleResize}>
          {/* Component content */}
          <p>Component 1</p>
        </ResizableBox>
        <ResizableBox width={200} height={400} onResize={handleResize}>
          {/* Component content */}
          <p>Component 2</p>
        </ResizableBox>
        <ResizableBox width={200} height={400} onResize={handleResize}>
          {/* Component content */}
          <p>Component 3</p>
        </ResizableBox>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
