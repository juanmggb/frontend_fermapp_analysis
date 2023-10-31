import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import styled from "styled-components";
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

const PlotContainerStyled = styled.div`
  flex: 1;
  /* width: 800px; */
  min-width: 80%;
  max-width: 100%;
  height: 500px;
  text-align: center;
`;

const LAYOUT = {
  title: "Experimental data",
  xaxis: {
    title: "Time (h)",
  },
  yaxis: {
    title: "Concentration (g/L)",
  },
};

function MainPanelOptimization({ experimentalData }) {
  const parameterOptimization = useSelector(
    (state) => state.parameterOptimization
  );
  const { loading, simulatedData, model_type, error } = parameterOptimization;

  useEffect(() => {
    let toastId;
    if (loading) {
      toastId = toast.loading("Peforming parameter estimation");
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error("An error ocurred when performing paramter estimation");
    }

    if (simulatedData) {
      toast.dismiss(toastId);
      toast.success("Parameter Estimation Performed Successfully");
    }
  }, [loading, error, simulatedData]);

  return (
    <MainPanelContainerStyled>
      <PlotContainerStyled>
        <Plot
          data={getPlotExperimentalData(experimentalData)}
          layout={LAYOUT}
        />

        {simulatedData && (
          <Plot
            data={getCombinedPlotData(experimentalData, simulatedData)}
            layout={{
              ...LAYOUT,
              title: `Experimental Data and Simulation with Optimal Parameters using ${model_type} Model`,
            }}
          />
        )}
      </PlotContainerStyled>
    </MainPanelContainerStyled>
  );
}
const getPlotExperimentalData = (data) => {
  const plotData = [
    {
      x: data.t,
      y: data.x,
      type: "scatter",
      mode: "markers",
      name: "X vs t",
      marker: { color: "blue" },
    },
    {
      x: data.t,
      y: data.s,
      type: "scatter",
      mode: "markers",
      name: "S vs t",
      marker: { color: "red" },
    },
    {
      x: data.t,
      y: data.p,
      type: "scatter",
      mode: "markers",
      name: "P vs t",
      marker: { color: "green" },
    },
  ];

  return plotData;
};

export default MainPanelOptimization;

const getCombinedPlotData = (experimentalData, simulatedData) => {
  const experimentalPlotData = [
    {
      x: experimentalData.t,
      y: experimentalData.x,
      type: "scatter",
      mode: "markers",
      name: "Experimental X vs t",
      marker: { color: "blue" },
    },
    {
      x: experimentalData.t,
      y: experimentalData.s,
      type: "scatter",
      mode: "markers",
      name: "Experimental S vs t",
      marker: { color: "red" },
    },
    {
      x: experimentalData.t,
      y: experimentalData.p,
      type: "scatter",
      mode: "markers",
      name: "Experimental P vs t",
      marker: { color: "green" },
    },
  ];

  const simulatedPlotData = [
    {
      x: simulatedData.t,
      y: simulatedData.x,
      type: "scatter",
      mode: "lines",
      name: "Simulated X vs t",
      line: { color: "blue", dash: "dot" },
    },
    {
      x: simulatedData.t,
      y: simulatedData.s,
      type: "scatter",
      mode: "lines",
      name: "Simulated S vs t",
      line: { color: "red", dash: "dot" },
    },
    {
      x: simulatedData.t,
      y: simulatedData.p,
      type: "scatter",
      mode: "lines",
      name: "Simulated P vs t",
      line: { color: "green", dash: "dot" },
    },
  ];

  return [...experimentalPlotData, ...simulatedPlotData];
};
