import { Anchor, Box, DropButton, DropButtonExtendedProps } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import styled from "styled-components";
import { A } from "kea-router";
import { routeMap } from "../router";

const ListItem = styled.li`
    list-style-type: none;
    text-transform: capitalize;
`;

const menuItems = Object.keys(routeMap)
  .filter((route) => typeof route === "string")
  .map((route) => {
    const label = routeMap[route].replace(/([A-Z])/g, " $1").trim();
    return (
      <ListItem key={label}>
        <Anchor as={A} href={route}>
          {label}
        </Anchor>
      </ListItem>
    );
  });

const MenuButtonContainer = styled(Box)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  overflow: hidden;

  transition: box-shadow 100ms ease-in-out;
  will-change: box-shadow;

  :hover {
    transition-duration: 300ms;
  }
`;

const dropProps: DropButtonExtendedProps["dropProps"] = {
  align: { top: "bottom", left: "left" },
  round: "xsmall",
  margin: {bottom: "small"},
  pad: "medium"
};

function dropContent() {
  return <Box as="ul">{menuItems}</Box>;
}

export function Menu() {
  if (menuItems.length === 1) {
    return null;
  }
  
  return (
    <MenuButtonContainer
      round="full"
      elevation="large"
      hoverIndicator={{ elevation: "small" }}
    >
      <DropButton
        primary
        icon={<MenuIcon />}
        dropProps={dropProps}
        dropContent={dropContent()}
      />
    </MenuButtonContainer>
  );
}
