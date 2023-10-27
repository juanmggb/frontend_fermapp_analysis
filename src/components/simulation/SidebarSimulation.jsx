import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { performSimulation } from "../../actions/simulationActions";
import { toast } from "react-hot-toast";
import InitialConcentrationInputFields from "./InitialConcentrationInputFields";
import SimulationModelInputField from "../general/SimulationModelInputField";
import KineticParametersInputFields from "./KineticParametersInputFields";
import OperationParameterInputFields from "./OperationParameterInputFields";
import { FormContext } from "../../lib/contexts/FormContext";
import {
  biomassYieldDefaultValue,
  inhibitionConstDefaultValue,
  muDefaultValue,
  productYieldDefaultValue,
  satConstDefaultValue,
} from "../../constants/kineticParamConstants";
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

// Component #########################################################################################################
function SidebarSimulation() {
  const dispatch = useDispatch();

  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      model: "monod", //default model
      X0: 0.2, // default initial conditions
      S0: 40,
      P0: 0,
      mu: muDefaultValue, // default kinetic parameters
      Y: biomassYieldDefaultValue,
      Yp: productYieldDefaultValue,
      Ks: satConstDefaultValue,
      Ki: inhibitionConstDefaultValue,
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
    console.log(data);
    dispatch(performSimulation(data));
  };

  // I want a way to obtain model here to pass it as part of the context
  const model = watch("model");

  return (
    <SidebarContainerStyled>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        {/* I want to pass the value of model here */}
        <FormContext.Provider value={{ register, model }}>
          {/* Simulation model */}
          <SimulationModelInputField />

          {/* Initial concentration values */}
          <InitialConcentrationInputFields />

          {/* Kinwtic Parameters */}
          <KineticParametersInputFields />

          {/* Time step and simulation time */}
          <OperationParameterInputFields />
        </FormContext.Provider>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </FormStyled>
    </SidebarContainerStyled>
  );
}

export default SidebarSimulation;
