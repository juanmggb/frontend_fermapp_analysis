import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import { Table } from "react-bootstrap";

const MainPanelContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: 0px; */
  /* height: 100%; */
  padding: 10px;
  max-width: 100%;
`;

// const TableDataStyled = styled(Table)`
//   width: 50%;
// `;

const PlotContainerStyled = styled.div`
  flex: 1;
  /* width: 800px; */
  min-width: 80%;
  max-width: 100%;
  height: 500px;
  text-align: center;
`;

const LAYOUT = {
  title: "Simulation Data",
  xaxis: {
    title: "Time (h)",
  },
  yaxis: {
    title: "Concentration (g/L)",
  },
};

function MainPanel() {
  const simulationData = useSelector((state) => state.simulationData);
  const { loading, simulation, error } = simulationData;

  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    if (loading) {
      // Loading toast (useful for async operations)
      toast.loading("Performing simulation");
    }

    if (error) {
      toast.dismiss();
      toast.error("Error during simulation");
    }

    if (simulation) {
      toast.remove();
      setPlotData([
        {
          x: simulation.time,
          y: simulation.x,
          type: "scatter",
          mode: "lines",
          name: "Biomass",
          marker: { color: "blue" },
        },
        {
          x: simulation.time,
          y: simulation.s,
          type: "scatter",
          mode: "lines",
          name: "Substrate",
          marker: { color: "red" },
        },
        {
          x: simulation.time,
          y: simulation.p,
          type: "scatter",
          mode: "lines",
          name: "Product",
          marker: { color: "green" },
        },
      ]);
    }
  }, [loading, error, simulation]);

  return (
    <MainPanelContainerStyled>
      <PlotContainerStyled>
        <Plot data={plotData} layout={LAYOUT} />
      </PlotContainerStyled>
    </MainPanelContainerStyled>
  );
}

export default MainPanel;
