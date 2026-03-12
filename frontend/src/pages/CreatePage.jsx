import {
  Box,
  Button,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: 0,
  });

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" fontSize={"2xl"} textAlign={"center"} mb={8} mt={20}>
          Create a new product
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={5}>
            <Input
              type="text"
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Product image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Product price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
