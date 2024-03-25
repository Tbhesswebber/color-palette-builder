import React from "react";
import {
  Heading,
  List,
  Paragraph,
  Box,
  Text,
  Tag,
  Markdown,
} from "grommet";
import { TextualLayout } from "../../layouts/textualLayout";
import { Callout } from "../../general/callout";
import { features } from "./features";
import { Code } from "../../typography/code";
import { Routes } from "../../../router";
import { Anchor } from "../../general/anchor";

export function Home() {
  return (
    <TextualLayout>
      <Paragraph fill>I'm an engineer, not a designer.</Paragraph>
      <Paragraph fill>
        But I <i>love</i> good design.
      </Paragraph>
      <Paragraph fill>
        These tools are intended to keep me from investing my time in an area
        where I know little, which ultimately distracts me from creating value
        for users when I start solo web projects.
      </Paragraph>
      <Paragraph fill>
        Have ideas? Have feedback? Want to contribute? This entire site is
        open-sourced on{" "}
        <Anchor href="https://github.com/Tbhesswebber/color-palette-builder">
          Github
        </Anchor>{" "}
        - feel free to check it out!! <br />
        <br /> And if you hate these colors, go play with the{" "}
        <Anchor href={Routes.OklchImplicit}>Palette Builder</Anchor> and see how
        things change!
      </Paragraph>

      <Heading level="2">Tools</Heading>
      <Callout size="small" type="info">
        Some of these tools may not exist yet. Keep an eye out for them in the
        future.
      </Callout>

      <List data={features} itemKey="name">
        {({ name, status, description, callouts, link }) => (
          <Box pad={{ horizontal: "medium" }}>
            <Box direction="row" align="center" gap="small">
              {link ? (
                <Anchor size="large" href={link}>
                  {name}
                </Anchor>
              ) : (
                <Text size="large">{name}</Text>
              )}
              <Tag
                value={status}
                size="xsmall"
                alignSelf="start"
                border={{
                  color:
                    status === "Not Started"
                      ? "errorLight"
                      : status === "Complete"
                        ? "successLight"
                        : undefined,
                }}
              ></Tag>
            </Box>
            <Text size="small">
              <Markdown options={{ wrapper: React.Fragment }}>
                {description}
              </Markdown>
            </Text>
            {callouts &&
              callouts.map((props, index) => (
                <Callout key={index} {...props} />
              ))}
          </Box>
        )}
      </List>

      <Heading level="2">Motivations</Heading>
      <Heading level="3">Colors</Heading>
      <Paragraph fill>
        There are certain implicit requirements for color tokens within a robust
        design system that most engineers and even some designers aren't
        prepared for. Ranges of greys, "system" colors that match the core
        palette without being a part of it, custom black and white points, etc.
        And the interplay of all of these elements require an eye towards
        contrast ratios.
      </Paragraph>
      <Paragraph fill>
        Building color palettes has often been where I lose the most time when
        it comes to starting a greenfield project with no design partner. There
        are tons of resources on the web, but they rarely cover the complexity
        of usable, accessible collections of colors. So this is where I start -
        diving into the mathematics behind color palettes, especially with a
        focus on accessibility.
      </Paragraph>
      <Paragraph fill>
        Ultimately, my hope is that this tool will be able to export CSS custom
        properties for the colors themselves, but also key tokens useful in any
        application.
      </Paragraph>
      <Heading level="3">Fluid Design Calculator</Heading>
      <Paragraph fill>
        There are a ton of fluid design calculators out there and there's not
        all that big of a difference between them - why do we need yet another
        one? Well, the short of it is that we don't - except for one thing: all
        of them assume that you're clamping <Code>font-size</Code> to the
        viewport width. These tools lack control over output units and
        properties for zero reason that I can tell.
      </Paragraph>
      <Paragraph fill>
        In this site, I use fluid typography, spacing (<Code>gap</Code> for the
        win!), and, by the time you read this, probably fluid other things. On
        top of that, as we have better and better support for container queries,
        I don't want my tools to be locked to the viewport size!
      </Paragraph>
    </TextualLayout>
  );
}
