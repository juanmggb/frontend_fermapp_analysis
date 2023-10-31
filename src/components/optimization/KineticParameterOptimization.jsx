import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { MathJax } from "better-react-mathjax";
import { KINETIC_PARAMTERS_SYMBOLS } from "../../constants/kineticParamConstants";
import { FormContext } from "../../lib/contexts/FormContext";

const ToggleFieldStyled = styled.div`
  /* text-align: center; */
  margin-left: 80px;
`;

const InputFieldStyled = styled(Form.Group)`
  max-width: 100px;
  text-align: center;
  margin: 0 10px;

  & > input {
    border-radius: 5px;
  }
`;

const InputGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
`;

const KineticParameterOptimization = ({
  symbol,
  optimize,
  setOptimize,
  value,
  setValue,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) => {
  const { register } = useContext(FormContext);

  return (
    <>
      <ToggleFieldStyled>
        <Form.Check
          {...register(`${symbol}_optimize`)}
          type="checkbox"
          label="Optimize?"
          checked={optimize}
          onChange={(e) => setOptimize(e.target.checked)}
        />
      </ToggleFieldStyled>

      {optimize ? (
        <InputGroupStyled>
          <InputFieldStyled>
            <Form.Label>
              <MathJax>Min {KINETIC_PARAMTERS_SYMBOLS[symbol]}</MathJax>
            </Form.Label>
            <Form.Control
              {...register(`${symbol}_min`)}
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
          </InputFieldStyled>
          <InputFieldStyled>
            <Form.Label>
              <MathJax>Max {KINETIC_PARAMTERS_SYMBOLS[symbol]}</MathJax>
            </Form.Label>
            <Form.Control
              {...register(`${symbol}_max`)}
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </InputFieldStyled>
        </InputGroupStyled>
      ) : (
        <InputGroupStyled>
          <InputFieldStyled>
            <Form.Label>
              <MathJax>Fixed {KINETIC_PARAMTERS_SYMBOLS[symbol]}</MathJax>
            </Form.Label>
            <Form.Control
              {...register(`${symbol}_fixed`)}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputFieldStyled>
        </InputGroupStyled>
      )}
    </>
  );
};

export default KineticParameterOptimization;
