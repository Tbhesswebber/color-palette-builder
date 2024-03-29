import React from "react";
import { ButtonExtendedProps as GButtonExtendedProps, Button as GButton } from "grommet";
import { useRouterActions } from "../../logics/sceneLogic";
import { DefaultTheme, styled } from "styled-components";
import { themeEdgeSize } from "../../utils/styled";

const defaultPadding: GButtonExtendedProps["pad"] = {
  horizontal: "22px",
  vertical: "4px",
};


export interface ButtonProps extends GButtonExtendedProps {
  round?: keyof Required<Required<DefaultTheme["global"]>["edgeSize"]>
}

const ButtonComponent = styled(GButton)<ButtonProps>`
  ${({round, theme}) => !round ? "" : `border-radius: ${themeEdgeSize(round)({theme})};`}
`;

export function Button({
  onClick: onClickProp,
  href,
  ...props
}: ButtonProps) {
  const { push } = useRouterActions();
  const onClick = React.useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement> &
        React.MouseEvent<HTMLAnchorElement>
    ) => {
      onClickProp && onClickProp(e);
      href && push(href);
    },
    [onClickProp, href]
  );

  return <ButtonComponent pad={defaultPadding} {...props} onClick={onClick} />;
}
