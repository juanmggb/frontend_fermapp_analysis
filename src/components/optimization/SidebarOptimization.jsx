import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import {
  performOptParms,
  saveDataOpt,
} from "../../actions/optimizationActions";
import SimulationModelInputField from "../general/SimulationModelInputField";
import { FormContext } from "../../lib/contexts/FormContext";
import { ExperimentalDataContext } from "../../lib/contexts/ExperimentalDataContext";
// Styles seccion ###############################################################################################
const SidebarContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  padding: 10px;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  gap: 30px;
`;

const GroupInputStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 10px;

  justify-content: center;
`;

const InputFieldStyled = styled(Form.Group)`
  max-width: 120px;
  text-align: center;
  margin: 0 10px;
  background-color: blue;
  cursor: pointer;

  :hover {
    background-color: purple;
  }
`;

const RangeValueStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// Component #########################################################################################################
function SidebarOptimization() {
  // Get the plot state from redux store
  const { setExperimentalData } = useContext(ExperimentalDataContext);

  // Use useForm to perform validation in the form
  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      model: "monod", //default model
    },
  });

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    // console.log(data);
    // dispatch(performSimulation(data));
    if (data) {
      console.log(data);
      // dispatch(performOptParms(data));
    } else {
      alert("No data yet");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const jsonData = { t: [], x: [], s: [], p: [] };
      data.slice(1).forEach((row) => {
        jsonData.t.push(row[0]);
        jsonData.x.push(row[1]);
        jsonData.p.push(row[2]);
        jsonData.s.push(row[3]);
      });

      // jsonData
      setExperimentalData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <SidebarContainerStyled>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <FormContext.Provider value={{ register }}>
          {/* Simulation model */}
          <SimulationModelInputField />
        </FormContext.Provider>

        <GroupInputStyled>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </GroupInputStyled>
      </FormStyled>
    </SidebarContainerStyled>
  );
}

export default SidebarOptimization;
