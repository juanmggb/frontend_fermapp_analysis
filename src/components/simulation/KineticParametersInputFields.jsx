import styled from "styled-components";
import {
  biomassYieldMinValue,
  biomassYieldMaxValue,
  inhibitionConstMaxValue,
  inhibitionConstMinValue,
  muMaxValue,
  muMinValue,
  productYieldMaxValue,
  productYieldMinValue,
  satConstMaxValue,
  satConstMinValue,
} from "../../constants/kineticParamConstants";
import { useKineticParamsSimulation } from "../../lib/hooks/useKineticParams";
import { useContext } from "react";
import { FormContext } from "../../lib/contexts/FormContext";
import KineticParameterSimulation from "./KineticParameterSimulation";

const GroupInputStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 10px;

  justify-content: center;
`;

const KineticParametersInputFields = () => {
  const { model } = useContext(FormContext);

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
  } = useKineticParamsSimulation();

  return (
    <GroupInputStyled>
      <KineticParameterSimulation
        symbol={"mu"}
        minValue={muMinValue}
        maxValue={muMaxValue}
        value={muValue}
        step={0.01}
        handleChange={handleMuChange}
      />

      <KineticParameterSimulation
        symbol={"Y"}
        minValue={biomassYieldMinValue}
        maxValue={biomassYieldMaxValue}
        value={biomassYieldValue}
        step={0.01}
        handleChange={handleBiomassYieldChange}
      />

      <KineticParameterSimulation
        symbol={"Yp"}
        minValue={productYieldMinValue}
        maxValue={productYieldMaxValue}
        value={productYieldValue}
        step={1}
        handleChange={handleProductYieldChange}
      />

      <KineticParameterSimulation
        symbol={"Ks"}
        minValue={satConstMinValue}
        maxValue={satConstMaxValue}
        value={satConstValue}
        step={1}
        handleChange={handleSatConstChange}
      />
      {model === "inhibition" && (
        <KineticParameterSimulation
          symbol={"Ki"}
          minValue={inhibitionConstMinValue}
          maxValue={inhibitionConstMaxValue}
          value={inhibitionConstValue}
          step={0.01}
          handleChange={handleInhibitionConstChange}
        />
      )}
    </GroupInputStyled>
  );
};
export default KineticParametersInputFields;
