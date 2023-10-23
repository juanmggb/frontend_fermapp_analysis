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
  background-color: #00aeff;
  flex: 1;
  min-width: 300px;
`;

const MainPanelStyled = styled.div`
  background-color: #0a4490ee;
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
