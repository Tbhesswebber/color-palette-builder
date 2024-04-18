import React from "react";
import { ColorForm, ColorFormProps } from "./ColorForm";
import { ColorPage, ColorPageGrid } from "../ColorPage";
import { Box, BoxProps, Grid, GridExtendedProps, Heading } from "grommet";
import { styled } from "styled-components";

const Layout = styled(Grid)`
  form {
    display: contents;
    max-height: 100%;
    overflow-y: auto;
  }
`;

const layoutProps: GridExtendedProps = {
  width: { max: "100vw" },
  rows: ["5fr", "2fr"],
  columns: ["max-content", "clamp(100px, 12.5vw + 3.91rem, 250px)", "1fr"],
  areas: [
    { name: "form", start: [0, 0], end: [0, 1] },
    { name: ColorPageGrid.Colors, start: [2, 0], end: [2, 0] },
    { name: ColorPageGrid.Greys, start: [1, 0], end: [1, 1] },
    { name: ColorPageGrid.System, start: [2, 1], end: [2, 1] },
  ],
};

export function OklchImplicit(): JSX.Element {
  return (
    (<Layout gap="xsmall"  {...layoutProps}>
      <><ColorPage>
          <ColorForm gridArea="form" direction="column" wrap={false}/>
        </ColorPage></>
    </Layout>)
  );
}
