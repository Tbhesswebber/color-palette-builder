import {
  actions,
  afterMount,
  connect,
  events,
  kea,
  listeners,
  path,
  selectors,
} from "kea";
import { DeepPartialMap, ValidationErrorType, forms } from "kea-forms";
import { parser } from "mathjs";
import { round } from "../utils/format";

import type { oklchFormLogicType } from "./oklchFormLogicType";
import { hueList } from "../utils/hueSpread";
import { colorLogic, connectColorLogic } from "./colorLogic";

export type Formula = `f(x,y)=${string}`;

export interface Color {
  hue: number;
  chroma: number;
  lightness: number;
  css: string;
}

export interface ColorFormFields {
  centerPoint: number;
  chromaFormula: number | Formula;
  hueFormula?: number | Formula;
  lightnessFormula: number | Formula;
  tintCount: number;
  analogousHueCount: number;
  analogousHueGap: number;
  complementaryHueCount: number;
  complementaryHueGap: number;
}

const defaultValues: Required<ColorFormFields> = {
  centerPoint: 172,
  hueFormula: "f(x,y)=0",
  lightnessFormula: "f(x,y)=-(80 / (y + 1))x + 90",
  chromaFormula:
    "f(x,y)=(0.8/(2y-y^2))x^2 + (-0.8/(2-y) + (0.8/(2y-y^2)))x + 0.04",
  tintCount: 7,
  analogousHueCount: 3,
  analogousHueGap: 0.36,
  complementaryHueCount: 1,
  complementaryHueGap: 0.36,
};

export const oklchFormLogic = kea<oklchFormLogicType>([
  path(["src", "logics", "oklchFormLogic"]),
  forms({
    colorForm: {
      defaults: defaultValues as ColorFormFields,
      errors: ({ lightnessFormula }) => {
        const errors: DeepPartialMap<ColorFormFields, ValidationErrorType> = {};
        const formulaParser = parser();
        try {
          formulaParser.evaluate(
            typeof lightnessFormula === "number"
              ? `f(x,y)=${lightnessFormula}`
              : lightnessFormula
          );
        } catch {
          errors.lightnessFormula = "Please enter a valid number or formula";
        }
        return errors;
      },
      options: {
        showErrorsOnTouch: true,
      },
    },
  }),
  selectors({
    // hueFormula: formPassthroughSelector("hueFormula"),
    chromaFormula: [
      (s) => [s.colorForm],
      ({ chromaFormula }) =>
        typeof chromaFormula === "number"
          ? `f(x,y)=${chromaFormula}`
          : chromaFormula,
    ],
    lightnessFormula: [
      (s) => [s.colorForm],
      ({ lightnessFormula }) =>
        typeof lightnessFormula === "number"
          ? `f(x,y)=${lightnessFormula}`
          : lightnessFormula,
    ],
    tintCount: [
      (s) => [s.colorForm],
      ({tintCount}) => Number(tintCount),
    ],
    analogousHues: [
      (s) => [s.colorForm],
      ({
        analogousHueCount: count,
        analogousHueGap: gap,
      }: ColorFormFields) => ({
        gap: Number(gap) * (180 / (count - 1)),
        count: Number(count),
      }),
    ],
    complementaryHues: [
      (s) => [s.colorForm],
      ({
        complementaryHueCount: count,
        complementaryHueGap: gap,
      }: ColorFormFields) => ({
        gap: Number(gap) * (180 / (count - 1)),
        count: Number(count),
      }),
    ],
    centerPoint: [
      (s) => [s.colorForm],
      (form: ColorFormFields) => Number(form["centerPoint"]),
    ],
    hues: [
      (s) => [s.centerPoint, s.analogousHues, s.complementaryHues],
      (hue, analogousHues, complementaryHues): number[] => {
        let analogousHueList: number[] = hueList(hue, {
          count: Number(analogousHues.count),
          gap: Number(analogousHues.gap),
        });

        let complementaryHueList: number[] = hueList(hue - 180, {
          count: Number(complementaryHues.count),
          gap: Number(complementaryHues.gap),
        });

        return [...analogousHueList, ...complementaryHueList];
      },
    ],
  }),
  connectColorLogic({
    greys: calculateGreys,
    colors: calculateColors,
    listenerAction: "setColorFormValue",
  }),
]);

function calculateColors(
  values: oklchFormLogicType["values"]
): [...Color[]][] {
  const {lightnessFormula, chromaFormula, tintCount, hues} = values;
  const lightnessParser = parser();
  try {
    lightnessParser.evaluate(lightnessFormula);
  } catch {
    return [];
  }

  const chromaParser = parser();
  try {
    chromaParser.evaluate(chromaFormula);
  } catch {
    return [];
  }

  return hues.map((hue) =>
    Array.from({ length: tintCount }, (__, tintIndex) => {
      const values = {
        hue,
        chroma: round(chromaParser.evaluate(`f(${tintIndex},${tintCount})`)),
        lightness: round(
          lightnessParser.evaluate(`f(${tintIndex},${tintCount})`)
        ),
      };

      return {
        ...values,
        css: `oklch(${values.lightness}% ${values.chroma} ${values.hue}deg)`,
      };
    })
  );
}

function calculateGreys(values: oklchFormLogicType["values"]) {
  const {tintCount: tints, lightnessFormula: lightness, centerPoint: hue} = values
  const lightnessParser = parser();
  try {
    lightnessParser.evaluate(lightness);
  } catch {
    return [];
  }
  const colors = Array.from({ length: tints }, (_, index) => {
    const values = {
      hue,
      chroma: 0.017,
      lightness: round(lightnessParser.evaluate(`f(${index},${tints})`)),
    };

    return {
      ...values,
      css: `oklch(${values.lightness}% ${values.chroma} ${values.hue}deg)`,
    };
  });

  return [
    {
      hue,
      chroma: 0.01,
      lightness: 99,
      css: `oklch(99% 0.01 ${hue}deg)`,
    },
    ...colors,
    {
      hue,
      chroma: 0.017,
      lightness: 0,
      css: `oklch(1% 0.017 ${hue}deg)`,
    },
  ];
}
