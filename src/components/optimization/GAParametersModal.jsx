import { useContext } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { FormContext } from "../../lib/contexts/FormContext";

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 2rem;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  align-items: center;
  & > label {
    flex-basis: 40%; // Allocate 40% of space to labels
    font-size: large;
    text-align: right;
  }

  & > input,
  & > select {
    /* flex: 1; // Take up ramaining horizontal space */
    flex-basis: 50%; // Allocate 50% of space to inputs and selects
    border-radius: 5px;
    padding: 0.5rem;
    margin-left: 1rem; // Add some space between label and input/select
  }
`;

const StyledModalFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function GAParametersModal({ show, handleClose }) {
  const { register } = useContext(FormContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Parameters of the Genetic Algorithm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledFormGroup>
          <Form.Label>Number of generations: </Form.Label>
          <Form.Control
            {...register("max_num_iteration", {
              required: "Number of generations is required",
              valueAsNumber: true,
            })}
          />
        </StyledFormGroup>

        <StyledFormGroup>
          <Form.Label>Number of generations: </Form.Label>
          <Form.Control
            {...register("population_size", {
              required: "Population size is required",
              valueAsNumber: true,
            })}
          />
        </StyledFormGroup>

        <StyledFormGroup>
          <Form.Label>Crossover probability: </Form.Label>
          <Form.Control
            {...register("crossover_probability", {
              required: "Crossover probability is required",
              valueAsNumber: true,
            })}
          />
        </StyledFormGroup>

        <StyledFormGroup>
          <Form.Label>Mutation probability: </Form.Label>
          <Form.Control
            {...register("mutation_probability", {
              required: "Mutation probability is required",
              valueAsNumber: true,
            })}
          />
        </StyledFormGroup>

        <StyledFormGroup>
          <Form.Label>Elitism Ratio: </Form.Label>
          <Form.Control
            {...register("elit_ratio", {
              required: "Elitism ratio is required",
              valueAsNumber: true,
            })}
          />
        </StyledFormGroup>

        <StyledFormGroup>
          <Form.Label>Max Number of Iteration Without Improving: </Form.Label>
          <Form.Control
            {...register("max_iteration_without_improv", {
              required: "Max number of iteration without improving is required",
              valueAsNumber: true,
            })}
          />
        </StyledFormGroup>

        <StyledFormGroup>
          <Form.Label>Crossover Type Function: </Form.Label>
          <Form.Select {...register("crossover_type")}>
            <option value="one_point">One point</option>
            <option value="two_point">Two point</option>
            <option value="uniform">Uniform</option>
          </Form.Select>
        </StyledFormGroup>
      </Modal.Body>
      <StyledModalFooter>
        <Button variant="info" onClick={handleClose}>
          Reestablish default values
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </StyledModalFooter>
    </Modal>
  );
}

export default GAParametersModal;
