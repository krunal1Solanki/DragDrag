import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Button, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Header = ({ componentCount, updateCount, setComponentCount, setUpdateCount, getData, fetchCounter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    initialHeight: '',
    initialWidth: '',
    info: ''
  });

  useEffect(() => {
    console.log("CHANGED", updateCount, componentCount);
  }, [updateCount, componentCount]);

  const handleAddComponentClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleAddModalData = async () => {
    try {
      const info = await axios.post('https://enchanting-gaiters-fly.cyclic.app/api/addComponent', modalData);
      await fetchCounter();
      await getData();
      setIsModalOpen(false);
      // window.location.reload();
    } catch (error) {
      console.error("Error adding component:", error);
    }
  };

  return (
    <Flex align="center" justify="space-between" p="4" borderBottom="1px" borderColor="gray.200" bg="teal.500" color="white">
      <Heading as="h1" fontSize="xl">
        Data Neuron
      </Heading>
      <Flex align="center">
        <Button
          variant='filled'
          mr="4"
          colorScheme='orange'
          leftIcon={<FaPlus />}
          onClick={handleAddComponentClick}
        >
          Add Component
        </Button>
        <Box>
          <Badge colorScheme="gray" mr="2">{`Components: ${componentCount}`}</Badge>
          <Badge colorScheme="gray">{`Updations: ${updateCount}`}</Badge>
        </Box>
      </Flex>

      {/* Modal for Add Component */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent bg="teal.500" color="white">
          <ModalHeader>Add Component</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <FormControl>
              <FormLabel color="white">Height</FormLabel>
              <Input type="text" name="initialHeight" value={modalData.initialHeight} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt="4">
              <FormLabel color="white">Width</FormLabel>
              <Input type="text" name="initialWidth" value={modalData.initialWidth} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt="4">
              <FormLabel color="white">Info</FormLabel>
              <Input type="text" name="info" value={modalData.info} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="whiteAlpha" variant="outline" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button colorScheme="white" ml="2" onClick={handleAddModalData}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header;
