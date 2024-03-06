import { Field as KeaField, FieldProps as KeaFieldProps } from "kea-forms";
import React, { LabelHTMLAttributes } from "react";
import {
  Box,
  BoxExtendedProps,
  Heading,
  HeadingExtendedProps,
  Paragraph,
  Stack,
} from "grommet";
import { styled } from "styled-components";

const Label: React.FC<
  HeadingExtendedProps & Omit<LabelHTMLAttributes<HTMLHeadingElement>, "color">
> = styled(Heading).attrs({ as: "label" })`
  display: block;
  align-self: stretch;
`;

interface FieldProps
  extends Omit<KeaFieldProps, "template">,
    Omit<BoxExtendedProps, "children"> {
  area?: string;
  name: string;
  stack?: boolean;
}

const StackingBox = styled(Box)`
  display: grid;
  grid-template-areas: "label" "." "error" "hint";
  grid-template-rows: fit-content(0) 1fr fit-content(0) fit-content(0);

  & label {
    grid-area: label;
    z-index: 1;
  }

  & > :nth-child(n) {
    grid-column: 1 / -1;
  }

  & > :nth-child(n + 3) {
    z-index: 1;
  }

  & > :nth-child(2) {
    grid-row: 1 / -1;
  }

  &:has(> :nth-child(4)) > :nth-child(3) {
    grid-area: hint;
  }

  &:not(:has(> :nth-child(4))) > :nth-child(3) {
    grid-area: error;
  }

  &:has(> :nth-child(4)) > :nth-child(4) {
    grid-area: hint;
  }
`;

export function Field(props: FieldProps) {
  const { children, name, label, hint, area, stack, ...boxProps } = props;

  const template: KeaFieldProps["template"] = React.useCallback(
    ({
      label,
      hint,
      error,
      kids,
    }: Parameters<Required<KeaFieldProps>["template"]>[0]) => {
      const inputId = ("props" in kids && kids.props.id) ?? props.name;
      if (stack) {
        return (
          <Box {...boxProps} fill={!boxProps.width} gridArea={area}>
            <StackingBox fill={!boxProps.width}>
              <Label level={4} fill htmlFor={inputId}>
                {label}
              </Label>
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
            </StackingBox>
          </Box>
        );
      }
      return (
        <Box fill={!boxProps.width} {...boxProps} gridArea={area}>
          <Box
            fill={!boxProps.width}
            width="fit-content"
            justify="center"
            align="center"
          >
            <Label level={4} fill htmlFor={inputId}>
              {label}
            </Label>
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
        </Box>
      );
    },
    [props]
  );

  return (
    <KeaField {...props} template={template} noStyle>
      {children}
    </KeaField>
  );
}
