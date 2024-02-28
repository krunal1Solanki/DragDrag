// Header.js

import React from 'react';
import { Box, Flex, Heading, Button, Badge } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const Header = ({ counter, onAddComponentClick }) => {
  return (
    <Flex align="center" justify="space-between" p="4" borderBottom="1px" borderColor="gray.200">
      <Heading as="h1" fontSize="xl">
        Assignment
      </Heading>
      <Box>
        <Button
          colorScheme="teal"
          variant="outline"
          mr="4"
          onClick={onAddComponentClick}
          leftIcon={<FaPlus />}
        >
          Add Component
        </Button>
        <Badge colorScheme="gray">{`Counter: ${counter}`}</Badge>
      </Box>
    </Flex>
  );
};

export default Header;
