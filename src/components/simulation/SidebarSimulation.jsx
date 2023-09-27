import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performSimulation } from "../../actions/simulationActions";
import { toast } from "react-hot-toast";
// Styles seccion ###############################################################################################
const SidebarContainerStyled = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin-bottom: 10px;
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
function SidebarSimulation() {
  const dispatch = useDispatch();

  // Get the plot state from redux store
  const simulationPlot = useSelector((state) => state.simulationPlot);
  const { plot } = simulationPlot;

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
  } = useForm({
    defaultValues: {
      X0: 0.5,
      S0: 10,
      P0: 5,
    },
  });

  // This useEffect is to show messages to the user
  useEffect(() => {
    if (errors.X0) {
      toast.error(errors.X0.message);
    }

    if (errors.S0) {
      toast.error(errors.S0.message);
    }

    if (errors.P0) {
      toast.error(errors.P0.message);
    }
  }, [errors.X0, errors.S0, errors.P0]);

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(performSimulation(data));
  };

  return (
    <SidebarContainerStyled>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="model">
          <Form.Label>Select Model</Form.Label>
          <Form.Select {...register("model")}>
            <option>Monod Model</option>
          </Form.Select>
        </Form.Group>

        <GroupInputStyled>
          <InputFieldStyled className="mb-3" controlId="X0">
            <Form.Label>Biomass Concentration (g/L)</Form.Label>
            <Form.Control
              {...register("X0", {
                required: "Biomass concentration is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message:
                    "Please enter a valid numeric value for biomass concentration",
                },
              })}
              type="numeric"
            />
          </InputFieldStyled>

          <InputFieldStyled className="mb-3" controlId="S0">
            <Form.Label>Substrate Concentration (g/L)</Form.Label>
            <Form.Control
              {...register("S0", {
                required: "Substrate concentration is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message:
                    "Please enter a valid numeric value for substrate concentration",
                },
              })}
              type="numeric"
            />
          </InputFieldStyled>

          <InputFieldStyled className="mb-3" controlId="P0">
            <Form.Label>Product Concentration (g/L)</Form.Label>
            <Form.Control
              {...register("P0", {
                required: "Product concentration is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message:
                    "Please enter a valid numeric value for product concentration",
                },
              })}
              type="numeric"
            />
          </InputFieldStyled>
        </GroupInputStyled>

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
          <InputFieldStyled className="mb-3" controlId="step_size">
            <Form.Label>Select step size (h) </Form.Label>
            <Form.Select
              {...register("step_size", {
                valueAsNumber: true,
              })}
            >
              <option value={0.1}>0.1</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
            </Form.Select>
          </InputFieldStyled>

          <InputFieldStyled className="mb-3" controlId="tf">
            <Form.Label>Simulation time (h) </Form.Label>
            <Form.Select
              {...register("tf", {
                valueAsNumber: true,
              })}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={60}>60</option>
            </Form.Select>
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

export default SidebarSimulation;
