export type Scene = "oklchFormulaic" | "oklchImplicit" | "home";

export const routeMap: Record<string, Scene> = {
  "/": "home",
  "/oklch/formulaic": "oklchFormulaic",
  "/oklch/implicit": "oklchImplicit",
};

export const enum Routes {
  Home = "/",
  OklchImplicit = "/oklch/implicit",
  OklchFormulaic = "/oklch/formulaic"
}
