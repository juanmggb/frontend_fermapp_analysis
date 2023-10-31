import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { FormContext } from "../../lib/contexts/FormContext";
import {
  performMCOptimization,
  performOptParms,
} from "../../actions/optimizationActions";

import { handleFileChange } from "../../lib/utilis/optimization";
import LinearRegressionParameters from "./LinearRegressionParameters";
import LinearRegressionAnalysisResultsModal from "./LinearRegressionAnalysisResultsModal";
import { MediaOptFormContext } from "../../lib/contexts/MediaOptFormContext";
import { handleMCFileChange } from "../../lib/utilis/mediaOptimization";
import { MCDataContext } from "../../lib/contexts/MCDataContext";
import LinearRegressionVariablesInputFields from "./LinearRegressionVariablesInputFields";

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
function SidebarMediaCompositionOptimization() {
  const dispatch = useDispatch();

  const { experimentalMCData, setMCData } = useContext(MCDataContext);
  // const variables = Object.keys(experimentalMCData);

  // Get the plot state from redux store
  const mediaCompOptimization = useSelector(
    (state) => state.mediaCompOptimization
  );
  const { model_metrics } = mediaCompOptimization;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // LR paramters
      test_size: 0.2,
      random_state: 1, // Add this to the GA too
      normalization: true,
      polynomial_degree: 1,
    },
  });

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    // console.log(data);
    // dispatch(performSimulation(data));

    console.log("Data", data);

    if (experimentalMCData) {
      // Obtain GA parameters
      const LAParams = getLRParams(data);

      if (!LAParams) {
        toast.error("All selected variables mut be different");
        return null;
      }

      console.log("experimentalMCData", experimentalMCData);
      console.log("LAParams", LAParams);

      dispatch(
        performMCOptimization({
          experimentalMCData,
          LAParams,
        })
      );
    } else {
      toast.dismiss();
      toast.error(
        "Please, introduce experimental data to perform the linear regression analysis"
      );
    }
  };

  return (
    <SidebarContainerStyled>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleMCFileChange(e, setMCData)}
          />
        </Form.Group>
        <MediaOptFormContext.Provider value={{ register, setValue }}>
          {/* Linear Regression Parameters */}
          <LinearRegressionParameters />

          {/* Linear regression variables */}
          <LinearRegressionVariablesInputFields />
        </MediaOptFormContext.Provider>

        <GroupInputStyled>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {model_metrics && (
            <Button className="btn btn-primary" onClick={handleShow}>
              Show Linear Regression Analysis Results
            </Button>
          )}
        </GroupInputStyled>
      </FormStyled>
      {model_metrics && (
        <LinearRegressionAnalysisResultsModal
          show={show}
          handleClose={handleClose}
          mediaCompOptimization={mediaCompOptimization}
        />
      )}
    </SidebarContainerStyled>
  );
}

export default SidebarMediaCompositionOptimization;

const getLRParams = (data) => {
  const {
    test_size,
    random_state, // Add this to the GA too
    normalization,
    polynomial_degree,
    x_var,
    y_var,
    z_var,
  } = data;

  if (x_var === y_var || x_var === z_var || y_var === z_var) return null;

  return {
    test_size: parseFloat(test_size),
    random_state: parseInt(random_state),
    normalization,
    polynomial_degree,
    x_var,
    y_var,
    z_var,
  };
};
