import {
  Box,
  BoxExtendedProps,
  Markdown,
  Paragraph,
  ParagraphProps,
  Text,
  TextExtendedProps,
} from "grommet";
import {
  Icon,
  IconProps,
  StatusCritical,
  StatusGood,
  StatusInfo,
  StatusWarning,
} from "grommet-icons";
import React from "react";
import { styled } from "styled-components";
import { TShirtSize } from "../../theme/constants";
import { props, themeColor } from "../../utils/styled";

export interface CalloutProps extends BoxExtendedProps {
  type: "error" | "success" | "info" | "warning";
  title?: string;
  children: React.ReactNode;
  size?: TShirtSize;
}

const CalloutWrapper = styled(Box)`
  position: relative;
  isolation: isolate;

  min-height: fit-content;

  && > p {
    line-height: 1em;
  }
`;

const Title = styled(Box)<{ type: CalloutProps["type"] & TextExtendedProps }>`
  position: absolute;
  top: 0;
  transform: translateY(-50%);

  padding: 0 0.75rem;

  text-transform: capitalize;
  font-weight: 600;
  && > span {
    line-height: 1em;
  }

  && > svg {
    position: relative;
    bottom: 3px;
  }

  background: ${({ theme }) => theme.background[theme.dark ? "dark" : "light"]};
  color: ${({ type, theme }) => themeColor(`${type}Dark`)({ theme })};
`;

const paragraphMargin: ParagraphProps["margin"] = {
  top: "xsmall",
  horizontal: "none",
  bottom: "none",
};

const icons: Record<CalloutProps["type"], Icon> = {
  error: StatusCritical,
  success: StatusGood,
  info: StatusInfo,
  warning: StatusWarning,
};

const markdownOptions = { wrapper: React.Fragment, forceBlock: true };

export function Callout({
  children,
  size = "medium",
  title = undefined,
  type,
  ...boxProps
}: CalloutProps) {
  const border = React.useMemo(() => getBorder(type), [type]);
  const Icon = icons[type];
  const markdownComponents = React.useMemo(
    () => ({
      p: {
        component: Paragraph,
        props: { fill: true, margin: paragraphMargin, size },
      },
    }),
    [size]
  );

  return (
    <CalloutWrapper
      margin="clamp(8px, 2vw + 0.5rem, 16px) 0"
      {...boxProps}
      border={border}
      round={size}
      pad={size}
    >
      <Title type={type} direction="row" gap="xsmall">
        <Icon color={`${type}Dark`} />
        <Text>{title ?? type}</Text>
      </Title>
        <Markdown options={markdownOptions} components={markdownComponents}>
          {children}
        </Markdown>
    </CalloutWrapper>
  );
}

function getBorder(color: string): BoxExtendedProps["border"] {
  return {
    size: "2px",
    style: "solid",
    color: `${color}Light`,
  };
}
