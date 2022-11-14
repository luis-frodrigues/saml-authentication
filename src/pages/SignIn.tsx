//import { Flex } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import {
  Stack,
  Flex,
  Input,
  VStack,
  Box,
  FormLabel,
  Spacer,
  Button,
} from "@chakra-ui/react";

export function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await auth.signIn(username, password);
    if (result.success) {
      navigate({ pathname: "/success" });
    } else {
      alert(result.message);
    }
  };
  const executeFederatedSignIn = async () => {
    const result = await auth
      .federatedSignIn()
      .then((credentials) => {
        console.log(credentials);
      })
      .catch((response) => {
        console.log(response);
      });
    alert(result.message);
  };

  return (
    <Flex justify={"center"}>
      <VStack h={500} justify='center'>
        <form noValidate onSubmit={executeSignIn}>
          <Box>
            <FormLabel htmlFor='username'>User Name</FormLabel>
            <Spacer height='10px' />
            <Input
              type='text'
              placeholder='UserID'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size='lg'
            />
          </Box>
          <Spacer height='20px' />
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size='lg'
          />
          <Spacer height='35px' />
          <Stack align='center'>
            <Button type='submit' colorScheme='teal' size='lg'>
              Login
            </Button>
          </Stack>
          <Spacer height='35px' />
          <Stack align='center'>
            <Button
              colorScheme='teal'
              size='lg'
              onClick={executeFederatedSignIn}
            >
              Login NOVA
            </Button>
          </Stack>
        </form>
      </VStack>
    </Flex>
  );
}
