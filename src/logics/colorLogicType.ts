// Generated by kea-typegen on Tue, 09 Apr 2024 17:01:10 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { Color } from './colorLogic'

export interface colorLogicType extends Logic {
  actionCreators: {
    setColors: (colors: Color[][]) => {
      type: "set colors (src.logics.colorLogic)";
      payload: {
        colors: Color[][];
      };
    };
    setPrimary: (colors: Color[]) => {
      type: "set primary (src.logics.colorLogic)";
      payload: {
        colors: Color[];
      };
    };
    setSecondary: (colors: Color[]) => {
      type: "set secondary (src.logics.colorLogic)";
      payload: {
        colors: Color[];
      };
    };
    setGreys: (greys: Color[]) => {
      type: "set greys (src.logics.colorLogic)";
      payload: {
        greys: Color[];
      };
    };
  };
  actionKeys: {
    "set colors (src.logics.colorLogic)": "setColors";
    "set primary (src.logics.colorLogic)": "setPrimary";
    "set secondary (src.logics.colorLogic)": "setSecondary";
    "set greys (src.logics.colorLogic)": "setGreys";
  };
  actionTypes: {
    setColors: "set colors (src.logics.colorLogic)";
    setPrimary: "set primary (src.logics.colorLogic)";
    setSecondary: "set secondary (src.logics.colorLogic)";
    setGreys: "set greys (src.logics.colorLogic)";
  };
  actions: {
    setColors: (colors: Color[][]) => void;
    setPrimary: (colors: Color[]) => void;
    setSecondary: (colors: Color[]) => void;
    setGreys: (greys: Color[]) => void;
  };
  asyncActions: {
    setColors: (colors: Color[][]) => Promise<any>;
    setPrimary: (colors: Color[]) => Promise<any>;
    setSecondary: (colors: Color[]) => Promise<any>;
    setGreys: (greys: Color[]) => Promise<any>;
  };
  defaults: {
    primaryColor: Color[];
    secondaryColor: Color[];
    colors: Color[][];
    greys: Color[];
  };
  events: {};
  key: undefined;
  listeners: {};
  path: ["src", "logics", "colorLogic"];
  pathString: "src.logics.colorLogic";
  props: Record<string, unknown>;
  reducer: (
    state: any,
    action: any,
    fullState: any
  ) => {
    primaryColor: Color[];
    secondaryColor: Color[];
    colors: Color[][];
    greys: Color[];
  };
  reducers: {
    primaryColor: (state: Color[], action: any, fullState: any) => Color[];
    secondaryColor: (state: Color[], action: any, fullState: any) => Color[];
    colors: (state: Color[][], action: any, fullState: any) => Color[][];
    greys: (state: Color[], action: any, fullState: any) => Color[];
  };
  selector: (state: any) => {
    primaryColor: Color[];
    secondaryColor: Color[];
    colors: Color[][];
    greys: Color[];
  };
  selectors: {
    primaryColor: (state: any, props?: any) => Color[];
    secondaryColor: (state: any, props?: any) => Color[];
    colors: (state: any, props?: any) => Color[][];
    greys: (state: any, props?: any) => Color[];
    tintCount: (state: any, props?: any) => number;
    cssVars: (state: any, props?: any) => string;
  };
  sharedListeners: {};
  values: {
    primaryColor: Color[];
    secondaryColor: Color[];
    colors: Color[][];
    greys: Color[];
    tintCount: number;
    cssVars: string;
  };
  _isKea: true;
  _isKeaWithKey: false;
  __keaTypeGenInternalSelectorTypes: {
    tintCount: (colors: Color[][]) => number;
    cssVars: (
      colors: Color[][],
      greys: Color[],
      primaryColor: Color[],
      secondaryColor: Color[]
    ) => string;
  };
}
