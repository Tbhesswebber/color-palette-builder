import { Form } from "kea-forms";
import React from "react";
import { Box, BoxProps, Grid, Tab, Tabs, TextInput } from "grommet";
import { Field } from "../../forms/Field";
import { RangeInput } from "../../forms/RangeInput";
import { Code } from "../../typography/code";
import { ControlGridArea, useRangeGrid } from "./hooks/useRangeGrid";
import { BezierCurve, BezierValue } from "../../forms/BezierCurve";
import { oklchImplicitFormLogic } from "../../../logics/oklchImplicitLogic";
import { VisuallyHidden } from "../../a11y/VisuallyHidden";

export type ColorFormProps = BoxProps;

const contentWidth = {
  min: "fit-content",
} as const;

export function ColorForm(props: ColorFormProps) {
  const rangeGrid = useRangeGrid("small");

  return (
    <Form logic={oklchImplicitFormLogic} formKey="colorForm" enableFormOnSubmit>
      <Box direction="row" gap="xsmall" align="center" justify="between" wrap {...props}>
        <Grid
          fill="horizontal"
          columns={rangeGrid.columns}
          rows={rangeGrid.rows}
          areas={rangeGrid.areas}
          gap="xsmall"
          justify="start"
        >
          <Field
            name={ControlGridArea.TintCount}
            label="Colors Per Hue"
            area={rangeGrid.areas ? ControlGridArea.TintCount : undefined}
          >
            {({ value, onChangeEvent: onChange }) => (
              <TextInput
                type="number"
                min="5"
                max="15"
                name="tintCount"
                id="tintCount"
                step="1"
                value={value}
                onChange={onChange}
                size="small"
              ></TextInput>
            )}
          </Field>
          <Field
            name={ControlGridArea.CenterPoint}
            label="Primary Hue"
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
            {({ value, onChangeEvent: onChange }) => (
              <TextInput
                type="number"
                min="0"
                max="10"
                step="1"
                name="analogousHueCount"
                id="analogousHueCount"
                value={value}
                onChange={onChange}
                size="small"
              ></TextInput>
            )}
          </Field>

          <Field
            name={ControlGridArea.AnalogousHueGap}
            label="Analogous Hue Difference"
            area={rangeGrid.areas ? ControlGridArea.AnalogousHueGap : undefined}
          >
            <RangeInput
              min="0.01"
              minLabel={"Min Possible"}
              max="1"
              maxLabel={"Max Possible"}
              step="0.01"
              name="analogousHueGap"
              id="analogousHueGap"
              showBounds={false}
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
            {({ value, onChangeEvent: onChange }) => (
              <TextInput
                type="number"
                min="0"
                max="10"
                step="1"
                name={ControlGridArea.ComplementaryHueCount}
                id={ControlGridArea.ComplementaryHueCount}
                value={value}
                onChange={onChange}
                size="small"
              ></TextInput>
            )}
          </Field>

          <Field
            name={ControlGridArea.ComplementaryHueGap}
            label="Complementary Hue Difference"
            area={
              rangeGrid.areas ? ControlGridArea.ComplementaryHueGap : undefined
            }
          >
            <RangeInput
              min="0.01"
              minLabel={"Min Possible"}
              max="1"
              maxLabel={"Max Possible"}
              step="0.01"
              name="complementaryHueGap"
              id="complementaryHueGap"
            ></RangeInput>
          </Field>
        </Grid>

        <Tabs>
          <Tab title="Chroma">
            <Field
              name={"chromaFormula"}
              label={<VisuallyHidden>Chroma Shift</VisuallyHidden>}
              hint={
                <>
                  The <Code>x</Code>-axis represents the tint progression
                  <br />
                  The <Code>y</Code>-axis represents the chroma
                </>
              }
              stack
              width={contentWidth}
              flex="grow"
              align={"center"}
            >
              {({ value, onChange }) => (
                <BezierCurve
                  value={value}
                  handleChange={(value: BezierValue) => {
                    value.splice(0, 1, 0);
                    value.splice(-2, 1, 1);
                    onChange(value);
                  }}
                  allowNodeEditing
                />
              )}
            </Field>
          </Tab>

          <Tab title="Lightness">
            <Field
              name={"lightnessFormula"}
              label={<VisuallyHidden>Lightness Shift</VisuallyHidden>}
              hint={
                <>
                  The <Code>x</Code>-axis represents the tint progression
                  <br />
                  The <Code>y</Code>-axis represents the lightness
                </>
              }
              stack
              width={contentWidth}
              flex="grow"
              align={"center"}
            >
              {({ value, onChange }) => (
                <BezierCurve value={value} handleChange={onChange} />
              )}
            </Field>
          </Tab>

          <Tab title="Hue">
            <Field
              name={"hueFormula"}
              label={<VisuallyHidden>Hue Shift</VisuallyHidden>}
              hint={
                <>
                  The <Code>x</Code>-axis represents the tint progression
                  <br />
                  The <Code>y</Code>-axis represents the hue
                </>
              }
              stack
              width={contentWidth}
              flex="grow"
              align={"center"}
            >
              {({ value, onChange }) => (
                <BezierCurve
                  value={value}
                  handleChange={(value: BezierValue) => {
                    value.splice(0, 1, 0);
                    value.splice(-2, 1, 1);
                    onChange(value);
                  }}
                  allowNodeEditing
                />
              )}
            </Field>
          </Tab>
        </Tabs>
      </Box>
    </Form>
  );
}
