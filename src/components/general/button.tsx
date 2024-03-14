import React from "react";
import { ButtonExtendedProps, Button as GButton } from "grommet";
import { useRouterActions } from "../../logics/sceneLogic";

export function Button({
  onClick: onClickProp,
  href,
  ...props
}: ButtonExtendedProps) {
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
  
  return <GButton pad="4px 22px" {...props} onClick={onClick} />;
}
