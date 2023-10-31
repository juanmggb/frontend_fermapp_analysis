import { useState } from "react";
import {
  biomassYieldDefaultValue,
  biomassYieldMaxValue,
  biomassYieldMinValue,
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

export const useKineticParamsOptimization = () => {
  const [kineticParams, setKineticParams] = useState({
    mu: {
      value: muDefaultValue,
      optimize: true,
      minValue: muMinValue,
      maxValue: muMaxValue,
    },
    biomassYield: {
      value: biomassYieldDefaultValue,
      optimize: true,
      minValue: biomassYieldMinValue,
      maxValue: biomassYieldMaxValue,
    },
    productYield: {
      value: productYieldDefaultValue,
      optimize: true,
      minValue: productYieldMinValue,
      maxValue: productYieldMaxValue,
    },
    satConst: {
      value: satConstDefaultValue,
      optimize: true,
      minValue: satConstMinValue,
      maxValue: satConstMaxValue,
    },
    inhibitionConst: {
      value: inhibitionConstDefaultValue,
      optimize: true,
      minValue: inhibitionConstMinValue,
      maxValue: inhibitionConstMaxValue,
    },
  });

  const setParamValue = (param, key, newValue) => {
    setKineticParams((prevKineticParams) => ({
      ...prevKineticParams,
      [param]: { ...prevKineticParams[param], [key]: newValue },
    }));
  };

  const handleMuValueChange = (newValue) =>
    setParamValue("mu", "value", newValue);
  const handleMuOptimizeChange = (newValue) =>
    setParamValue("mu", "optimize", newValue);
  const handleMuMinChange = (newValue) =>
    setParamValue("mu", "minValue", newValue);
  const handleMuMaxChange = (newValue) =>
    setParamValue("mu", "maxValue", newValue);

  const handleBiomassYieldValueChange = (newValue) =>
    setParamValue("biomassYield", "value", newValue);
  const handleBiomassYieldOptimizeChange = (newValue) =>
    setParamValue("biomassYield", "optimize", newValue);
  const handleBiomassYieldMinChange = (newValue) =>
    setParamValue("biomassYield", "minValue", newValue);
  const handleBiomassYieldMaxChange = (newValue) =>
    setParamValue("biomassYield", "maxValue", newValue);

  const handleProductYieldValueChange = (newValue) =>
    setParamValue("productYield", "value", newValue);
  const handleProductYieldOptimizeChange = (newValue) =>
    setParamValue("productYield", "optimize", newValue);
  const handleProductYieldMinChange = (newValue) =>
    setParamValue("productYield", "minValue", newValue);
  const handleProductYieldMaxChange = (newValue) =>
    setParamValue("productYield", "maxValue", newValue);

  const handleSatConstValueChange = (newValue) =>
    setParamValue("satConst", "value", newValue);
  const handleSatConstOptimizeChange = (newValue) =>
    setParamValue("satConst", "optimize", newValue);
  const handleSatConstMinChange = (newValue) =>
    setParamValue("satConst", "minValue", newValue);
  const handleSatConstMaxChange = (newValue) =>
    setParamValue("satConst", "maxValue", newValue);

  const handleInhibitionConstValueChange = (newValue) =>
    setParamValue("inhibitionConst", "value", newValue);
  const handleInhibitionConstOptimizeChange = (newValue) =>
    setParamValue("inhibitionConst", "optimize", newValue);
  const handleInhibitionConstMinChange = (newValue) =>
    setParamValue("inhibitionConst", "minValue", newValue);
  const handleInhibitionConstMaxChange = (newValue) =>
    setParamValue("inhibitionConst", "maxValue", newValue);

  return {
    mu: {
      ...kineticParams.mu,
      handleMuValueChange,
      handleMuOptimizeChange,
      handleMuMinChange,
      handleMuMaxChange,
    },

    biomassYield: {
      ...kineticParams.biomassYield,
      handleBiomassYieldValueChange,
      handleBiomassYieldOptimizeChange,
      handleBiomassYieldMinChange,
      handleBiomassYieldMaxChange,
    },

    productYield: {
      ...kineticParams.productYield,
      handleProductYieldValueChange,
      handleProductYieldOptimizeChange,
      handleProductYieldMinChange,
      handleProductYieldMaxChange,
    },

    satConst: {
      ...kineticParams.satConst,
      handleSatConstValueChange,
      handleSatConstOptimizeChange,
      handleSatConstMinChange,
      handleSatConstMaxChange,
    },

    inhibitionConst: {
      ...kineticParams.inhibitionConst,
      handleInhibitionConstValueChange,
      handleInhibitionConstOptimizeChange,
      handleInhibitionConstMinChange,
      handleInhibitionConstMaxChange,
    },
  };
};
