import React from "react";
import PrivateRoute from "../components/PrivateRoute.tsx";
import { Button, VStack, Box, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth.tsx";

export function SuccessPage() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Box />;
  }
  console.log(auth.user);

  return (
    <PrivateRoute>
      <VStack h={500} justify='center' spacing={8}>
        <Text fontSize='5xl'>Welcome {auth.username}!!</Text>
        <Text fontSize='4xl'>Login Succeed🎉</Text>
        <Button colorScheme='teal' size='lg' onClick={() => auth.signOut()}>
          Log out
        </Button>
      </VStack>
    </PrivateRoute>
  );
}
