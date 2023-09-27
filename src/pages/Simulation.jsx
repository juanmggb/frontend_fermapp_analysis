import React from "react";
import styled from "styled-components";
import SidebarSimulation from "../components/simulation/SidebarSimulation";
import MainPanel from "../components/simulation/MainPanelSimulation";

const ContainerStyled = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SidebarStyled = styled.div`
  background-color: red;
  flex: 1;
  min-width: 300px;
`;

const MainPanelStyled = styled.div`
  background-color: #209c10;
  flex: 2;
  min-width: 400px;
`;

function Simulation() {
  return (
    <ContainerStyled>
      <SidebarStyled>
        <SidebarSimulation />
      </SidebarStyled>

      <MainPanelStyled>
        <MainPanel />
      </MainPanelStyled>
    </ContainerStyled>
  );
}

export default Simulation;
