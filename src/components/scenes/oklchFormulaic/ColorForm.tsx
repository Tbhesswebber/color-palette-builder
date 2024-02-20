import { oklchFormLogic } from "../../../logics/oklchFormLogic";
import { Form } from "kea-forms";
import React from "react";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Field } from "../../forms/Field";
import { RangeInput } from "../../forms/RangeInput";
import { FormulaInput } from "../../forms/FormulaInput";
import { Code } from "../../typography/code";
import { ControlGridArea, useRangeGrid } from "./hooks/useRangeGrid";

export function ColorForm() {
  const size = React.useContext(ResponsiveContext);

  const rangeGrid = useRangeGrid();

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
                <p>
                  <Code>x</Code> is the 0-based index of the current tint
                </p>
                <p>
                  <Code>y</Code> is the total number of tints
                </p>
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
                <p>
                  <Code>x</Code> is the 0-based index of the current tint
                </p>
                <p>
                  <Code>y</Code> is the total number of tints
                </p>
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
