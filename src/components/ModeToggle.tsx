import { Box, BoxExtendedProps, Button } from "grommet";
import { Moon, Sun } from "grommet-icons";
import React from "react";
import { useMedia } from "react-use";
import styled from "styled-components";

interface ModeToggleProps {
  mode: "light" | "dark" | "system";
  toggle: () => void;
}

const ToggleButton = styled(Button)`
  border-radius: 50%;
`;

export function ModeToggle({ mode, toggle }: ModeToggleProps) {
  
    return (
      <ToggleButton
        a11yTitle={`Toggle ${mode === "light" ? "dark" : "light"} mode`}
        icon={mode === "light" ? <Moon /> : <Sun />}
        size="medium"
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
