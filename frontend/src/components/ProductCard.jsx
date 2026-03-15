import React from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { deleteProduct, updatedProduct } = useProductStore();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    upDateProduct(pid, updatedProduct);
  };
  const [upDateProduct, setupDateProduct] = useState(product);
  const textcolor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  console.log(product);

  const toast = useToast();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={"full"}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textcolor} mb={"4"}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme={"red"}
          />
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <VStack spacing={4}>
                <ModalHeader>Update Product</ModalHeader>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={upDateProduct.name}
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={upDateProduct.image}
                />
                <Input
                  placeholder="Product Price"
                  name="price"
                  type="number"
                  value={upDateProduct.price}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleUpdateProduct(product._id, upDateProduct)}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default ProductCard;
