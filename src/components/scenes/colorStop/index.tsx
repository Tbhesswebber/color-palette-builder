import {
  Box,
  Heading,
  MaskedInput,
  Paragraph,
  Tab,
  Tabs,
  TextInput,
} from "grommet";
import { Brush, Square } from "grommet-icons";
import { Form } from "kea-forms";
import React from "react";
import { styled } from "styled-components";
import {
  colorStopLogic,
  useColorStopActions,
  useColorStopValues,
} from "../../../logics/colorStopLogic";
import { Field } from "../../forms/Field";

const Swatch = styled(Box)``;

export function ColorStop() {
  const { colors } = useColorStopValues();

  return (
    <Box direction="column" fill gap="xsmall">
      <Form logic={colorStopLogic} formKey={"colorStop"}>
        <Box direction="row" gap="medium">
          <Field name={"from"} label="Start Color">
            {({ value, onChangeEvent }) => (
              <MaskedInput
                onChange={onChangeEvent}
                value={value}
                icon={<Brush color={value} size="large" />}
                reverse
              />
            )}
          </Field>
          <Field name="colorCount" label="Color Count">
            {({ value, onChangeEvent }) => (
              <TextInput
                type="number"
                min={1}
                value={value}
                onChange={onChangeEvent}
              />
            )}
          </Field>
          <Field name={"to"} label="End Color">
            {({ value, onChangeEvent }) => (
              <MaskedInput
                onChange={onChangeEvent}
                value={value}
                icon={<Brush color={value} size="large" />}
                reverse
              />
            )}
          </Field>
        </Box>
      </Form>
      <Box
        as={"output"}
        height="small"
        align="stretch"
        justify="stretch"
        direction="row"
        gap="xsmall"
      >
        {colors.map(({ css }) => (
          <Swatch background={css} key={css} flex="grow"></Swatch>
        ))}
      </Box>

      <Box fill as={"output"} direction="column" gap="xsmall">
        <Heading level={2}>Color Vision Deficiency (CVD) Simulation</Heading>
        <Tabs flex="grow" >
          <Tab title="Protanopia">
            <Box
              margin={{ top: "small" }}
              as={"output"}
              height="small"
              align="stretch"
              justify="stretch"
              direction="row"
              gap="xsmall"
            >
              {colors.map(({ protanopiaCss }) => (
                <Swatch
                  background={protanopiaCss}
                  key={protanopiaCss}
                  flex="grow"
                ></Swatch>
              ))}
            </Box>
          </Tab>
          <Tab title="Deuteranopia">
            <Box
              margin={{ top: "small" }}
              as={"output"}
              height="small"
              align="stretch"
              justify="stretch"
              direction="row"
              gap="xsmall"
            >
              {colors.map(({ deuteranopiaCss }) => (
                <Swatch
                  background={deuteranopiaCss}
                  key={deuteranopiaCss}
                  flex="grow"
                ></Swatch>
              ))}
            </Box>
          </Tab>
          <Tab title="Tritanopia">
            <Box
              margin={{ top: "small" }}
              as={"output"}
              height="small"
              align="stretch"
              justify="stretch"
              direction="row"
              gap="xsmall"
            >
              {colors.map(({ tritanopiaCss }) => (
                <Swatch
                  background={tritanopiaCss}
                  key={tritanopiaCss}
                  flex="grow"
                ></Swatch>
              ))}
            </Box>
          </Tab>
        </Tabs>
        <Paragraph alignSelf="center">
          Please note that, it is often better to leverage textures and patterns and/or mechanisms to highlight related data on hover than to fiddle with colors that support CVDs.
        </Paragraph>
      </Box>
    </Box>
  );
}
