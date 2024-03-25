import {
  Box,
  DataChart,
  Paragraph,
  Select,
  Tab,
  Tabs,
  TextInput,
} from "grommet";
import { Copy } from "grommet-icons";
import { Form } from "kea-forms";
import React from "react";
import { useCopyToClipboard, useMeasure, useSize } from "react-use";
import { styled, useTheme } from "styled-components";
import {
  container,
  fluidLogic,
  fluidValue,
  sizeUnits,
  useFluidValues,
} from "../../../logics/fluidLogic";
import { Font } from "../../../theme/constants";
import { useThemeContext } from "../../../theme/theme";
import { themeColor } from "../../../utils/styled";
import { Field } from "../../forms/Field";
import { Button } from "../../general/button";
import { ErrorBoundary } from "../../general/errorBoundary";

const FormulaInput = styled(TextInput)`
  font-family: ${Font.Mono};
`;

export function FluidCalculator() {
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const {
    clampFormula,
    containerTarget: containerType,
    chartData,
    chartBounds,
    chartSeries,
    chartAxes,
    chartType,
    chartGuide,
    sizeMin,
    sizeMax,
    containerMin,
    containerMax,
  } = useFluidValues();
  const isViewportUnit = containerType === "viewport";
  const theme = useThemeContext();
  const [state, copyToClipboard] = useCopyToClipboard();

  const dataWithCurrent = React.useMemo(() => {
    return chartData.reduce<
      {
        current: boolean;
        screenSize: number;
        target: number;
      }[]
    >((data, current, index) => {
      const next = chartData.at(index + 1);
      if (!current) {
        return data;
      }
      if (!next) {
        return [...data, current];
      }
      if (current.screenSize === width) {
        const target = fluidValue(
          width,
          [containerMin, sizeMin],
          [containerMax, sizeMax]
        );

        return [
          ...data,
          {
            screenSize: width,
            target,
            current: true,
          },
        ];
      }
      if (current.screenSize < width && next.screenSize > width) {
        const target = fluidValue(
          width,
          [containerMin, sizeMin],
          [containerMax, sizeMax]
        );

        return [
          ...data,
          current,
          {
            screenSize: width,
            target,
            current: true,
          },
        ];
      }
      return [
        ...data,
        current,
        {
          screenSize:
            current.screenSize + (next.screenSize - current.screenSize) / 2,
          target: current.target + (next.target - current.target) / 2,
          current: false,
        },
      ];
    }, []);
  }, [chartData, width, containerMin, sizeMin]);

  return (
    <Box flex="grow">
      <Form logic={fluidLogic} formKey={"fluidLogicForm"}>
        <Box
          direction="row"
          gap="large"
          pad="large"
          align="stretch"
          fill
          width={"clamp(350px, 50%,  700px)"}
        >
          <Tabs flex="grow">
            <Tab title="Target">
              <Box flex="grow" gap="medium">
                <Field name={"sizeMin"} label="Minimum Size">
                  {({ name, id, value, onChangeEvent: onChange }) => (
                    <TextInput
                      id={id ?? name}
                      type="number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                </Field>
                <Field name={"sizeMax"} label="Maximum Size">
                  {({ name, id, value, onChangeEvent: onChange }) => (
                    <TextInput
                      id={id ?? name}
                      type="number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                </Field>
                <Box direction="row-responsive" gap="medium">
                  <Field name={"sizeUnits"} label="Size Units">
                    {({ name, id, value, onChange }) => (
                      <Select
                        id={id ?? name}
                        options={sizeUnits}
                        value={value}
                        onChange={({ option }) => onChange(option)}
                        alignSelf="stretch"
                      ></Select>
                    )}
                  </Field>
                  <Field name={"rootFontSize"} label="Root Font Size (px)">
                    {({ name, id, value, onChangeEvent: onChange }) => (
                      <TextInput
                        id={id ?? name}
                        type="number"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  </Field>
                </Box>
              </Box>
            </Tab>
            <Tab title="Container">
              <Box flex="grow" gap="medium">
                <Field name={"containerMin"} label="Minimum Size">
                  {({ name, id, value, onChangeEvent: onChange }) => (
                    <TextInput
                      id={id ?? name}
                      type="number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                </Field>
                <Field name={"containerMax"} label="Maximum Size">
                  {({ name, id, value, onChangeEvent: onChange }) => (
                    <TextInput
                      id={id ?? name}
                      type="number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                </Field>
                <Field name={"container"} label="Relative To">
                  {({ name, id, value, onChange }) => (
                    <Select
                      id={id ?? name}
                      options={container}
                      value={value}
                      onChange={({ option }) => onChange(option)}
                      alignSelf="stretch"
                    ></Select>
                  )}
                </Field>
              </Box>
            </Tab>
          </Tabs>

          <ErrorBoundary>
            <Box flex="grow" justify="center" align="center">
              <DataChart
                series={chartSeries}
                data={dataWithCurrent}
                bounds={chartBounds}
                chart={chartType}
                guide={chartGuide}
                axis={chartAxes}
              ></DataChart>
            </Box>
          </ErrorBoundary>
        </Box>
      </Form>
      <Box
        as="output"
        direction="column"
        justify="center"
        align="center"
        gap="medium"
      >
        <Box
          direction="row"
          align="stretch"
          justify="center"
          gap="xsmall"
          width={"fit-content"}
        >
          <FormulaInput
            width={`${clampFormula.length + 2}ch`}
            value={clampFormula}
          ></FormulaInput>
          <Button
            secondary
            round="xsmall"
            icon={<Copy />}
            onClick={() => copyToClipboard(clampFormula)}
          />
        </Box>
        <Box
          ref={containerRef}
          fill
          style={{
            resize: isViewportUnit ? "none" : "horizontal",
            overflow: isViewportUnit ? "auto" : "hidden",
            container: "output / inline-size",
          }}
          alignSelf="center"
        >
          <Paragraph
            fill
            style={{
              fontSize: clampFormula,
              lineHeight: "1.2em",
              padding: "0.5em 1em",
              margin: "10px",
              borderRadius: "0.5em",
              outline: `1px solid ${themeColor("primary")({ theme })}`,
            }}
          >
            {containerType === "viewport" &&
              "Resize the window to see this in action."}
            {containerType === "container" &&
              "Resize this element to see this in action."}{" "}
            The font-size, border-radius, and padding all change as the
            container is resized.
          </Paragraph>
        </Box>
      </Box>
    </Box>
  );
}
