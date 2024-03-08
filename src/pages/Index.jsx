import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, useToast, Heading, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-fo0x.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { accessToken, role } = await response.json();

      // Store the accessToken in local storage or context for subsequent API calls
      localStorage.setItem("accessToken", accessToken);

      // Redirect the user based on their role
      if (role === "Superadmin") {
        // Redirect to Superadmin dashboard
      } else if (role === "MerchantAdmin") {
        // Redirect to Merchant Admin dashboard
      } else {
        // Handle other roles or show an error
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" mx="auto">
        <Heading as="h1" mb={6}>
          POS System Login
        </Heading>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" width="full" mt={4} onClick={handleLogin}>
            Sign In
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
