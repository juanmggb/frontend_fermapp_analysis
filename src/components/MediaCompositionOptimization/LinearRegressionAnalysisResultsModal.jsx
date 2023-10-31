import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
`;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

function LinearRegressionAnalysisResultsModal({
  show,
  handleClose,
  mediaCompOptimization,
}) {
  const { model_params, model_metrics, data_split, features, preprocessing } =
    mediaCompOptimization;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Linear Regression Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Model Parameters</h3>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Parameter</StyledTh>
              <StyledTh>Value</StyledTh>
            </tr>
          </thead>
          <tbody>
            {model_params.coefficients.map((coef, index) => (
              <tr key={index}>
                <td>{`Coefficient ${index + 1}`}</td>
                <td>{coef.toFixed(3)}</td>
              </tr>
            ))}
            <tr>
              <td>Intercept</td>
              <td>{model_params.intercept.toFixed(3)}</td>
            </tr>
          </tbody>
        </StyledTable>

        <h3>Model Metrics</h3>
        <StyledFooter>
          {Object.entries(model_metrics).map(([key, value]) => (
            <p key={key}>{`${key.toUpperCase()}: ${value.toFixed(3)}`}</p>
          ))}
        </StyledFooter>

        <h3>Data Split Information</h3>
        <StyledFooter>
          {Object.entries(data_split).map(([key, value]) => (
            <p key={key}>
              {`${key.replace("_", " ").toUpperCase()}: ${value}`}
            </p>
          ))}
        </StyledFooter>

        <h3>Features</h3>
        <StyledFooter>
          <p>{`Dependent Variable: ${features.dependent_variable}`}</p>
          <p>{`Independent Variables: ${features.independent_variables.join(
            ", "
          )}`}</p>
        </StyledFooter>

        <h3>Preprocessing</h3>
        <StyledFooter>
          {Object.entries(preprocessing).map(([key, value]) => (
            <p key={key}>
              {`${key.replace("_", " ").toUpperCase()}: ${value}`}
            </p>
          ))}
        </StyledFooter>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LinearRegressionAnalysisResultsModal;
