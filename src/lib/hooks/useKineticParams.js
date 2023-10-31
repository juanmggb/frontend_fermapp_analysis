import { useState } from "react";
import {
  biomassYieldDefaultValue,
  inhibitionConstDefaultValue,
  muDefaultValue,
  productYieldDefaultValue,
  satConstDefaultValue,
} from "../../constants/kineticParamConstants";

export const useKineticParamsSimulation = () => {
  const [kineticParams, setKineticParams] = useState({
    muValue: muDefaultValue,
    biomassYieldValue: biomassYieldDefaultValue,
    productYieldValue: productYieldDefaultValue,
    satConstValue: satConstDefaultValue,
    inhibitionConstValue: inhibitionConstDefaultValue,
  });

  const handleMuChange = (newValue) => {
    setKineticParams((prevKineticParams) => ({
      ...prevKineticParams,
      muValue: newValue,
    }));
  };

  const handleBiomassYieldChange = (newValue) => {
    setKineticParams((prevKineticParams) => ({
      ...prevKineticParams,
      biomassYieldValue: newValue,
    }));
  };

  const handleProductYieldChange = (newValue) => {
    setKineticParams((prevKineticParams) => ({
      ...prevKineticParams,
      productYieldValue: newValue,
    }));
  };

  const handleSatConstChange = (newValue) => {
    setKineticParams((prevKineticParams) => ({
      ...prevKineticParams,
      satConstValue: newValue,
    }));
  };

  const handleInhibitionConstChange = (newValue) => {
    setKineticParams((prevKineticParams) => ({
      ...prevKineticParams,
      inhibitionConstValue: newValue,
    }));
  };

  return {
    ...kineticParams,
    handleMuChange,
    handleBiomassYieldChange,
    handleProductYieldChange,
    handleSatConstChange,
    handleInhibitionConstChange,
  };
};
