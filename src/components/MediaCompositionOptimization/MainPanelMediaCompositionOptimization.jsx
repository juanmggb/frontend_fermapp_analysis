import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import { MCDataContext } from "../../lib/contexts/MCDataContext";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

const MainPanelMediaCompositionOptimization = () => {
  const { experimentalMCData, xAxisVar, yAxisVar, zAxisVar } =
    useContext(MCDataContext);

  const mediaCompOptimization = useSelector(
    (state) => state.mediaCompOptimization
  );
  const { response_surface } = mediaCompOptimization;

  console.log("response_surface", response_surface);

  return (
    <Row>
      <Col sm={5}>
        <Plot
          data={get3DPlotData(experimentalMCData, xAxisVar, yAxisVar, zAxisVar)}
          layout={{
            title: "3D Scatter plot",
            scene: {
              xaxis: { title: xAxisVar },
              yaxis: { title: yAxisVar },
              zaxis: { title: zAxisVar },
            },
            width: 700,
            height: 700,
          }}
        />
      </Col>

      {response_surface && (
        <Col sm={5}>
          <Plot
            data={getResponseSurfaceData(response_surface)}
            layout={{
              title: "Response Surface",
              scene: {
                xaxis: { title: xAxisVar },
                yaxis: { title: zAxisVar },
                zaxis: { title: yAxisVar }, // Assuming the y-axis of the surface corresponds to your yAxisVar
              },
              width: 700,
              height: 700,
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export default MainPanelMediaCompositionOptimization;

const get3DPlotData = (experimentalMCData, xAxisVar, yAxisVar, zAxisVar) => {
  return [
    {
      x: experimentalMCData[xAxisVar],
      y: experimentalMCData[yAxisVar],
      z: experimentalMCData[zAxisVar],
      type: "scatter3d",
      mode: "markers",
      marker: { size: 5 },
    },
  ];
};

const getResponseSurfaceData = (response_surface) => {
  const data = [
    {
      x: response_surface.x_surf,
      y: response_surface.z_surf,
      z: response_surface.y_surf,
      type: "surface",
      colorscale: "Viridis",
    },
  ];
  console.log("transformed data", data); // This line will now log the nested arrays
  return data;
};
