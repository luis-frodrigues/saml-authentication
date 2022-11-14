import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Flex, VStack, Box, Text } from "@chakra-ui/react";
import { useAuth } from "./hooks/useAuth.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SuccessPage } from "./pages/Success.tsx";

/*function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}*/

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Box />;
  }

  const TopPage = () => (
    <Flex justify={"center"}>
      <VStack h={500} justify='center' spacing={8}>
        <Text fontSize='5xl'>Cognito Test</Text>
        <Text fontSize={"3xl"}>
          {auth.isAuthenticated ? "STATUS: LOGIN" : "STATUS: NOT LOGIN"}
        </Text>
        <Link to='/signin'>
          <Text fontSize={"2xl"}>Login NOVA</Text>
        </Link>
      </VStack>
    </Flex>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='success' element={<SuccessPage />}></Route>
        <Route path='*' element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
