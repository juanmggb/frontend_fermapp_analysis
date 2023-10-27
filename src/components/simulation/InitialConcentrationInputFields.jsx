import { useContext } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { FormContext } from "../../lib/contexts/FormContext";

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

const InitialConcentrationInputFields = () => {
  const { register } = useContext(FormContext);
  return (
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
  );
};
export default InitialConcentrationInputFields;
