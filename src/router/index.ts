export type Scene = "oklchFormulaic" | "oklchImplicit" | "home" | "fluid" | "colorStop";

export const routeMap: Record<string, Scene> = {
  "/": "home",
  "/fluid-design": "fluid",
  "/oklch/formulaic": "oklchFormulaic",
  "/oklch/implicit": "oklchImplicit",
  "/color-stops": "colorStop",
};

export const enum Routes {
  Home = "/",
  OklchImplicit = "/oklch/implicit",
  OklchFormulaic = "/oklch/formulaic",
  FluidDesign = "/fluid-design",
  ColorStop = "/color-stops"
}
