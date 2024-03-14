import {
  Box,
  DropButton,
  DropButtonExtendedProps,
  MenuExtendedProps,
} from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import styled from "styled-components";
import { routeMap } from "../router";
import React from "react";
import { themeColor } from "../utils/styled";
import { useToggle } from "react-use";
import { Anchor } from "./general/anchor";
import { Button } from "./general/button";

interface MenuProps
  extends Omit<DropButtonExtendedProps, "dropContent" | "dropProps"> {
  items: MenuExtendedProps["items"];
}

const ListItem = styled.li`
  list-style-type: none;
  text-transform: capitalize;
`;

const MenuButtonTrigger = styled(DropButton)`
  border-bottom: solid 1px transparent;

  &&:hover:not(:disabled),
  &&:active:not(:disabled),
  &&:focus-visible:not(:disabled) {
    border-bottom: solid 1px ${themeColor("primary")};
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

const MenuButton = styled(Button)`
  border-bottom: solid 1px transparent;

  &&:hover:not(:disabled),
  &&:active:not(:disabled),
  &&:focus-visible:not(:disabled) {
    border-bottom: solid 1px ${themeColor("primary")};
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

const dropAlign = { top: "bottom", left: "left" };
const dropProps: DropButtonExtendedProps["dropProps"] = {
  round: "xsmall",
  margin: { bottom: "small" },
};

export function Menu({ label, items, ...props }: MenuProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, toggleOpen] = useToggle(false);

  const content = React.useMemo(() => {
    return (
      <Box
        pad="medium"
        ref={containerRef}
        onMouseLeave={(e: React.MouseEvent) => {
            e.relatedTarget !== buttonRef.current &&
            toggleOpen(false);
        }}
      >
        {items.map((item) => {
          if (Array.isArray(item)) {
            throw new Error("The custom menu currently doesn't handle groups.");
          }
          return (
            <ListItem key={item.href}>
              <Anchor href={item.href}>
                {item.label}
              </Anchor>
            </ListItem>
          );
        })}
      </Box>
    );
  }, [items]);

  if (items.length === 0 && !props.disabled) {
    return null;
  }

  if (items.length === 1 && !Array.isArray(items[0]) && !props.disabled) {
    return <MenuButton href={items[0].href}>{items[0].label ?? label}</MenuButton>;
  }

  return (
    <MenuButtonTrigger
      ref={buttonRef}
      a11yTitle={`${label} menu`}
      {...props}
      dropProps={dropProps}
      dropAlign={dropAlign}
      open={isOpen}
      onMouseEnter={() => toggleOpen(true)}
      onMouseLeave={(e: React.MouseEvent) => {
          e.relatedTarget !== containerRef.current &&
          e.relatedTarget !== containerRef.current?.parentElement &&
          toggleOpen(false);
      }}
      label={label}
      dropContent={content}
    />
  );
}
