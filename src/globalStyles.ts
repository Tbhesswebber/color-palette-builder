import { createGlobalStyle } from "styled-components";
import { props } from "./utils/styled";

export const GlobalStyles = createGlobalStyle<{vars: string}>`
    :root {
        ${props("vars", "")}
    }

    html, body, #root {
        min-height: 100vh;
        min-width: 100vw;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;
