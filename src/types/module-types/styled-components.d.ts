import { ThemeType } from "grommet";

declare module "styled-components" {
    interface DefaultTheme extends ThemeType {
        global: {
            colors: Record<string, string| {dark: string, light: string}>
        }
    }
}
