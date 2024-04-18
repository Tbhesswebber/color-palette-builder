import { ResponsiveContext } from "grommet";
import React from "react";
import { useWindowSize } from "react-use";
import { TShirtSize } from "../../../../theme/constants";

export const enum ControlGridArea {
  TintCount = "tintCount",
  CenterPoint = "centerPoint",
  AnalogousHueCount = "analogousHueCount",
  AnalogousHueGap = "analogousHueGap",
  ComplementaryHueCount = "complementaryHueCount",
  ComplementaryHueGap = "complementaryHueGap",
}

const smallGridAreas = [
  [ControlGridArea.TintCount],
  [ControlGridArea.CenterPoint],
  [ControlGridArea.AnalogousHueCount],
  [ControlGridArea.AnalogousHueGap],
  [ControlGridArea.ComplementaryHueCount],
  [ControlGridArea.ComplementaryHueGap],
];
const mediumGridAreas = [
  [ControlGridArea.TintCount, ControlGridArea.CenterPoint],
  [ControlGridArea.AnalogousHueCount, ControlGridArea.AnalogousHueGap],
  [ControlGridArea.ComplementaryHueCount, ControlGridArea.ComplementaryHueGap],
];
const largeGridAreas = [
  [ControlGridArea.TintCount, ControlGridArea.CenterPoint],
  [ControlGridArea.AnalogousHueCount, ControlGridArea.AnalogousHueGap],
  [ControlGridArea.ComplementaryHueCount, ControlGridArea.ComplementaryHueGap],
];

export function useRangeGrid(currentSize?: TShirtSize) {
  const themeSize = React.useContext(ResponsiveContext);
  const {width} = useWindowSize();
  const size = currentSize ?? themeSize;

  return React.useMemo(() => {
    if (size === "small" || width <= 1130) {
      return {
        columns: ["1fr"],
        rows: ["auto"],
        areas: smallGridAreas,
      };
    }
    if (size === "medium") {
      return {
        columns: ["1fr", "1fr"],
        rows: ["auto"],
        areas: mediumGridAreas,
      };
    }
    return {
      columns: ["1fr", "1fr"],
      rows: ["auto"],
      areas: largeGridAreas,
    };
  }, [size, width]);
}
