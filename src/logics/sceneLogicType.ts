// Generated by kea-typegen on Mon, 04 Mar 2024 20:38:52 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { Scene } from '../router/index'

export interface sceneLogicType extends Logic {
  actionCreators: {
    setScene: (
      scene: Scene,
      params: Record<string, unknown>
    ) => {
      type: "set scene (src.logics.sceneLogic)";
      payload: {
        params: Record<string, unknown>;
        scene: Scene;
      };
    };
  };
  actionKeys: {
    "set scene (src.logics.sceneLogic)": "setScene";
  };
  actionTypes: {
    setScene: "set scene (src.logics.sceneLogic)";
  };
  actions: {
    setScene: (scene: Scene, params: Record<string, unknown>) => void;
  };
  asyncActions: {
    setScene: (scene: Scene, params: Record<string, unknown>) => Promise<any>;
  };
  defaults: {
    scene: Scene;
    params: {};
  };
  events: {};
  key: undefined;
  listeners: {};
  path: ["src", "logics", "sceneLogic"];
  pathString: "src.logics.sceneLogic";
  props: Record<string, unknown>;
  reducer: (
    state: any,
    action: any,
    fullState: any
  ) => {
    scene: Scene;
    params: {};
  };
  reducers: {
    scene: (state: Scene, action: any, fullState: any) => Scene;
    params: (state: {}, action: any, fullState: any) => {};
  };
  selector: (state: any) => {
    scene: Scene;
    params: {};
  };
  selectors: {
    scene: (state: any, props?: any) => Scene;
    params: (state: any, props?: any) => {};
  };
  sharedListeners: {};
  values: {
    scene: Scene;
    params: {};
  };
  _isKea: true;
  _isKeaWithKey: false;
}
