export function round(value: number, decimalPlaces: number = 2): number {
  return Number(
    Intl.NumberFormat("en-us", { maximumFractionDigits: decimalPlaces }).format(
      value,
    ),
  );
}
