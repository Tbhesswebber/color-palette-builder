import { Routes } from "../../../router";
import { CalloutProps } from "../../general/callout";

export interface Feature {
  name: string;
  status: "Not Started" | "In Progress" | "Complete";
  description: string;
  callouts?: CalloutProps[];
  link?: Routes;
}

export const features: Feature[] = [
  {
    name: "System Colors",
    status: "Not Started",
    description:
      "Generate colors for various statuses (error, success, info, warn)",
  },
  {
    name: "Fluid Design Calculator",
    status: "In Progress",
    link: Routes.FluidDesign,
    description:
      "Extract css values that allow margins, gaps, typography, etc. to grow and shrink with viewport and container sizes with customizable maximums and minimums.",
    callouts: [
      {
        type: "info",
        size: "small",
        title: "Inspiration",
        children: `I first learned about the \`clamp\` strategy of fluid design from Josh Comeau's course [CSS for JS Devs](https://css-for-js.dev/).  While working on this project, I discovered [Utopia](https://utopia.fyi), which is a bit more fully fledged than this, but doesn't have container support.`,
      },
    ],
  },
  {
    name: "Drop Shadow Calculator",
    status: "Not Started",
    description:
      "Take the guess work out of drop shadows that visually go together.",
  },
  {
    name: "Oklch Palette Builder",
    status: "In Progress",
    link: Routes.OklchImplicit,
    description: `Use intuitive inputs to create a customized color palette using perceived lightness, chroma (think color intensity), and hue. You can also curate how each value changes for each tint from lightest to darkest.`,
    callouts: [
      {
        type: "success",
        size: "small",
        title: "Functional",
        children:
          "While this tool is still in progress, the progress is largely improving the user interface and resulting color scheme.  Feel free to play around with this feature.",
      },
    ],
  },
  {
    name: "Oklch Formulaic Palette Builder",
    status: "Complete",
    link: Routes.OklchFormulaic,
    description:
      "Create a custom color palette using your own mathematical formulas.",
    callouts: [
      {
        type: "warning",
        size: "small",
        children:
          "This was only built so that I could understand how the OKLAB color space works and how I might want to use a similar tool. Unless you're _very_ mathematically minded, I highly recommend not using this.",
      },
    ],
  },
];
