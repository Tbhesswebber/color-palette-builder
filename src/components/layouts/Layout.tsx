import { Grommet, Box, Header, Nav } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import styled from "styled-components";
import { GlobalStyles } from "../../theme/globalStyles";
import { ModeToggle, useModeToggle } from "../ModeToggle";
import { useComputedTheme } from "../../hooks/useComputedTheme";
import { Routes } from "../../router";
import { Menu, MenuProps } from "../Menu";
import { Anchor } from "../general/anchor";
import { useWindowSize } from "react-use";
import { VisuallyHidden } from "../a11y/VisuallyHidden";

interface LayoutProps {
  children: React.ReactNode;
}

const AppWrapper = styled(Box)`
  height: fit-content;
  min-height: 100dvh;
  max-width: 100vw;
`;

const colorToolMenuItems: MenuProps["items"] = [
  { label: "Oklch Palette Builder", href: Routes.OklchImplicit },
  { label: "Oklch Mathematical Palette Builder", href: Routes.OklchFormulaic },
];

const fluidDesignMenuItems: MenuProps["items"] = [
  { label: "Fluid Design Calculator", href: Routes.FluidDesign },
];

const collapsedMenuItems: MenuProps["items"] = [
  colorToolMenuItems,
  [],
  fluidDesignMenuItems,
];

export function Layout({ children }: LayoutProps) {
  const [mode, toggle] = useModeToggle();
  const [{ theme, cssVars }] = useComputedTheme();
  const { width: windowWidth } = useWindowSize();
  const shouldCollapseMenu = windowWidth < 900;

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
        align="stretch"
        justify="stretch"
        flex="grow"
      >
        <Header>
          <Anchor href="/" color="text">
            Color Palette Builder
          </Anchor>
          {!shouldCollapseMenu && (
            <Nav direction="row" align="stretch" flex="grow">
              <Menu
                size="small"
                label="Color Tools"
                items={colorToolMenuItems}
              />
              <Menu
                size="small"
                label="Box Shadow Generator"
                disabled
                items={[]}
              />
              <Menu
                size="small"
                label="Fluid Design Calculator"
                items={fluidDesignMenuItems}
              />
            </Nav>
          )}
          <Box direction="row">
            {shouldCollapseMenu && (
              <Menu
                icon={<MenuIcon color="text"/>}
                showBorder={false}
                label={<VisuallyHidden>Main</VisuallyHidden>}
                items={collapsedMenuItems}
                size="small"
              ></Menu>
            )}
            <ModeToggle mode={mode} toggle={toggle} floating={!shouldCollapseMenu}/>
          </Box>
        </Header>
        {children}
      </AppWrapper>
    </Grommet>
  );
}
