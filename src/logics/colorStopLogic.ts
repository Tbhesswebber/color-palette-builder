import { kea, path, selectors, useActions, useValues } from "kea";
import { forms } from "kea-forms";
import {
  samples,
  interpolate,
  formatCss,
  fixupHueLonger,
  filterDeficiencyProt,
  filterDeficiencyDeuter,
  filterDeficiencyTrit,
  displayable,
} from "culori";

import type { colorStopLogicType } from "./colorStopLogicType";
import { Builder, IBuilder, StrictBuilder } from "builder-pattern";

export interface ColorStopForm {
  from: string;
  to: string;
  colorCount: number;
}

export type OklchInterpolator = ReturnType<typeof interpolate<"oklch">>;

export const colorStopLogic = kea<colorStopLogicType>([
  path(["src", "logics", "colorStopLogic"]),
  forms({
    colorStop: {
      defaults: {
        from: "#bada55",
        to: "#ae7ae6",
        colorCount: 7,
      } satisfies ColorStopForm,
      errors: ({ colorCount }) => ({
        colorCount: colorCount < 2 ? "Steps cannot be less than 2" : undefined,
      }),
      options: {
        showErrorsOnTouch: true,
        alwaysShowErrors: true,
      },
    },
  }),
  selectors({
    colorStopData: [(s) => [s.colorStop], memoizeFormData()],
    from: [(s) => [s.colorStopData], (formData) => formData.from],
    colorCount: [(s) => [s.colorStopData], (formData) => formData.colorCount],
    to: [(s) => [s.colorStopData], (formData) => formData.to],
    gradient: [
      (s) => [s.from, s.to],
      (from, to): OklchInterpolator => interpolate([from, to], "oklch"),
    ],
    colors: [
      (s) => [s.gradient, s.colorCount],
      (gradient, colorCount) => {
        return samples(colorCount)
          .map(gradient)
          .map((value) => ({
            ...value,
            css: formatCss(value),
            protanopiaCss: formatCss(filterDeficiencyProt(1)(value)),
            deuteranopiaCss: formatCss(filterDeficiencyDeuter(1)(value)),
            tritanopiaCss: formatCss(filterDeficiencyTrit(1)(value)),
          }));
      },
    ],
  }),
]);

function memoizeFormData() {
  let previousValue: ColorStopForm;

  return function memoizedFormData({
    colorCount,
    from,
    to,
  }: ColorStopForm): ColorStopForm {
    const value = Builder<ColorStopForm>({ colorCount, from, to });
    value
      .colorCount(
        colorCount >= 2 ? Number(colorCount) : previousValue.colorCount
      )
      .from(displayable(from) ? from : previousValue.from)
      .to(displayable(to) ? to : previousValue.to);

    previousValue = value.build();

    return previousValue;
  };
}

export function useColorStopValues() {
  return useValues(colorStopLogic);
}

export function useColorStopActions() {
  return useActions(colorStopLogic);
}
