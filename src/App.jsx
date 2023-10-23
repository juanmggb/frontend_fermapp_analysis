import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";
import Header from "./components/Header";
import Optimization from "./pages/Optimization";
import Visualization from "./pages/Visualization";
import Ann from "./pages/Ann";
import styled from "styled-components";
import Users from "./pages/Users";
import { Toaster } from "react-hot-toast";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Account from "./pages/Account";

const ContainerStyled = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 95vh;

  grid-template-areas:
    "header"
    "content";
`;

const HeaderStyled = styled.div`
  grid-area: header;
`;

const ContentStyled = styled.div`
  grid-area: content;
  background-color: lightblue;
  color: white;
`;

function App() {
  const loginUser = useSelector((state) => state.loginUser);

  const { userInfo } = loginUser;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userInfo]);

  console.log(isAuthenticated, userInfo);

  return (
    <ContainerStyled>
      <Toaster />
      <BrowserRouter>
        <HeaderStyled>
          <Header />
        </HeaderStyled>
        <ContentStyled>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/simulation" element={<Simulation />} />
                <Route path="/optimization" element={<Optimization />} />
                <Route path="/visualization" element={<Visualization />} />
                <Route path="/ann" element={<Ann />} />
                <Route path="/users" element={<Users />} />
                <Route path="/create-user" element={<CreateUser />} />
              </>
            ) : (
              <Route path="/login" element={<Login />} />
            )}
          </Routes>
        </ContentStyled>
      </BrowserRouter>
    </ContainerStyled>
  );
}

export default App;
