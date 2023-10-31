import { Form } from "react-bootstrap";
import styled from "styled-components";
import { MathJax } from "better-react-mathjax";
import { useContext } from "react";
import { FormContext } from "../../lib/contexts/FormContext";
import { KINETIC_PARAMTERS_SYMBOLS } from "../../constants/kineticParamConstants";

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

const KineticParameterSimulation = ({
  symbol,
  minValue,
  maxValue,
  value,
  step,
  handleChange,
}) => {
  const { register } = useContext(FormContext);

  return (
    <InputFieldStyled controlId={symbol}>
      <Form.Label>
        <MathJax>{KINETIC_PARAMTERS_SYMBOLS[symbol]}</MathJax>
      </Form.Label>
      <RangeValueStyled>
        <span>{minValue}</span>
        <span>{value}</span>
        <span>{maxValue}</span>
      </RangeValueStyled>
      <Form.Range
        {...register(`${symbol}`, {
          valueAsNumber: true,
        })}
        min={minValue}
        max={maxValue}
        step={step}
        onChange={(e) => handleChange(e.target.value)}
      />
    </InputFieldStyled>
  );
};
export default KineticParameterSimulation;
