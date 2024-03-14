import { ResponsiveContext } from "grommet";
import React from "react";

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

export function useRangeGrid() {
  const size = React.useContext(ResponsiveContext);

  return React.useMemo(() => {
    if (size === "small") {
      return {
        columns: ["1fr"],
        rows: ["fit-content"],
        areas: smallGridAreas,
      };
    }
    if (size === "medium") {
      return {
        columns: ["1fr", "1fr"],
        rows: ["fit-content"],
        areas: mediumGridAreas,
      };
    }
    return {
      columns: ["1fr", "1fr"],
      rows: ["fit-content"],
      areas: largeGridAreas,
    };
  }, [size]);
}
