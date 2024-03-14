import React from "react";
import { ColorForm } from "./ColorForm";
import { ColorPage } from "../ColorPage";
import { Heading } from "grommet";

export function OklchImplicit(): JSX.Element {
  return (
    <ColorPage>
      <ColorForm />
    </ColorPage>
  );
}
