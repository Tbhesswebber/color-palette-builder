import { DataChartProps } from "grommet";
import { kea, path, reducers, selectors, useValues } from "kea";
import { forms } from "kea-forms";
import { round } from "../utils/format";

import type { fluidLogicType } from "./fluidLogicType";
import { deepAssign } from "./logic-utils/forms";

const units = ["px", "rem", "vw", "cqw"] as const;
type CssUnit = (typeof units)[number];
export const sizeUnits: CssUnit[] = ["px", "rem"];
export const container = ["container", "viewport"];

export interface FluidLogicFormFields {
  sizeMin: number;
  sizeMax: number;
  containerMin: number;
  containerMax: number;
  sizeUnits: CssUnit;
  container: "container" | "viewport";
  rootFontSize: number;
}

const defaultValues: FluidLogicFormFields = {
  sizeMin: 1,
  sizeMax: 3,
  containerMin: 500,
  containerMax: 1000,
  sizeUnits: "rem",
  container: "container",
  rootFontSize: 16
};

export const fluidLogic = kea<fluidLogicType>([
  path(["src", "logics", "fluidLogic"]),
  forms({
    fluidLogicForm: { defaults: defaultValues },
  }),
  reducers({fluidLogicForm: {"setFluidLogicFormValue": (state, {name, value}) => {
    if (Array.isArray(name)) {
        const parsedName = name.at(0)
        if (parsedName === "sizeUnits") {

            return {
                ...state,
                sizeMin:
                value === "px"
                ? state.sizeMin * state.rootFontSize
                : round(state.sizeMin / state.rootFontSize, 4),
                sizeMax:
                value === "px"
                ? state.sizeMax * state.rootFontSize
                : round(state.sizeMax / state.rootFontSize, 4),
                sizeUnits: value,
            };
        }
        if (!!parsedName) {
            return {...state, [parsedName]: value};
        }
    }
    return deepAssign(state, name, value)
  }}}),
  selectors({
    sizeMin: [(s) => [s.fluidLogicForm], ({ sizeMin }) => Number(sizeMin)],
    sizeMax: [(s) => [s.fluidLogicForm], ({ sizeMax }) => Number(sizeMax)],
    rootFontSize: [
      (s) => [s.fluidLogicForm],
      ({ rootFontSize }) => Number(rootFontSize),
    ],
    sizeUnits: [(s) => [s.fluidLogicForm], ({ sizeUnits }) => sizeUnits],
    containerMin: [
      (s) => [s.fluidLogicForm],
      ({ containerMin }) => Number(containerMin),
    ],
    containerMax: [
      (s) => [s.fluidLogicForm],
      ({ containerMax }) => Number(containerMax),
    ],
    containerTarget: [(s) => [s.fluidLogicForm], ({ container }) => container],
    min: [
      (s) => [s.sizeMin, s.sizeUnits],
      (sizeMin, sizeUnits) => `${sizeMin}${sizeUnits}`,
    ],
    max: [
      (s) => [s.fluidLogicForm],
      ({ sizeMax, sizeUnits }) => `${sizeMax}${sizeUnits}`,
    ],
    containerCoefficientValue: [
      (s) => [s.sizeMin, s.sizeMax, s.containerMin, s.containerMax, s.rootFontSize, s.sizeUnits],
      (sizeMin, sizeMax, containerMin, containerMax, rootFontSize, sizeUnits) =>
        round(
          (((sizeMax - sizeMin) * 100) / (containerMax - containerMin)) *
            (sizeUnits === "rem" ? rootFontSize : 1),
          2
        ),
    ],
    containerCoefficient: [
      (s) => [s.containerCoefficientValue, s.containerTarget],
      (containerCoefficientValue, containerTarget) =>
        `${containerCoefficientValue}${
          containerTarget === "container" ? "cqw" : "vw"
        }`,
    ],
    mixinCoefficientValue: [
      (s) => [
        s.sizeMin,
        s.sizeMax,
        s.containerMin,
        s.containerMax,
        s.rootFontSize,
        s.sizeUnits,
      ],
      (sizeMin, sizeMax, containerMin, containerMax, rootFontSize, sizeUnits) =>
        round(
          (sizeMin -
            (containerMin * (sizeMax - sizeMin)) /
              (containerMax - containerMin)) /
            (sizeUnits === "px" ? rootFontSize : 1),
          2
        ),
    ],
    mixinCoefficient: [
      (s) => [s.mixinCoefficientValue],
      (mixin) => `${mixin}rem`,
    ],
    clampFormula: [
      (s) => [s.min, s.containerCoefficient, s.mixinCoefficient, s.max],
      (min, container, mixin, max) =>
        `clamp(${min}, ${container} + ${mixin}, ${max})`,
    ],
    chartBounds: [
      (s) => [s.containerMin, s.containerMax, s.sizeMin, s.sizeMax],
      (containerMin, containerMax, sizeMin, sizeMax) => {
        const spacing = (containerMax - containerMin) / 2;
        const chartMin = containerMin - spacing;
        const chartMax = containerMax + spacing;
        const bounds = {
          x: [chartMin, chartMax],
          y: [Math.floor(Number(sizeMin) - 1), Math.ceil(Number(sizeMax) + 1)],
        };
        return bounds;
      },
    ],
    chartData: [
      (s) => [s.containerMin, s.containerMax, s.sizeMin, s.sizeMax],
      (containerMin, containerMax, sizeMin, sizeMax) => {
        const chartMin = 0;
        const chartMax = containerMax * 1.5;

        const data = [
          chartMin,
          (containerMin - chartMin) / 2 + chartMin,
          containerMin,
          (containerMax - containerMin) / 2 + containerMin,
          containerMax,
          (chartMax - containerMax) / 2 + containerMax,
          chartMax,
        ].map((containerWidth) => {
          return {
            screenSize: containerWidth,
            target: fluidValue(
              containerWidth,
              [containerMin, sizeMin],
              [containerMax, sizeMax]
            ),
            current: false,
          };
        });

        return data;
      },
    ],
    chartSeries: [
      (s) => [s.sizeUnits],
      (sizeUnits) => [
        { property: "screenSize", suffix: "px" },
        { property: "target", suffix: sizeUnits },
        "current",
      ],
    ],
    chartAxes: [
      () => [],
      () =>
        ({
          x: { granularity: "coarse", property: "screenSize" },
          y: { granularity: "fine", property: "target" },
        }) as DataChartProps["axis"],
    ],
    chartType: [
      () => [],
      () =>
        [
          { type: "line", property: "target", thickness: "hair" },
          {
            type: "point",
            point: "circle",
            thickness: "medium",
            property: {
              x: "screenSize",
              y: "target",
              color: {
                property: "current",
                transform(value) {
                  return value === true ? "primary" : "transparent";
                },
              },
            },
          },
        ] as DataChartProps["chart"],
    ],
    chartGuide: [
      () => [],
      () =>
        ({
          x: { granularity: "fine" },
          y: { granularity: "fine" },
        }) as DataChartProps["guide"],
    ],
  }),
]);

export function useFluidValues() {
  return useValues(fluidLogic);
}

export function fluidValue(
  currentWidth: number,
  point1: [number, number],
  point2: [number, number]
): number {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  // formula is y = (y2 - y1) / (x2 - x1) * (x - x1) + y1
  const slope = (y2 - y1) / (x2 - x1);
  const value = slope * (currentWidth - x1) + y1;
  return Math.min(y2, Math.max(y1, round(value, 2)));
}
