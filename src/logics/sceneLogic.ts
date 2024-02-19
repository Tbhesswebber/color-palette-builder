import { actions, kea, path, reducers, useValues } from "kea";
import { router, urlToAction } from "kea-router";

import React from "react";

import type { sceneLogicType } from "./sceneLogicType";
import { OklchFormulaic } from "../components/scenes/oklchFormulaic";
import { routeMap, Scene } from "../router";



export const scenes: Record<Scene, () => React.ReactElement> = {
  oklchFormulaic: OklchFormulaic,
};

export const sceneLogic = kea<sceneLogicType>([
  path(["src", "logics", "sceneLogic"]),
  actions({
    setScene: (scene: Scene, params: Record<string, unknown>) => ({
      scene,
      params,
    }),
  }),
  reducers({
    scene: [
      "oklchFormulaic" as Scene,
      {
        setScene: (_, payload) => payload.scene,
      },
    ],
    params: [
      {},
      {
        setScene: (_, payload) => payload.params || {},
      },
    ],
  }),
  urlToAction(({ actions }) => {
    const computedScenes = Object.fromEntries(
      Object.entries(routeMap).map(([path, scene]) => {
        return [path, (params: Record<string, unknown>) => actions.setScene(scene, params)];
      })
    );

    return {
      "/": () => router.actions.replace("/oklch/formulaic" satisfies keyof typeof routeMap),
      ...computedScenes,
    };
  }),
]);

export function useSceneValues() {
  return useValues(sceneLogic);
}
