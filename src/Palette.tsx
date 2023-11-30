import React from "react";
import { Box } from "grommet";

interface PaletteProps {
  count: number;
  prefix: string;
}

export function Palette({ count, prefix }: PaletteProps) {
  const colors = React.useMemo(
    () =>
      Array.from(
        { length: count },
        (_, index): JSX.Element => (
          <Box
            key={`var(--${prefix}_${index})`}
            flex="grow"
            background={`var(--${prefix}_${index})`}
          ></Box>
        )
      ),
    [count, prefix]
  );

  return (
    <Box fill flex gap="xsmall">
      {colors}
    </Box>
  );
}
