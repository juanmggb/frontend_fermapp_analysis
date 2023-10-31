import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import SimulationModelInputField from "../general/SimulationModelInputField";
import { FormContext } from "../../lib/contexts/FormContext";
import { performOptParms } from "../../actions/optimizationActions";
import ParametersOptimizationResultsModal from "./ParametersOptimizationResultsModal";
import GAParametersModal from "./GAParametersModal";
import { handleFileChange } from "../../lib/utilis/optimization";
import KineticParametersInputFields from "./KineticParametersInputFields";

// Styles seccion ###############################################################################################
const SidebarContainerStyled = styled.div`
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

// Component #########################################################################################################
function SidebarOptimization({ experimentalData, setExperimentalData }) {
  const dispatch = useDispatch();

  // Get the plot state from redux store
  const parameterOptimization = useSelector(
    (state) => state.parameterOptimization
  );
  const { best_params, minError } = parameterOptimization;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showGAParams, setShowGAParams] = useState(false);

  const handleCloseGAParams = () => setShowGAParams(false);
  const handleShowGAParams = () => setShowGAParams(true);

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

      // GA parameters
      max_num_iteration: 50,
      population_size: 50,
      mutation_probability: 0.1,
      elit_ratio: 0.01,
      crossover_probability: 0.8,
      crossover_type: "two_point",
      max_iteration_without_improv: 50,
    },
  });

  useEffect(() => {
    console.log(watch()); // log the form state
  }, [watch]);

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    // console.log(data);
    // dispatch(performSimulation(data));

    if (experimentalData) {
      const kineticData = prepareKineticData(data);

      if (!kineticData) {
        toast.dismiss();
        toast.error("At least one kinetic parameter must be optimized");
        return null;
      }

      const model = kineticData.model;

      if (model === "monod") {
        delete kineticData.Ki;
      }

      // Obtain GA parameters
      const GAParams = getGAParams(data);

      dispatch(
        performOptParms({
          kineticData,
          experimentalData,
          GAParams,
        })
      );
    } else {
      toast.dismiss();
      toast.error(
        "Please, introduce experimental data to perform the parameter optimization"
      );
    }
  };

  const model = watch("model");

  return (
    <SidebarContainerStyled>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, setExperimentalData)}
          />
        </Form.Group>
        <FormContext.Provider value={{ register, model }}>
          {/* Simulation model */}
          <SimulationModelInputField />

          {/* Kinetic Parameters */}
          <KineticParametersInputFields />
        </FormContext.Provider>

        <GroupInputStyled>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {best_params && (
            <Button className="btn btn-primary" onClick={handleShow}>
              Show Parameter Optimization Results
            </Button>
          )}
        </GroupInputStyled>

        <hr />

        <Button onClick={handleShowGAParams}>
          Show Optimization Algorithm Parameters
        </Button>
      </FormStyled>
      {best_params && (
        <ParametersOptimizationResultsModal
          show={show}
          handleClose={handleClose}
          best_params={best_params}
          minError={minError}
        />
      )}

      <FormContext.Provider value={{ register }}>
        {showGAParams && (
          <GAParametersModal
            show={showGAParams}
            handleClose={handleCloseGAParams}
          />
        )}
      </FormContext.Provider>
    </SidebarContainerStyled>
  );
}

export default SidebarOptimization;

function prepareKineticData(data) {
  let shouldOptimize = false; // Flag to check if at least one parameter should be optimized
  const preparedData = {};

  // Iterate through each key-value pair in the object
  for (const [key, value] of Object.entries(data)) {
    // Check if the key ends with '_optimize'
    if (key.endsWith("_optimize")) {
      const prefix = key.split("_")[0]; // Extract the prefix like 'Ks', 'Y', 'Yp', 'mu'
      preparedData[prefix] = {};

      if (value === true) {
        shouldOptimize = true;
        preparedData[prefix]["optimize"] = true;
        preparedData[prefix]["min"] = parseFloat(data[`${prefix}_min`]);
        preparedData[prefix]["max"] = parseFloat(data[`${prefix}_max`]);
      } else {
        preparedData[prefix]["optimize"] = false;
        preparedData[prefix]["fixed"] = parseFloat(data[`${prefix}_fixed`]); // Assuming fixed value is stored in max
      }
    }
  }

  // Add the model to the prepared data
  preparedData["model"] = data.model;

  // If no parameters are set to be optimized, return null
  if (!shouldOptimize) return null;

  return preparedData;
}

const getGAParams = (data) => {
  const {
    max_num_iteration,
    population_size,
    mutation_probability,
    elit_ratio,
    crossover_probability,
    crossover_type,
    max_iteration_without_improv,
  } = data;

  return {
    max_num_iteration,
    population_size,
    mutation_probability,
    elit_ratio,
    crossover_probability,
    crossover_type,
    max_iteration_without_improv,
  };
};
