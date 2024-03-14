import {ThemeType} from "../../theme/theme";

declare module "styled-components" {
    interface DefaultTheme extends ThemeType {
    }
}
