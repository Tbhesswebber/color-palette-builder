import { useActions, useValues } from "kea";
import { oklchFormLogic } from "./logics/oklchFormLogic";
import {
  Field as KeaField,
  Form,
  FieldProps,
  ChildFunctionProps,
} from "kea-forms";
import React, { useContext } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  RangeInput as GRangeInput,
  Heading,
  Paragraph,
  ResponsiveContext,
  Grid,
  TextInput,
  MaskedInput,
  BoxExtendedProps,
  Text,
} from "grommet";
import { Subtract, Add } from "grommet-icons";

function Code(props: BoxExtendedProps) {
  return (
    <Box
      pad={{ horizontal: "0.2rem", vertical: "0.1rem" }}
      round="xxsmall"
      style={{ display: "inline-block", lineHeight: "1em" }}
      as="code"
      background="grey"
      margin={{ horizontal: "hair" }}
      {...props}
    />
  );
}

interface InputProps {
  name: string;
  id: string;
}

interface NumberInputProps extends InputProps {
  min: number | `${number}`;
  max: number | `${number}`;
  step: number | `${number}`;
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

function RangeInput({
  value,
  onChange,
  min,
  max,
  step,
}: Partial<ChildFunctionProps> & NumberInputProps) {
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
        size="medium"
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
          value={value}
          onChange={({ target: { value } }) => onChange && onChange(value)}
        />
        <Box direction="row" fill justify="between">
          <Paragraph size="small">{min}</Paragraph>
          <Paragraph size="small">{max}</Paragraph>
        </Box>
      </Box>
      <Button
        className="button"
        disabled={Number(value) >= Number(max)}
        icon={<Add color="control" />}
        onClick={() => {
          console.log(value);
          onChange && onChange(Number(value) + Number(step));
        }}
        alignSelf="start"
        secondary
        hoverIndicator={{ elevation: "small", background: {} }}
      />
    </RangeInputContainer>
  );
}

function FormulaInput({
  value,
  onChange,
  name,
  id,
}: Partial<ChildFunctionProps> & InputProps) {
  return (
    <MaskedInput
      value={value}
      name={name}
      id={id}
      onChange={({ target }) => onChange && onChange(target.value)}
      mask={[{ fixed: "f(x,y)=" }, { regexp: /.*/ }]}
    />
  );
}

function Field(props: Omit<FieldProps, "template"> & { area?: string }) {
  const template: FieldProps["template"] = React.useCallback(
    ({
      label,
      hint,
      error,
      kids,
    }: Parameters<Required<FieldProps>["template"]>[0]) => {
      return (
        <Box fill gridArea={props.area} justify="end">
          <Heading level={4}>{label}</Heading>
          {kids as React.ReactNode}
          {error && (
            <Paragraph
              margin={{ vertical: "xsmall" }}
              fill
              color={"error"}
              size="small"
            >
              {error}
            </Paragraph>
          )}
          {hint && (
            <Paragraph
              margin={{ vertical: "xsmall" }}
              fill
              color={"hint"}
              size="small"
            >
              {hint}
            </Paragraph>
          )}
        </Box>
      );
    },
    []
  );

  return <KeaField {...props} template={template} />;
}

const enum ControlGridArea {
  TintCount = "tintCount",
  CenterPoint = "centerPoint",
  AnalogousHueCount = "analogousHueCount",
  AnalogousHueGap = "analogousHueGap",
  ComplementaryHueCount = "complementaryHueCount",
  ComplementaryHueGap = "complementaryHueGap",
}

const smallGridAreas = [
  [ControlGridArea.TintCount],
  [ControlGridArea.CenterPoint],
  [ControlGridArea.AnalogousHueCount],
  [ControlGridArea.AnalogousHueGap],
  [ControlGridArea.ComplementaryHueCount],
  [ControlGridArea.ComplementaryHueGap],
];
const mediumGridAreas = [
  [ControlGridArea.TintCount, ControlGridArea.CenterPoint],
  [ControlGridArea.AnalogousHueCount, ControlGridArea.AnalogousHueGap],
  [ControlGridArea.ComplementaryHueCount, ControlGridArea.ComplementaryHueGap],
];
const largeGridAreas = [
  [
    ControlGridArea.TintCount,
    ControlGridArea.AnalogousHueCount,
    ControlGridArea.ComplementaryHueCount,
  ],
  [
    ControlGridArea.CenterPoint,
    ControlGridArea.AnalogousHueGap,
    ControlGridArea.ComplementaryHueGap,
  ],
];

export function ColorForm() {
  const size = React.useContext(ResponsiveContext);
  const rangeGrid = React.useMemo(() => {
    if (size === "small") {
      return {
        columns: ["1fr"],
        rows: "fit-content",
        areas: smallGridAreas,
      };
    }
    if (size === "medium") {
      return {
        columns: ["1fr", "1fr"],
        rows: "fit-content",
        areas: mediumGridAreas,
      };
    }
    return {
      columns: ["1fr", "1fr", "1fr"],
      rows: "fit-content",
      areas: largeGridAreas,
    };
  }, [size]);

  return (
    <Form logic={oklchFormLogic} formKey="colorForm" enableFormOnSubmit>
      <Box direction="column" flex>
        <Grid
          columns={rangeGrid.columns}
          rows={rangeGrid.rows}
          areas={rangeGrid.areas}
        >
          <Field
            name={ControlGridArea.TintCount}
            label="Colors Per Hue"
            area={rangeGrid.areas ? ControlGridArea.TintCount : undefined}
          >
            <RangeInput
              min="5"
              max="15"
              name="tintCount"
              id="tintCount"
              step="1"
            ></RangeInput>
          </Field>
          <Field
            name={ControlGridArea.CenterPoint}
            label="Origin"
            area={rangeGrid.areas ? ControlGridArea.CenterPoint : undefined}
          >
            <RangeInput
              min="0"
              max="360"
              step="1"
              name="centerPoint"
              id="centerPoint"
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.AnalogousHueCount}
            label="Analogous Hues"
            area={
              rangeGrid.areas ? ControlGridArea.AnalogousHueCount : undefined
            }
          >
            <RangeInput
              min="0"
              max="10"
              step="1"
              name="analogousHueCount"
              id="analogousHueCount"
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.AnalogousHueGap}
            label="Analogous Hue Spacing"
            area={rangeGrid.areas ? ControlGridArea.AnalogousHueGap : undefined}
          >
            <RangeInput
              min="1"
              max="90"
              step="1"
              name="analogousHueGap"
              id="analogousHueGap"
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.ComplementaryHueCount}
            label="Complementary Hues"
            area={
              rangeGrid.areas
                ? ControlGridArea.ComplementaryHueCount
                : undefined
            }
          >
            <RangeInput
              min="0"
              max="10"
              step="1"
              name={ControlGridArea.ComplementaryHueCount}
              id={ControlGridArea.ComplementaryHueCount}
            ></RangeInput>
          </Field>

          <Field
            name={ControlGridArea.ComplementaryHueGap}
            label="Complementary Hue Spacing"
            area={
              rangeGrid.areas ? ControlGridArea.ComplementaryHueGap : undefined
            }
          >
            <RangeInput
              min="1"
              max="90"
              step="1"
              name="complementaryHueGap"
              id="complementaryHueGap"
            ></RangeInput>
          </Field>
        </Grid>

        <Box direction={size === "large" ? "row" : "column"} gap="medium">
          <Field
            name={"chromaFormula"}
            label="Chroma Formula"
            hint={
              <>
                Make sure that your formula takes the form <Code>f(x,y)=</Code>
              </>
            }
          >
            <FormulaInput
              name="chromaFormula"
              id="chromaFormula"
            ></FormulaInput>
          </Field>

          <Field
            name={"lightnessFormula"}
            label="Lightness Formula"
            hint={
              <>
                Make sure that your formula takes the form <Code>f(x,y)=</Code>
              </>
            }
          >
            <FormulaInput
              name="lightnessFormula"
              id="lightnessFormula"
            ></FormulaInput>
          </Field>
        </Box>
      </Box>
    </Form>
  );
}
