import { useContext, useEffect } from "react";
import { MCDataContext } from "../../lib/contexts/MCDataContext";
import { MediaOptFormContext } from "../../lib/contexts/MediaOptFormContext";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledLRVariablesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const LinearRegressionVariablesInputFields = () => {
  const {
    xAxisVar,
    yAxisVar,
    zAxisVar,
    handleChangeAxisVariable,
    experimentalMCData,
  } = useContext(MCDataContext);

  const { register, setValue } = useContext(MediaOptFormContext);

  useEffect(() => {
    setValue("x_var", xAxisVar);
    setValue("y_var", yAxisVar);
    setValue("z_var", zAxisVar);
  }, [xAxisVar, yAxisVar, zAxisVar, setValue]);

  const variables = Object.keys(experimentalMCData);

  return (
    <StyledLRVariablesWrapper>
      <Form.Group>
        <Form.Label>X-Axis:</Form.Label>
        <Form.Control
          as="select"
          type="text"
          {...register("x_var")}
          value={xAxisVar}
          onChange={(e) => handleChangeAxisVariable("xAxisVar", e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Y-Axis:</Form.Label>
        <Form.Control
          as="select"
          type="text"
          {...register("y_var")}
          value={yAxisVar}
          onChange={(e) => handleChangeAxisVariable("yAxisVar", e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Z-Axis:</Form.Label>
        <Form.Control
          as="select"
          type="text"
          {...register("z_var")}
          value={zAxisVar}
          onChange={(e) => handleChangeAxisVariable("zAxisVar", e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </StyledLRVariablesWrapper>
  );
};
export default LinearRegressionVariablesInputFields;
