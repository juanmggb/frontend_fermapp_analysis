import { useContext } from "react";
import KineticParameterOptimization from "./KineticParameterOptimization";
import { FormContext } from "../../lib/contexts/FormContext";

import { useKineticParamsOptimization } from "../../lib/hooks/useKineticParamsOptimization";

const KineticParametersInputFields = () => {
  const { model } = useContext(FormContext);

  const { mu, biomassYield, productYield, satConst, inhibitionConst } =
    useKineticParamsOptimization();

  return (
    <div>
      <KineticParameterOptimization
        symbol={"mu"}
        optimize={mu.optimize}
        setOptimize={mu.handleMuOptimizeChange}
        value={mu.value}
        setValue={mu.handleMuValueChange}
        minValue={mu.minValue}
        setMinValue={mu.handleMuMinChange}
        maxValue={mu.maxValue}
        setMaxValue={mu.handleMuMaxChange}
      />
      <KineticParameterOptimization
        symbol={"Y"}
        optimize={biomassYield.optimize}
        setOptimize={biomassYield.handleBiomassYieldOptimizeChange}
        value={biomassYield.value}
        setValue={biomassYield.handleBiomassYieldValueChange}
        minValue={biomassYield.minValue}
        setMinValue={biomassYield.handleBiomassYieldMinChange}
        maxValue={biomassYield.maxValue}
        setMaxValue={biomassYield.handleBiomassYieldMaxChange}
      />
      <KineticParameterOptimization
        symbol={"Yp"}
        optimize={productYield.optimize}
        setOptimize={productYield.handleProductYieldOptimizeChange}
        value={productYield.value}
        setValue={productYield.handleProductYieldValueChange}
        minValue={productYield.minValue}
        setMinValue={productYield.handleProductYieldMinChange}
        maxValue={productYield.maxValue}
        setMaxValue={productYield.handleProductYieldMaxChange}
      />
      <KineticParameterOptimization
        symbol={"Ks"}
        optimize={satConst.optimize}
        setOptimize={satConst.handleSatConstOptimizeChange}
        value={satConst.value}
        setValue={satConst.handleSatConstValueChange}
        minValue={satConst.minValue}
        setMinValue={satConst.handleSatConstMinChange}
        maxValue={satConst.maxValue}
        setMaxValue={satConst.handleSatConstMaxChange}
      />

      {model === "inhibition" && (
        <KineticParameterOptimization
          symbol={"Ki"}
          optimize={inhibitionConst.optimize}
          setOptimize={inhibitionConst.handleInhibitionConstOptimizeChange}
          value={inhibitionConst.value}
          setValue={inhibitionConst.handleInhibitionConstValueChange}
          minValue={inhibitionConst.minValue}
          setMinValue={inhibitionConst.handleInhibitionConstMinChange}
          maxValue={inhibitionConst.maxValue}
          setMaxValue={inhibitionConst.handleInhibitionConstMaxChange}
        />
      )}
    </div>
  );
};
export default KineticParametersInputFields;
