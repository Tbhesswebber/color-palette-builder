import { actions, kea, path, reducers, useValues } from "kea";
import { router, urlToAction } from "kea-router";

import React from "react";

import type { sceneLogicType } from "./sceneLogicType";
import { OklchFormulaic } from "../components/scenes/oklchFormulaic";
import { routeMap, Scene } from "../router";
import { OklchImplicit } from "../components/scenes/oklchImplicit";
import { Home } from "../components/scenes/home";



export const scenes: Record<Scene, () => React.ReactElement> = {
  oklchFormulaic: OklchFormulaic,
  oklchImplicit: OklchImplicit,
  home: Home
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
      ...computedScenes,
    };
  }),
]);

export function useSceneValues() {
  return useValues(sceneLogic);
}
