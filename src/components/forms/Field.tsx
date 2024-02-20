import {
  Field as KeaField,
  FieldProps,
} from "kea-forms";
import React from "react";
import {
  Box,
  Heading,
  Paragraph,
} from "grommet";

export function Field(props: Omit<FieldProps, "template"> & { area?: string }) {
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

  return <KeaField {...props} template={template} noStyle />;
}
