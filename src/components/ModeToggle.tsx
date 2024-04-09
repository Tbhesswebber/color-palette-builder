import { Box, BoxExtendedProps, Button, ButtonExtendedProps } from "grommet";
import { Moon, Sun } from "grommet-icons";
import React from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import { themeColor } from "../utils/styled";

interface ModeToggleProps extends ButtonExtendedProps {
  mode: "light" | "dark" | "system";
  toggle: () => void;
  floating?: boolean;
}

const ToggleButton = styled<React.FC<Omit<ModeToggleProps, "toggle">>>(Button)`
  border-radius: 50%;

  & svg {
    fill: ${themeColor("text")};
    stroke: ${themeColor("text")};
  }

  ${({ floating }) => (floating ? "" : "box-shadow: none;")}
`;

export function ModeToggle({ mode, toggle, floating = true }: ModeToggleProps) {
  
    return (
      <ToggleButton
        a11yTitle={`Toggle ${mode === "light" ? "dark" : "light"} mode`}
        icon={mode === "light" ? <Moon /> : <Sun />}
        mode={mode}
        size="medium"
        floating={floating}
        onClick={() => {
          if (
            document &&
            "startViewTransition" in document &&
            typeof document.startViewTransition === "function"
          ) {
            document.startViewTransition(toggle);
          } else {
            toggle();
          }
        }}
      />
    );
}

export function useModeToggle(): ["light" | "dark", () => void] {
  const [mode, toggle] = React.useReducer(
    (prevState): "light" | "dark" => {
      return prevState === "light" ? "dark" : "light";
    },
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  React.useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", toggle);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", toggle);
    };
  }, []);

  return [mode, toggle];
}
