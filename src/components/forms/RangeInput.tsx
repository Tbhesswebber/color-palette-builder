import {
  ChildFunctionProps,
} from "kea-forms";
import React, { useContext } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  RangeInput as GRangeInput,
  Paragraph,
  ResponsiveContext,
} from "grommet";
import { Subtract, Add } from "grommet-icons";
import { InputProps } from "./types";

interface NumberInputProps extends InputProps {
  min: number | `${number}`;
  max: number | `${number}`;
  step: number | `${number}`;
}

interface RangeInputProps extends NumberInputProps {
  minLabel?: string | number;
  maxLabel?: string | number;
  showBounds?: boolean;
}

const RangeInputContainer = styled(Box)`
  container-type: inline-size;
  container-name: range-input-container;

  .button {
    display: none;
    border-radius: 100%;
  }

  @container range-input-container (width > 300px) {
    .button {
      display: revert;
    }
  }
`;

export function RangeInput({
  value,
  onChange,
  min,
  max,
  minLabel,
  maxLabel,
  showBounds,
  step,
}: Partial<ChildFunctionProps> & RangeInputProps) {
  const size = useContext(ResponsiveContext);

  return (
    <RangeInputContainer
      direction="row"
      align="start"
      pad="small"
      gap={"small"}
    >
      <Button
        className="button"
        disabled={Number(value) <= Number(min)}
        icon={<Subtract color="control" />}
        onClick={() => {
          onChange && onChange(Number(value) - Number(step));
        }}
        size={size === "small" ? "small" : "medium"}
        alignSelf="start"
        secondary
        hoverIndicator={{ elevation: "small", background: {} }}
      />
      <Box align="center" width="small" flex direction="column">
        <GRangeInput
          a11yTitle="Select range value"
          min={min}
          max={max}
          step={Number(step)}
          color="control"
          value={String(value)}
          onChange={({ target: { value } }) => onChange && onChange(value)}
        />
        <Box direction="row" fill justify="between">
          {showBounds !== false && <Paragraph size="small">{minLabel ?? min}</Paragraph>}
          {showBounds !== false && <Paragraph size="small">{maxLabel ?? max}</Paragraph>}
        </Box>
      </Box>
      <Button
        className="button"
        disabled={Number(value) >= Number(max)}
        icon={<Add color="control" />}
        onClick={() => {
          onChange && onChange(Number(value) + Number(step));
        }}
        size={size === "small" ? "small" : "medium"}
        alignSelf="start"
        secondary
        hoverIndicator={{ elevation: "small", background: {} }}
      />
    </RangeInputContainer>
  );
}
