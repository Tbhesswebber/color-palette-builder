import { Bezier, Point } from "bezier-js";
import { BuiltLogic, kea, path, selectors } from "kea";
import { forms } from "kea-forms";
import { BezierValue } from "../components/forms/BezierCurve";
import { round } from "../utils/format";

import { hueList } from "../utils/hueSpread";
import { connectColorLogic } from "./colorLogic";
import { colorLogicType } from "./colorLogicType";

import type { oklchImplicitFormLogicType } from "./oklchImplicitLogicType";

export interface Color {
  hue: number;
  chroma: number;
  lightness: number;
  css: string;
}

export interface ColorFormFields {
  centerPoint: number;
  chromaFormula: number | BezierValue;
  hueFormula?: number | BezierValue;
  lightnessFormula: number | BezierValue;
  tintCount: number;
  analogousHueCount: number;
  analogousHueGap: number;
  complementaryHueCount: number;
  complementaryHueGap: number;
}

const linearBezier: BezierValue = [0.25, 0.25, 0.75, 0.75];

const defaultValues: Required<ColorFormFields> = {
  centerPoint: 197,
  hueFormula: linearBezier,
  lightnessFormula: linearBezier,
  chromaFormula: linearBezier,
  tintCount: 7,
  analogousHueCount: 3,
  analogousHueGap: 0.36,
  complementaryHueCount: 1,
  complementaryHueGap: 0.36,
};

export const oklchImplicitFormLogic = kea<oklchImplicitFormLogicType>([
  path(["src", "logics", "oklchImplicitFormLogic"]),
  forms({
    colorForm: {
      defaults: defaultValues as ColorFormFields,
      options: {
        showErrorsOnTouch: true,
      },
    },
  }),
  selectors({
    hueFormula: [
      (s) => [s.colorForm],
      ({ hueFormula }) => {
        let x1, y1, x2, y2;
        if (typeof hueFormula === "number") {
          [x1, y1, x2, y2] = [0.25, 0.25, 0.75, 0.75];
        } else {
          [x1, y1, x2, y2] = hueFormula;
        }
        return new Bezier([
          { x: 0, y: 0 },
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: 1, y: 1 },
        ]);
      },
    ],
    chromaFormula: [
      (s) => [s.colorForm],
      ({ chromaFormula }) => {
        let x1, y1, x2, y2;
        if (typeof chromaFormula === "number") {
          [x1, y1, x2, y2] = [0.25, 0.25, 0.75, 0.75];
        } else {
          [x1, y1, x2, y2] = chromaFormula;
        }
        return new Bezier([
          { x: 0, y: 0 },
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: 1, y: 1 },
        ]);
      },
    ],
    lightnessFormula: [
      (s) => [s.colorForm],
      ({ lightnessFormula }) => {
        let x1, y1, x2, y2;
        if (typeof lightnessFormula === "number") {
          [x1, y1, x2, y2] = [0.5, 0.5, 0.5, 0.5];
        } else {
          [x1, y1, x2, y2] = lightnessFormula;
        }
        return new Bezier([
          { x: 0, y: 0 },
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: 1, y: 1 },
        ]);
      },
    ],
    tintCount: [(s) => [s.colorForm], ({ tintCount }) => Number(tintCount)],
    analogousHues: [
      (s) => [s.colorForm],
      ({
        analogousHueCount: count,
        analogousHueGap: gap,
      }: ColorFormFields) => ({
        gap: Number(gap) * (180 / Math.max((count - 1), 1)),
        count: Number(count),
      }),
    ],
    complementaryHues: [
      (s) => [s.colorForm],
      ({
        complementaryHueCount: count,
        complementaryHueGap: gap,
      }: ColorFormFields) => ({
        gap: Number(gap) * (180 / count),
        count: Number(count),
      }),
    ],
    centerPoint: [
      (s) => [s.colorForm],
      (form: ColorFormFields) => Number(form["centerPoint"]),
    ],
    lightnessShifts: [
      (s) => [s.lightnessFormula, s.tintCount],
      (lightness, tintCount) => {
        return lightness.getLUT(tintCount).reverse();
      },
    ],
    chromaShifts: [
      (s) => [s.chromaFormula, s.tintCount],
      (chroma, tintCount): Point[] => {
        return chroma.getLUT(tintCount);
      },
    ],
    hueShifts: [
      (s) => [s.hueFormula, s.tintCount],
      (hueShifts, tintCount): Point[] => {
        return hueShifts.getLUT(tintCount);
      },
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
  values: oklchImplicitFormLogicType["values"]
): [...Color[]][] {
  const { lightnessShifts, chromaShifts, hueShifts, tintCount, hues } = values;
  const linearShifts = new Bezier(linearBezier).getLUT(tintCount);

  return hues.map((hue) =>
    Array.from({ length: tintCount }, (__, tintIndex) => {
      const values = {
        hue:
          round(
            ((hueShifts[tintIndex].y - linearShifts[tintIndex].y) /
              linearShifts[tintIndex].y) *
              10
          ) + hue,
        chroma: round((chromaShifts[tintIndex].y + 0.2) * 0.4),
        lightness: round(lightnessShifts[tintIndex].y * 99),
      };

      return {
        ...values,
        css: `oklch(${values.lightness}% ${values.chroma} ${values.hue}deg)`,
      };
    })
  );
}

function calculateGreys(values: oklchImplicitFormLogicType["values"]) {
  const { tintCount, lightnessFormula, centerPoint: hue } = values;
  const lightnesses = lightnessFormula.getLUT(tintCount + 2).reverse()

  const colors = Array.from({ length: tintCount }, (_, index) => {
    const values = {
      hue,
      chroma: 0.017,
      lightness: round(lightnesses[index + 1].x * 100),
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
