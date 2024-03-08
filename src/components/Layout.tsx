import { ThemeType, Grommet, Box } from "grommet";
import styled from "styled-components";
import { GlobalStyles } from "../theme/globalStyles";
import { ModeToggle, useModeToggle } from "./ModeToggle";
import { Menu } from "./Menu";

interface LayoutProps {
    theme: ThemeType;
    children: React.ReactNode
    cssVars: string;
}

const AppWrapper = styled(Box)`
  height: 100dvh;
  width: 100dvw;
  min-height: 100dvh;
  max-width: 100dvw;
`;

export function Layout({theme, cssVars, children}: LayoutProps) {
    const [mode, toggle] = useModeToggle();
      
    return (<Grommet
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
          background={{dark: "black", light: "white"}}
        >
          <Menu />
          <ModeToggle mode={mode} toggle={toggle}/>
          {children}
        </AppWrapper>
      </Grommet>)
}
