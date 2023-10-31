import { useContext } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { MediaOptFormContext } from "../../lib/contexts/MediaOptFormContext";

const LinearRegressionParameters = () => {
  const { register } = useContext(MediaOptFormContext);

  return (
    <div>
      <Form.Group controlId="test_size">
        <Form.Label>Test Size:</Form.Label>
        <Form.Control
          {...register("test_size", {
            required: true,
            validate: (value) =>
              (value > 0 && value < 1) ||
              "Test Size should be a decimal between 0 and 1 exclusive.",
          })}
          type="number"
          step="any"
        />
      </Form.Group>

      <Form.Group controlId="random_state">
        <Form.Label>
          Random State (The report must consider the random state value):
        </Form.Label>
        <Form.Control {...register("random_state")} type="number" />
      </Form.Group>

      <Form.Group controlId="normalization">
        <Form.Label>Test Size:</Form.Label>
        <Form.Check {...register("normalization")} label="Normalize data" />
      </Form.Group>

      <Form.Group controlId="polynomial_degree">
        <Form.Label>Polynomial Degree</Form.Label>
        <Form.Control as="select" {...register("polynomial_degree")}>
          <option value="1">1</option>
          <option value="2">2</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
};
export default LinearRegressionParameters;
