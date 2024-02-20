import { Box, BoxExtendedProps } from "grommet";

export function Code(props: BoxExtendedProps) {
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
