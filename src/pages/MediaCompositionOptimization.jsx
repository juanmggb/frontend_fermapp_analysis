import { useState } from "react";
import styled from "styled-components";
import SidebarMediaCompositionOptimization from "../components/MediaCompositionOptimization/SidebarMediaCompositionOptimization";
import MainPanelMediaCompositionOptimization from "../components/MediaCompositionOptimization/MainPanelMediaCompositionOptimization";
import { MCDataContext } from "../lib/contexts/MCDataContext";

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

const getMCData = () => {
  const experimentalMCData =
    JSON.parse(localStorage.getItem("experimentalMCData")) || null;
  if (!experimentalMCData)
    return {
      experimentalMCData: {},
      xAxisVar: "",
      yAxisVar: "",
      zAxisVar: "",
    };

  const columnNames = Object.keys(experimentalMCData);

  return {
    experimentalMCData,
    xAxisVar: columnNames[0],
    yAxisVar: columnNames[1],
    zAxisVar: columnNames[2],
  };
};

const MediaCompositionOptimization = () => {
  const [MCData, setMCData] = useState(getMCData);

  const handleChangeAxisVariable = (dimAxisVar, variableName) => {
    setMCData((prevMCData) => ({
      ...prevMCData,
      [dimAxisVar]: variableName,
    }));
  };

  return (
    <ContainerStyled>
      <MCDataContext.Provider
        value={{ ...MCData, setMCData, handleChangeAxisVariable }}
      >
        <SidebarStyled>
          <SidebarMediaCompositionOptimization />
        </SidebarStyled>

        <MainPanelStyled>
          <MainPanelMediaCompositionOptimization />
        </MainPanelStyled>
      </MCDataContext.Provider>
    </ContainerStyled>
  );
};
export default MediaCompositionOptimization;
