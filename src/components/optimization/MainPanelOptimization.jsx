import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Table } from "react-bootstrap";

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

const ResultsContainerStyled = styled.div`
  flex: 1;
  /* width: 800px; */
  min-width: 80%;
  max-width: 90%;
  height: 500px;
  text-align: center;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
`;

const IframeStyled = styled.iframe`
  width: 60%;

  @media (max-width: 1580px) {
    width: 90%;
  }
`;

const TableStyled = styled.table`
  width: 30%;
  min-width: 300px;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 30px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }

  th {
    /* background-color: #f2f2f2; */
    font-weight: bold;
  }

  tr:nth-child(even) {
    /* background-color: #f9f9f9; */
  }
`;

// Constants

const LAYOUT = {
  title: "Experimental data",
  xaxis: {
    title: "Time (h)",
  },
  yaxis: {
    title: "Concentration (g/L)",
  },
};

const BEST_PARAMS_NAMES = ["mu_max", "Y", "Yp", "Ks"];

function MainPanelOptimization() {
  const dataOpt = useSelector((state) => state.dataOpt);
  const { error: dataOptError, data, loading: dataOptLoading } = dataOpt;

  const optParams = useSelector((state) => state.optParams);
  const {
    error: optParamsError,
    data: dataOptParams,
    loading: optParamsLoading,
  } = optParams;

  const [plotData, setPlotData] = useState([]);
  const [plotUrl, setPlotUrl] = useState("");
  const [bestParams, setBestParams] = useState([]);

  // const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (dataOptLoading) {
      // Loading toast (useful for async operations)
      toast.loading("Loading data");
    }

    if (dataOptError) {
      toast.dismiss();
      toast.error("Error during loading data");
    }

    if (data) {
      toast.remove();
      setPlotData(getPlotData(data));
      // setTableData(getTableData(data));
    }
  }, [dataOptError, dataOptLoading, data]);

  useEffect(() => {
    if (optParamsLoading) {
      // Loading toast (useful for async operations)
      toast.loading("Performing optimization");
    }

    if (optParamsError) {
      toast.dismiss();
      toast.error("Error during optimization");
    }

    if (dataOptParams) {
      toast.remove();
      setPlotUrl(dataOptParams.optimization_url);
      setBestParams(getBestParams(dataOptParams.best_params));
    }
  }, [optParamsError, optParamsLoading, dataOptParams]);

  console.log(bestParams);
  return (
    <MainPanelContainerStyled>
      <PlotContainerStyled>
        <Plot data={plotData} layout={LAYOUT} />
      </PlotContainerStyled>

      {plotUrl && (
        <ResultsContainerStyled>
          <IframeStyled
            src={plotUrl}
            title="Comparison"
            // width="60%"
            height="500px"
          ></IframeStyled>
          <TableStyled>
            <thead>
              <tr>
                <th>Kinetic Parameter</th>
                <th>Optimal value</th>
              </tr>
            </thead>
            <tbody>
              {bestParams.map((p, index) => (
                <tr key={index}>
                  <td>{BEST_PARAMS_NAMES[index]}</td>
                  <td>{p}</td>
                </tr>
              ))}
            </tbody>
          </TableStyled>
        </ResultsContainerStyled>
      )}
    </MainPanelContainerStyled>
  );
}

const getPlotData = (data) => {
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

const getBestParams = (bestParams) => {
  const newBestParams = bestParams.map((p) => p.toFixed(3));

  return newBestParams;
};

export default MainPanelOptimization;

// const getTableData = (data) => {
//   const formattedData = {
//     t: [],
//     x: [],
//     s: [],
//     p: [],
//   };

//   for (let i = 0; i < data.t.length; i++) {
//     formattedData.t.push(data.t[i]);
//     formattedData.x.push(parseFloat(data.x[i].toFixed(3)));
//     formattedData.s.push(parseFloat(data.s[i].toFixed(3)));
//     formattedData.p.push(parseFloat(data.p[i].toFixed(3)));
//   }

//   return formattedData;
// };

/* {tableData && (
          <TableDataStyled>
            <thead>
              <tr>
                <th>Time (h)</th>
                <th>Biomass (g/L)</th>
                <th>Substrate (g/L)</th>
                <th>Product (g/L)</th>
              </tr>
            </thead>

            <tbody>
              {tableData.t.map((value, index) => (
                <tr key={index}>
                  <td>{value}</td>
                  <td>{tableData.x[index]}</td>
                  <td>{tableData.s[index]}</td>
                  <td>{tableData.p[index]}</td>
                </tr>
              ))}
            </tbody>
          </TableDataStyled>
        )} */
