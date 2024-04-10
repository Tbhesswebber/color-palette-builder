import { Bezier, Point } from "bezier-js";
import { BuiltLogic, kea, path, selectors } from "kea";
import { forms } from "kea-forms";
import {
  BezierValue,
  SimpleBezierValue,
} from "../components/forms/BezierCurve";
import { round } from "../utils/format";

import { hueList } from "../utils/hueSpread";
import { Color, connectColorLogic } from "./colorLogic";
import { colorLogicType } from "./colorLogicType";

import type { oklchImplicitFormLogicType } from "./oklchImplicitLogicType";

export interface ColorFormFields {
  centerPoint: number;
  chromaFormula: number | BezierValue;
  hueFormula?: number | BezierValue;
  lightnessFormula: number | [number, number, number, number];
  tintCount: number;
  analogousHueCount: number;
  analogousHueGap: number;
  complementaryHueCount: number;
  complementaryHueGap: number;
}

const defaultValues: Required<ColorFormFields> = {
  centerPoint: 197,
  hueFormula: [0, 0.5, 0.5, 0.75, 0.15, 0.2, 1, 0.1],
  lightnessFormula: [0, 0.35, 1, 0.5],
  chromaFormula: [0, 0.15, 0.3, 0.35, 0.5, 0.45, 1, 0.3],
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
        let x0, y0, x1, y1, x2, y2, x3, y3;
        if (typeof hueFormula === "number") {
          [x0, y0, x1, y1, x2, y2, x3, y3] = [
            0, 0, 0.25, 0.25, 0.75, 0.75, 1, 1,
          ];
        } else {
          [x0, y0, x1, y1, x2, y2, x3, y3] = hueFormula;
        }
        return new Bezier([
          { x: x0, y: y0 },
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: x3, y: y3 },
        ]);
      },
    ],
    chromaFormula: [
      (s) => [s.colorForm],
      ({ chromaFormula }) => {
        let x0, y0, x1, y1, x2, y2, x3, y3;
        if (typeof chromaFormula === "number") {
          [x0, y0, x1, y1, x2, y2, x3, y3] = [
            0, 0, 0.25, 0.25, 0.75, 0.75, 1, 1,
          ];
        } else {
          [x0, y0, x1, y1, x2, y2, x3, y3] = chromaFormula;
        }
        return new Bezier([
          { x: x0, y: y0 },
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: x3, y: y3 },
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
        gap: Math.max(Number(gap) * (180 / Math.max(count - 1, 1)), 10),
        count: Number(count),
      }),
    ],
    complementaryHues: [
      (s) => [s.colorForm],
      ({
        complementaryHueCount: count,
        complementaryHueGap: gap,
      }: ColorFormFields) => ({
        gap: Math.max(Number(gap) * (180 / count), 10),
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
        return lightness.getLUT(tintCount);
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
          count: analogousHues.count,
          gap: analogousHues.gap,
        });

        let complementaryHueList: number[] = hueList(hue - 180, {
          count: complementaryHues.count,
          gap: complementaryHues.gap,
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
  const {
    lightnessShifts,
    chromaShifts,
    hueShifts,
    tintCount,
    hues,
    centerPoint,
    colorForm: { analogousHueCount, complementaryHueCount },
  } = values;

  return hues.map((hue, hueIndex) =>
    {
      const isPrimary = centerPoint === hue;
      const isSecondary = hueIndex === analogousHueCount ||
        (tintCount === analogousHueCount && hueIndex === tintCount - 1);
      
      return Array.from({ length: tintCount }, (__, tintIndex) => {
      const values: Omit<Color, "css"> = {
        primary: centerPoint === hue,
        // normalize at the center of the y axis
        hue: round((hueShifts[tintIndex].y - 0.5) * 10 + hue),
        // max out at 0.4 - need to add clipping eventually
        chroma: round(chromaShifts[tintIndex].y * 0.4),
        // 100 and 0 lightness are black and white - force colors to be between them
        lightness: round(99.9 - lightnessShifts[tintIndex].y * 99.8),
      };

      if (isPrimary) {
        values.primary = true;
        values.paletteName = "primary";
      }

      if (isSecondary) {
        values.secondary = true;
        values.paletteName = "secondary";
      }

      return {
        ...values,
        css: `oklch(${values.lightness}% ${values.chroma} ${values.hue}deg)`,
      };
    });
});
}

function calculateGreys(values: oklchImplicitFormLogicType["values"]) {
  const {
    tintCount,
    lightnessFormula,
    chromaFormula,
    centerPoint: hue,
  } = values;
  const lightnesses = lightnessFormula.getLUT(tintCount + 2);
  const chromas = chromaFormula.getLUT(tintCount + 2).reverse();

  const colors = Array.from({ length: tintCount }, (_, index) => {
    const values = {
      hue,
      chroma: round(chromas[index + 1].y * 0.017 + 0.017, 3),
      lightness: round(99 - lightnesses[index + 1].y * 98.9),
    };

    return {
      ...values,
      css: `oklch(${values.lightness}% ${values.chroma} ${values.hue}deg)`,
    };
  });

  return [
    {
      hue,
      chroma: round(chromas[0].y * 0.017 + 0.017, 3),
      lightness: 99.9,
      css: `oklch(99.9% 0.01 ${hue}deg)`,
    },
    ...colors,
    {
      hue,
      chroma: round(chromas[chromas.length - 1].y * 0.017 + 0.017, 3),
      lightness: 0.1,
      css: `oklch(0.1% 0.017 ${hue}deg)`,
    },
  ];
}
