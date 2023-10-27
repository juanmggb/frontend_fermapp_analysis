import { Form } from "react-bootstrap";
import styled from "styled-components";
import { MathJax } from "better-react-mathjax";
import {
  biomassYieldDefaultValue,
  biomassYieldMinValue,
  biomassYieldValueMax,
  inhibitionConstDefaultValue,
  inhibitionConstMaxValue,
  inhibitionConstMinValue,
  muDefaultValue,
  muMaxValue,
  muMinValue,
  productYieldDefaultValue,
  productYieldMaxValue,
  productYieldMinValue,
  satConstDefaultValue,
  satConstMaxValue,
  satConstMinValue,
} from "../../constants/kineticParamConstants";
import { useKineticParams } from "../../lib/hooks/useKineticParams";
import { useContext } from "react";
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

const RangeValueStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const KineticParametersInputFields = () => {
  const { register, model } = useContext(FormContext);

  console.log(model);
  // Create kinetic parameter states
  const {
    muValue,
    biomassYieldValue,
    productYieldValue,
    satConstValue,
    inhibitionConstValue,
    handleMuChange,
    handleBiomassYieldChange,
    handleProductYieldChange,
    handleSatConstChange,
    handleInhibitionConstChange,
  } = useKineticParams();

  return (
    <GroupInputStyled>
      <InputFieldStyled controlId="mu">
        <Form.Label>
          <MathJax>{"\\(\\mu\\) (1/h)"}</MathJax>
        </Form.Label>
        <RangeValueStyled>
          <span>{muMinValue}</span>
          <span>{muValue}</span>
          <span>{muMaxValue}</span>
        </RangeValueStyled>
        <Form.Range
          {...register("mu", {
            valueAsNumber: true,
          })}
          min={muMinValue}
          max={muMaxValue}
          step={0.01}
          onChange={(e) => handleMuChange(e.target.value)}
        />
      </InputFieldStyled>

      <InputFieldStyled controlId="Y">
        <Form.Label>
          <MathJax>{"\\(Y\\) "}</MathJax>
        </Form.Label>
        <RangeValueStyled>
          <span>{biomassYieldMinValue}</span>
          <span>{biomassYieldValue}</span>
          <span>{biomassYieldValueMax}</span>
        </RangeValueStyled>
        <Form.Range
          {...register("Y", {
            valueAsNumber: true,
          })}
          min={biomassYieldMinValue}
          max={biomassYieldValueMax}
          step={0.01}
          onChange={(e) => handleBiomassYieldChange(e.target.value)}
        />
      </InputFieldStyled>

      <InputFieldStyled controlId="Yp">
        <Form.Label>
          {" "}
          <MathJax>{"\\(Y_p\\) "}</MathJax>
        </Form.Label>

        <RangeValueStyled>
          <span>{productYieldMinValue}</span>
          <span>{productYieldValue}</span>
          <span>{productYieldMaxValue}</span>
        </RangeValueStyled>
        <Form.Range
          {...register("Yp", {
            valueAsNumber: true,
          })}
          min={productYieldMinValue}
          max={productYieldMaxValue}
          step={1}
          onChange={(e) => handleProductYieldChange(e.target.value)}
        />
      </InputFieldStyled>

      <InputFieldStyled controlId="Ks">
        <Form.Label>
          <MathJax>{"\\(K_s\\) (g/L)"}</MathJax>
        </Form.Label>
        <RangeValueStyled>
          <span>{satConstMinValue}</span>
          <span>{satConstValue}</span>
          <span>{satConstMaxValue}</span>
        </RangeValueStyled>
        <Form.Range
          {...register("Ks", {
            valueAsNumber: true,
          })}
          min={satConstMinValue}
          max={satConstMaxValue}
          step={1}
          onChange={(e) => handleSatConstChange(e.target.value)}
        />
      </InputFieldStyled>
      {model === "inhibition" && (
        <InputFieldStyled controlId="Ks">
          <Form.Label>
            <MathJax>{"\\(K_i\\) (g/L)"}</MathJax>
          </Form.Label>
          <RangeValueStyled>
            <span>{inhibitionConstMinValue}</span>
            <span>{inhibitionConstValue}</span>
            <span>{inhibitionConstMaxValue}</span>
          </RangeValueStyled>
          <Form.Range
            {...register("Ki", {
              valueAsNumber: true,
            })}
            min={inhibitionConstMinValue}
            max={inhibitionConstMaxValue}
            step={0.01}
            onChange={(e) => handleInhibitionConstChange(e.target.value)}
          />
        </InputFieldStyled>
      )}
    </GroupInputStyled>
  );
};
export default KineticParametersInputFields;
