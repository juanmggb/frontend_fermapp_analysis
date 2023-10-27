import React, { useState } from "react";
import styled from "styled-components";
// import SidebarSimulation from "../components/SidebarSimulation";
// import MainPanel from "../components/MainPanelSimulation";

import SidebarOptimization from "../components/optimization/SidebarOptimization";
import MainPanelOptimization from "../components/optimization/MainPanelOptimization";
import { ExperimentalDataContect } from "../lib/contexts/ExperimentalDataContext";

const ContainerStyled = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: start; */
`;

const SidebarStyled = styled.div`
  background-color: red;
  flex: 1;
  min-width: 300px;
  /* max-width: 400px; */
  /* height: 100%; */
`;

const MainPanelStyled = styled.div`
  background-color: #209c10;
  flex: 2;
  min-width: 710px;
  /* height: 100%; */
`;

function Optimization() {
  const [experimentalData, setExperimentalData] = useState([]);

  return (
    <ContainerStyled>
      <ExperimentalDataContect.Provider
        value={{ experimentalData, setExperimentalData }}
      >
        <SidebarStyled>
          <SidebarOptimization />
        </SidebarStyled>

        <MainPanelStyled>
          <MainPanelOptimization />
        </MainPanelStyled>
      </ExperimentalDataContect.Provider>
    </ContainerStyled>
  );
}

export default Optimization;
