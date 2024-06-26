export const enum Font {
  Serif = '"Josefin Slab", serif',
  SansSerif = '"Josefin Sans", sans-serif',
  Mono = '"Red Hat Mono", monospace',
}

export type TShirtSize = "small" | "medium" | "large";
export type TShirtSizeExtended =
  | "xsmall"
  | "xlarge"
  | "xxsmall"
  | "xxlarge"
  | TShirtSize;
