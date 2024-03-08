import { Box, Button } from "grommet";
import { Moon, Sun } from "grommet-icons";
import React from "react";
import { useMedia } from "react-use";
import styled from "styled-components";

interface ModeToggleProps {
  mode: "light" | "dark" | "system";
  toggle: () => void;
}

const ModeToggleContainer = styled(Box)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  overflow: hidden;
  isolation: isolate;
  z-index: 2;

  transition: box-shadow 100ms ease-in-out;
  will-change: box-shadow;

  :hover {
    transition-duration: 300ms;
  }
`;

export function ModeToggle({ mode, toggle }: ModeToggleProps) {
  return (
    <ModeToggleContainer
      round="full"
      elevation="large"
      hoverIndicator={{ elevation: "small" }}
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
    >
      <Button
        icon={mode === "light" ? <Moon /> : <Sun />}
        primary
        pad="small"
      />
    </ModeToggleContainer>
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
