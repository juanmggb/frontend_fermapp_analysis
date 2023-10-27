import { useContext } from "react";
import { Form } from "react-bootstrap";
import { FormContext } from "../../lib/contexts/FormContext";

const SimulationModelInputField = () => {
  const { register } = useContext(FormContext);
  return (
    <Form.Group className="mb-3" controlId="model">
      <Form.Label>Select Model</Form.Label>
      {/* Here is the value of model that I want to access and observe all the time, especially when it changes and pass it to the context */}
      <Form.Select {...register("model")}>
        <option value="monod">Monod Model</option>
        <option value="inhibition">Substrate Model</option>
      </Form.Select>
    </Form.Group>
  );
};
export default SimulationModelInputField;
