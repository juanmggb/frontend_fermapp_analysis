import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { KINETIC_PARAMTERS_SYMBOLS } from "../../constants/kineticParamConstants";

import { MathJax } from "better-react-mathjax";

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
  justify-content: space-between;
  align-items: center;
`;

function ParametersOptimizationResultsModal({
  show,
  handleClose,
  best_params,
  minError,
}) {
  console.log(best_params);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Optimization Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Optimal Parameters</h3>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Parameter</StyledTh>
              <StyledTh>Value</StyledTh>
            </tr>
          </thead>
          <tbody>
            {Object.keys(best_params).map((param, index) => (
              <tr key={index}>
                <td>
                  <MathJax>{KINETIC_PARAMTERS_SYMBOLS[param]}</MathJax>
                </td>
                <td>{best_params[param].toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <StyledFooter>
          <p>{`Mean Squared Error: ${minError.toFixed(3)}`}</p>
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

export default ParametersOptimizationResultsModal;
