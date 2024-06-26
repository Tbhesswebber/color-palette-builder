import {
  actions,
  afterMount,
  beforeUnmount,
  BuiltLogic,
  connect,
  defaults,
  events,
  kea,
  KeaLogicType,
  listeners,
  Logic,
  LogicBuilder,
  LogicWrapper,
  path,
  reducers,
  selectors,
  useValues,
} from "kea";

import type { colorLogicType } from "./colorLogicType";

export interface Color {
  hue: number;
  chroma: number;
  lightness: number;
  css: string;
  primary?: boolean;
  secondary?: boolean;
}

export const colorLogic = kea<colorLogicType>([
  path(["src", "logics", "colorLogic"]),
  actions({
    setColors: (colors: Color[][]) => ({ colors }),
    setPrimary: (colors: Color[]) => ({ colors }),
    setSecondary: (colors: Color[]) => ({ colors }),
    setGreys: (greys: Color[]) => ({ greys }),
  }),
  reducers({
    primaryColor: [getDefaults("primaryColor"), {setPrimary: (_, {colors}) => colors}],
    secondaryColor: [getDefaults("secondaryColor") as Color[], {setSecondary: (_, {colors}) => colors}],
    colors: [getDefaults("colors"), { setColors: (_, { colors }) => colors }],
    greys: [getDefaults("greys"), { setGreys: (_, { greys }) => greys }],
  }),
  selectors({
    tintCount: [(s) => [s.colors], (colors) => colors[0]?.length ?? 0],
    cssVars: [
      (s) => [s.colors, s.greys, s.primaryColor, s.secondaryColor],
      (hues, greys, primary, secondary) => {
        const hueVars = hues
          .map((tones, index) => {
            const toneVars = tones.map(
              ({ css }, tone) => `--colors_${index}_${tone}: ${css};`
            );
            return [toneVars];
          })
          .flat();
        const greyVars = greys.map(
          ({ css }, index) => `--colors_black_${index}: ${css};`
        );

        const primaryVars = (primary ?? hues.at(0) ?? []).map(
          ({ css }, index) => `--colors_primary_${index}: ${css};`
        );
        
        const secondaryVars = (secondary ?? hues.at(-1) ?? []).map(
          ({ css }, index) => `--colors_secondary_${index}: ${css};`
        );

        return [
          ...primaryVars,
          ...secondaryVars,
          ...hueVars,
          `--colors_white: ${greys.at(0)?.css};`,
          `--colors_black: ${greys.at(-1)?.css};`,
          ...greyVars,
        ]
          .flat()
          .join("\n");
      },
    ],
  }),
]);

export function useColorLogicValues() {
  return useValues(colorLogic);
}

export function connectColorLogic<T extends Logic = Logic>({
  greys,
  colors,
  listenerAction,
}: {
  greys: (values: T["values"]) => Color[];
  colors: (values: T["values"]) => Color[][];
  listenerAction: keyof T["actions"];
}): LogicBuilder<T> {
  return (logic) => {
    const storageKey = logic.key ? `${logic.key}` : logic.pathString;
    const savedValues = window.localStorage.getItem(storageKey);
    if (savedValues !== null) {
      defaults(JSON.parse(savedValues))(logic);
    }
    connect(colorLogic)(logic);
    listeners(({ values }) => ({
      [listenerAction as string]: async (_, breakpoint) => {
        await breakpoint(50);
        const colorValues = colors(values);
        colorLogic.actions.setColors(colorValues);
        colorLogic.actions.setGreys(greys(values));
        const primary = colorValues.find((color) => color[0].primary);
        if (primary) {
          colorLogic.actions.setPrimary(primary);
        }
        const secondary = colorValues.find((color) => color[0].secondary);
        if (secondary) {
          colorLogic.actions.setSecondary(secondary);
        }
        await breakpoint(50);
      },
    }))(logic);
    afterMount(({ values }) => {
      const colorValues = colors(values);
      colorLogic.actions.setColors(colorValues);
      colorLogic.actions.setGreys(greys(values));
      const primary = colorValues.find((color) => color[0].primary);
      if (primary) {
        colorLogic.actions.setPrimary(primary);
      }
      const secondary = colorValues.find((color) => color[0].secondary);
      if (secondary) {
        colorLogic.actions.setSecondary(secondary);
      }
    })(logic);
    beforeUnmount(({ values }) => {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    })(logic);
  };
}

function getDefaults<T extends keyof colorLogicType["defaults"]>(
  property: T
): colorLogicType["defaults"][T] {
  // these defaults were pulled directly from the redux dev tools after using the tool - to change them, I highly recommend doing the same
  const primary = [
    {
      hue: 187,
      chroma: 0.08,
      lightness: 99,
      css: "oklch(99% 0.08 187deg)",
    },
    {
      hue: 190.76,
      chroma: 0.13,
      lightness: 87.02,
      css: "oklch(87.02% 0.13 190.76deg)",
    },
    {
      hue: 193.72,
      chroma: 0.19,
      lightness: 72.88,
      css: "oklch(72.88% 0.19 193.72deg)",
    },
    {
      hue: 196.04,
      chroma: 0.25,
      lightness: 57.44,
      css: "oklch(57.44% 0.25 196.04deg)",
    },
    {
      hue: 197.83,
      chroma: 0.31,
      lightness: 41.56,
      css: "oklch(41.56% 0.31 197.83deg)",
    },
    {
      hue: 199.12,
      chroma: 0.37,
      lightness: 26.12,
      css: "oklch(26.12% 0.37 199.12deg)",
    },
    {
      hue: 199.95,
      chroma: 0.43,
      lightness: 11.98,
      css: "oklch(11.98% 0.43 199.95deg)",
    },
  ];
  const secondary = [
    {
      hue: 7,
      chroma: 0.08,
      lightness: 99,
      css: "oklch(99% 0.08 7deg)",
    },
    {
      hue: 10.76,
      chroma: 0.13,
      lightness: 87.02,
      css: "oklch(87.02% 0.13 10.76deg)",
    },
    {
      hue: 13.72,
      chroma: 0.19,
      lightness: 72.88,
      css: "oklch(72.88% 0.19 13.72deg)",
    },
    {
      hue: 16.04,
      chroma: 0.25,
      lightness: 57.44,
      css: "oklch(57.44% 0.25 16.04deg)",
    },
    {
      hue: 17.83,
      chroma: 0.31,
      lightness: 41.56,
      css: "oklch(41.56% 0.31 17.83deg)",
    },
    {
      hue: 19.12,
      chroma: 0.37,
      lightness: 26.12,
      css: "oklch(26.12% 0.37 19.12deg)",
    },
    {
      hue: 19.95,
      chroma: 0.43,
      lightness: 11.98,
      css: "oklch(11.98% 0.43 19.95deg)",
    },
  ];
  const defaults: colorLogicType["defaults"] = {
    colors: [
      [
        {
          hue: 154.6,
          chroma: 0.08,
          lightness: 99,
          css: "oklch(99% 0.08 154.6deg)",
        },
        {
          hue: 158.35999999999999,
          chroma: 0.13,
          lightness: 87.02,
          css: "oklch(87.02% 0.13 158.35999999999999deg)",
        },
        {
          hue: 161.32,
          chroma: 0.19,
          lightness: 72.88,
          css: "oklch(72.88% 0.19 161.32deg)",
        },
        {
          hue: 163.64,
          chroma: 0.25,
          lightness: 57.44,
          css: "oklch(57.44% 0.25 163.64deg)",
        },
        {
          hue: 165.43,
          chroma: 0.31,
          lightness: 41.56,
          css: "oklch(41.56% 0.31 165.43deg)",
        },
        {
          hue: 166.72,
          chroma: 0.37,
          lightness: 26.12,
          css: "oklch(26.12% 0.37 166.72deg)",
        },
        {
          hue: 167.54999999999998,
          chroma: 0.43,
          lightness: 11.98,
          css: "oklch(11.98% 0.43 167.54999999999998deg)",
        },
      ],
      primary,
      [
        {
          hue: 219.39999999999998,
          chroma: 0.08,
          lightness: 99,
          css: "oklch(99% 0.08 219.39999999999998deg)",
        },
        {
          hue: 223.15999999999997,
          chroma: 0.13,
          lightness: 87.02,
          css: "oklch(87.02% 0.13 223.15999999999997deg)",
        },
        {
          hue: 226.11999999999998,
          chroma: 0.19,
          lightness: 72.88,
          css: "oklch(72.88% 0.19 226.11999999999998deg)",
        },
        {
          hue: 228.43999999999997,
          chroma: 0.25,
          lightness: 57.44,
          css: "oklch(57.44% 0.25 228.43999999999997deg)",
        },
        {
          hue: 230.23,
          chroma: 0.31,
          lightness: 41.56,
          css: "oklch(41.56% 0.31 230.23deg)",
        },
        {
          hue: 231.51999999999998,
          chroma: 0.37,
          lightness: 26.12,
          css: "oklch(26.12% 0.37 231.51999999999998deg)",
        },
        {
          hue: 232.34999999999997,
          chroma: 0.43,
          lightness: 11.98,
          css: "oklch(11.98% 0.43 232.34999999999997deg)",
        },
      ],
      secondary,
    ],
    greys: [
      {
        hue: 197,
        chroma: 0.01,
        lightness: 99,
        css: "oklch(99% 0.01 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 90.81,
        css: "oklch(90.81% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 80.18,
        css: "oklch(80.18% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 68.52,
        css: "oklch(68.52% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 56.24,
        css: "oklch(56.24% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 43.76,
        css: "oklch(43.76% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 31.48,
        css: "oklch(31.48% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 19.82,
        css: "oklch(19.82% 0.017 197deg)",
      },
      {
        hue: 197,
        chroma: 0.017,
        lightness: 0,
        css: "oklch(1% 0.017 197deg)",
      },
    ],
    primaryColor: primary,
    secondaryColor: secondary,
  };

  return defaults[property];
}
