import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import {
  performOptParms,
  saveDataOpt,
} from "../../actions/optimizationActions";
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

// CONSTANTS ##########################################################################################

const muValueMin = 0.01;
const muValueDefault = 0.5;
const muValueMax = 1;

const yieldValueMin = 0.01;
const yieldValueDefault = 0.5;
const yieldValueMax = 1;

const productYieldValueMin = 0.0;
const productYieldValueDefault = 10;
const productYieldValueMax = 20;

const satConstValueMin = 10;
const satConstValueDefault = 100;
const satConstValueMax = 200;

// Component #########################################################################################################
function SidebarOptimization() {
  const dispatch = useDispatch();

  // Get the plot state from redux store

  const dataOpt = useSelector((state) => state.dataOpt);

  const { error: errorDataOpt, data, loading: loadingDataOpt } = dataOpt;

  // Create kinetic parameter states
  const {
    muValue,
    yieldValue,
    productYieldValue,
    satConstValue,
    handleMuChange,
    handleYieldChange,
    handleProductYieldChange,
    handleSatConstChange,
  } = useKineticParams();

  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit simulation input to perform the simulation
  const onSubmit = () => {
    // console.log(data);
    // dispatch(performSimulation(data));
    if (data) {
      console.log(data);
      dispatch(performOptParms(data));
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

      dispatch(saveDataOpt(jsonData));
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

        <Form.Group className="mb-3" controlId="model">
          <Form.Label>Select Model</Form.Label>
          <Form.Select {...register("model")}>
            <option>Monod Model</option>
          </Form.Select>
        </Form.Group>

        <GroupInputStyled>
          <InputFieldStyled controlId="mu">
            <Form.Label>
              <MathJax>{"\\(\\mu\\) (1/h)"}</MathJax>
            </Form.Label>
            <RangeValueStyled>
              <span>{muValueMin}</span>
              <span>{muValue}</span>
              <span>{muValueMax}</span>
            </RangeValueStyled>
            <Form.Range
              {...register("mu", {
                valueAsNumber: true,
              })}
              min={muValueMin}
              max={muValueMax}
              step={0.01}
              defaultValue={muValueDefault}
              onChange={handleMuChange}
            />
          </InputFieldStyled>

          <InputFieldStyled controlId="Y">
            <Form.Label>
              <MathJax>{"\\(Y\\) "}</MathJax>
            </Form.Label>
            <RangeValueStyled>
              <span>{yieldValueMin}</span>
              <span>{yieldValue}</span>
              <span>{yieldValueMax}</span>
            </RangeValueStyled>
            <Form.Range
              {...register("Y", {
                valueAsNumber: true,
              })}
              min={yieldValueMin}
              max={yieldValueMax}
              step={0.01}
              defaultValue={yieldValueDefault}
              onChange={handleYieldChange}
            />
          </InputFieldStyled>

          <InputFieldStyled controlId="Yp">
            <Form.Label>
              {" "}
              <MathJax>{"\\(Y_p\\) "}</MathJax>
            </Form.Label>

            <RangeValueStyled>
              <span>{productYieldValueMin}</span>
              <span>{productYieldValue}</span>
              <span>{productYieldValueMax}</span>
            </RangeValueStyled>
            <Form.Range
              {...register("Yp", {
                valueAsNumber: true,
              })}
              min={productYieldValueMin}
              max={productYieldValueMax}
              step={1}
              defaultValue={productYieldValueDefault}
              onChange={handleProductYieldChange}
            />
          </InputFieldStyled>

          <InputFieldStyled controlId="Ks">
            <Form.Label>
              <MathJax>{"\\(K_s\\) (g/L)"}</MathJax>
            </Form.Label>
            <RangeValueStyled>
              <span>{satConstValueMin}</span>
              <span>{satConstValue}</span>
              <span>{satConstValueMax}</span>
            </RangeValueStyled>
            <Form.Range
              {...register("Ks", {
                valueAsNumber: true,
              })}
              min={satConstValueMin}
              max={satConstValueMax}
              step={1}
              defaultValue={satConstValueDefault}
              onChange={handleSatConstChange}
            />
          </InputFieldStyled>
        </GroupInputStyled>

        <GroupInputStyled>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </GroupInputStyled>
      </FormStyled>
    </SidebarContainerStyled>
  );
}

const useKineticParams = () => {
  const [muValue, setMuValue] = useState(muValueDefault);
  const [yieldValue, setYieldValue] = useState(yieldValueDefault);
  const [productYieldValue, setProductYieldValue] = useState(
    productYieldValueDefault
  );
  const [satConstValue, setSatConstValue] = useState(satConstValueDefault);

  const handleMuChange = (e) => {
    setMuValue(e.target.value);
  };

  const handleYieldChange = (e) => {
    setYieldValue(e.target.value);
  };

  const handleProductYieldChange = (e) => {
    setProductYieldValue(e.target.value);
  };

  const handleSatConstChange = (e) => {
    setSatConstValue(e.target.value);
  };

  return {
    muValue,
    yieldValue,
    productYieldValue,
    satConstValue,
    handleMuChange,
    handleYieldChange,
    handleProductYieldChange,
    handleSatConstChange,
  };
};

export default SidebarOptimization;
