import {
  AnchorExtendedProps,
  Box,
  ButtonExtendedProps,
  DropButton,
  DropButtonExtendedProps,
  MenuExtendedProps,
} from "grommet";
import styled, { css } from "styled-components";
import React, { isValidElement } from "react";
import { themeColor } from "../utils/styled";
import { useToggle } from "react-use";
import { Anchor } from "./general/anchor";
import { Button } from "./general/button";
import { useRouterValues } from "../logics/sceneLogic";
import { TShirtSizeExtended } from "../theme/constants";
import { Hr } from "./general/hr";

export interface MenuProps
  extends Omit<DropButtonExtendedProps, "dropContent" | "dropProps"> {
  items: AnchorExtendedProps[] | AnchorExtendedProps[][];
  showBorder?: boolean;
}

const ListItem = styled.li<{
  showBorder?: boolean;
  size?: TShirtSizeExtended | string;
}>`
  list-style-type: none;

  padding: 4px 22px;

  line-height: ${({ size = "medium", theme }) =>
    size in theme.text ? theme.text[size as TShirtSizeExtended].height : ""};
  font-size: ${({ size = "medium", theme }) =>
    size in theme.text ? theme.text[size as TShirtSizeExtended].size : size};
  text-transform: capitalize;

  border-inline-start: solid 1px transparent;
  color: ${themeColor("text")};
  background-color: inherit;

  &&:has(:hover),
  &&[data-active="true"],
  &&:has(:focus-visible) {
    color: ${themeColor("primary")};
    border-inline-start: solid 1px ${themeColor("primary")};
  }
`;

const menuButtonStyles = css<{
  showBorder?: boolean;
  size?: TShirtSizeExtended | string;
  active?: boolean
}>`
  --menu-border-color: ${({ showBorder, active, theme }) =>
    showBorder || active ? themeColor("primary")({ theme }) : "transparent"};
  padding: 4px 22px;

  line-height: ${({ size = "medium", theme }) =>
    size in theme.text ? theme.text[size as TShirtSizeExtended].height : ""};
  font-size: ${({ size = "medium", theme }) =>
    size in theme.text ? theme.text[size as TShirtSizeExtended].size : size};

  border-block-end: solid 1px transparent;
  color: ${themeColor("text")};
  background-color: inherit;

  &&:hover:not(:disabled),
  &&[data-active=true]:not(:disabled),
  &&:focus-visible:not(:disabled) {
    color: ${themeColor("primary")};
    border-block-end: solid 1px var(--menu-border-color);
  }

  /* unsetting button stuff */
  box-shadow: none;
  border-radius: 0%;
  &&:hover,
  &&:active,
  &&:focus {
    box-shadow: none;
  }
`;

const MenuButtonTrigger = styled(DropButton)`
  ${menuButtonStyles}
`;

const MenuButton = styled(Button)`
  ${menuButtonStyles}
`;

const dropAlign: DropButtonExtendedProps["dropAlign"] = {
  top: "bottom",
  left: "left",
};

export function Menu({
  label: labelProp,
  items,
  showBorder = true,
  open,
  ...props
}: MenuProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, toggleOpen] = useToggle(open === true);
  const {
    currentLocation: { pathname },
  } = useRouterValues();
  const isActive = items
    .flat()
    .some((item) =>
      !Array.isArray(item)
        ? pathname === item.href
        : item.some(({ href }) => pathname === href)
    );
  const label =
    isValidElement(labelProp) && labelProp.props.children
      ? labelProp.props.children
      : labelProp;

  const dropProps = React.useMemo<DropButtonExtendedProps["dropProps"]>(
    () => ({
      size: props.size,
      round: "xsmall",
      margin: { bottom: "small" },
      as: "ul",
      elevation: "small"
    }),
    [props.size]
  );

  const content = React.useMemo(() => {
    return (
      <Box
        pad="medium"
        ref={containerRef}
        direction="column"
        onMouseLeave={(e: React.MouseEvent) => {
          e.relatedTarget !== buttonRef.current && toggleOpen(false);
        }}
        gap="xsmall"
      >
        {items.map((item, index) => {
          if (Array.isArray(item)) {
            const section = item.map((currentItem) => {
              return (
                <ListItem
                  key={currentItem.href}
                  data-active={currentItem.href === pathname}
                >
                  <Anchor
                    {...currentItem}
                    color="currentColor"
                    size={currentItem.size ?? props.size}
                  ></Anchor>
                </ListItem>
              );
            });
            return !!items[index + 1] && item.length
              ? [...section, <Hr key={`hr-${index}`} />]
              : section;
          }
          return (
            <ListItem key={item.href} data-active={item.href === pathname}>
              <Anchor
                {...item}
                color="currentColor"
                size={item.size ?? props.size}
              ></Anchor>
            </ListItem>
          );
        })}
      </Box>
    );
  }, [items, pathname, props.size]);

  if (items.length === 0 && !props.disabled) {
    return null;
  }

  if (items.length === 1 && !Array.isArray(items[0]) && !props.disabled) {
    return (
      <MenuButton
        {...props}
        size={items[0].size ?? props.size}
        active={isActive}
        data-active={isActive}
        href={items[0].href}
        label={items[0].label ?? label}
        showBorder={showBorder !== false}
      ></MenuButton>
    );
  }

  return (
    <MenuButtonTrigger
      ref={buttonRef}
      data-active={isActive || isOpen}
      a11yTitle={`${label} menu`}
      {...props}
      showBorder={showBorder !== false}
      open={isOpen}
      dropProps={dropProps}
      dropAlign={dropAlign}
      onMouseEnter={() => toggleOpen(true)}
      onMouseLeave={(e: React.MouseEvent) => {
        e.relatedTarget !== containerRef.current &&
          e.relatedTarget !== containerRef.current?.parentElement &&
          toggleOpen(false);
      }}
      label={labelProp}
      dropContent={content}
    />
  );
}
