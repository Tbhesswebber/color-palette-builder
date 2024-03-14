import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { Scenes } from "./components/scenes/Scene";
import { Layout } from "./components/layouts/Layout";

export function App() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Layout>

      <Scenes />
      </Layout>
    </StyleSheetManager>
  );
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: any) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}
