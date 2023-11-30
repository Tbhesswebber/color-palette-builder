export function hueList(
  centerHue: number,
  { count, gap = 0 }: { count: number; gap?: number }
): number[] {
  if (count <= 0) return [];
  const bottomHue = centerHue - ((count - 1) * gap) / 2;

  return Array.from({ length: count }, (_, i) => (bottomHue + i * gap) % 360);
}
