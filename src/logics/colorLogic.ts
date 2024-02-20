import {
  actions,
  afterMount,
  BuiltLogic,
  connect,
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
}

export const colorLogic = kea<colorLogicType>([
  path(["src", "logics", "colorLogic"]),
  actions({
    setColors: (colors: Color[][]) => ({ colors }),
    setGreys: (greys: Color[]) => ({ greys }),
  }),
  reducers({
    colors: [[] as Color[][], { setColors: (_, { colors }) => colors }],
    greys: [[] as Color[], { setGreys: (_, { greys }) => greys }],
  }),
  selectors({
    tintCount: [(s) => [s.colors], (colors) => colors[0]?.length ?? 0],
    cssVars: [
      (s) => [s.colors, s.greys],
      (hues, greys) => {
        const hueVars = hues
          .map((tones, index) => {
            const toneVars = tones.map(
              ({ css }, tone) => `--colors_${index}_${tone}: ${css};`
            );
            if (index === 0) {
              const primaryVars = tones.map(
                (_, tone) =>
                  `--colors_primary_${tone}: var(--colors_${index}_${tone});`
              );
              return [primaryVars, toneVars];
            }
            if (index === hues.length - 1) {
              const secondaryVars = tones.map(
                (_, tone) =>
                  `--colors_secondary_${tone}: var(--colors_${index}_${tone});`
              );
              return [secondaryVars, toneVars];
            }
            return [toneVars];
          })
          .flat();
        const greyVars = greys.map(
          ({ css }, index) => `--colors_black_${index}: ${css};`
        );

        return [...hueVars, ...greyVars].flat().join("\n");
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
  listenerAction: keyof T["actions"]
}): LogicBuilder<T> {
  return (logic) => {
    connect(colorLogic)(logic);
    listeners(({ values }) => ({
      [listenerAction as string]: async (_, breakpoint) => {
        await breakpoint(50);
        colorLogic.actions.setColors(colors(values));
        colorLogic.actions.setGreys(greys(values));
        await breakpoint(50);
      },
    }))(logic);
    afterMount(({ values }) => {
      colorLogic.actions.setColors(colors(values));
      colorLogic.actions.setGreys(greys(values));
    })(logic);
  };
}
