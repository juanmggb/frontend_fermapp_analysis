import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-hot-toast";

const MainPanelContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  height: 100%;
  padding-right: 0;
`;

const PlotFrameStyled = styled.iframe`
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  max-width: 100%;
  width: 100%; // Add this
  min-height: 500px;
  height: 100%;
  margin-right: 0;
`;

function MainPanel() {
  const simulationPlot = useSelector((state) => state.simulationPlot);
  const { loading: plotLoading, plot, error: plotError } = simulationPlot;

  const [plotUrl, setPlotUrl] = useState("");

  useEffect(() => {
    if (plotLoading) {
      // Loading toast (useful for async operations)
      toast.loading("Performing simulation");
    }

    if (plotError) {
      toast.dismiss();
      toast.error("Error during simulation");
    }

    if (plot) {
      toast.remove();
      setPlotUrl(plot.simulation_url);
    }
  }, [plotLoading, plotError, plot]);

  return plotUrl ? (
    <MainPanelContainerStyled>
      <PlotFrameStyled src={plotUrl} />
    </MainPanelContainerStyled>
  ) : (
    <h1>There is no plot yet</h1>
  );
}

export default MainPanel;
