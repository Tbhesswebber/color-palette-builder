import {
  Grommet,
  Box,
  Header,
  Nav,
  MenuProps,
} from "grommet";
import styled from "styled-components";
import { GlobalStyles } from "../../theme/globalStyles";
import { ModeToggle, useModeToggle } from "../ModeToggle";
import { useComputedTheme } from "../../hooks/useComputedTheme";
import { Routes } from "../../router";
import { Menu } from "../Menu";
import { Anchor } from "../general/anchor";

interface LayoutProps {
  children: React.ReactNode;
}

const AppWrapper = styled(Box)`
  height: fit-content;
  min-height: 100dvh;
  max-width: 100vw;
`;

const colorToolMenuItems: MenuProps["items"] = [
{label: "Oklch Palette Builder", href: Routes.OklchImplicit},
{label: "Oklch Mathematical Palette Builder", href: Routes.OklchFormulaic},
]

export function Layout({ children }: LayoutProps) {
  const [mode, toggle] = useModeToggle();
  const [{ theme, cssVars }] = useComputedTheme();


  return (
    <Grommet
      full
      options={{
        box: { cssGap: true },
        drop: { checkContainingBlock: true },
      }}
      theme={theme}
      themeMode={mode}
    >
      <GlobalStyles vars={cssVars} />
      <AppWrapper
        direction="column"
        pad="medium"
        gap="medium"
        background={{ dark: "black", light: "white" }}
        align="stretch"
        justify="stretch"
        flex="grow"
      >
        <Header>
          <Anchor href="/" color="text">Color Palette Builder</Anchor>
          <Nav direction="row" align="start" flex="grow">
            <Menu label="Color Tools" items={colorToolMenuItems}/>
            <Menu label="Box Shadow Generator" disabled items={[]}/>
            <Menu label="Fluid Design Calculator" disabled items={[]}/>
          </Nav>
          <ModeToggle mode={mode} toggle={toggle} />
        </Header>
        {children}
      </AppWrapper>
    </Grommet>
  );
}
