// Generated by kea-typegen on Wed, 10 Apr 2024 15:48:21 GMT. DO NOT EDIT THIS FILE MANUALLY.

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
    setNamedColor: (
      name: string,
      colors: Color[] | null
    ) => {
      type: "set named color (src.logics.colorLogic)";
      payload: {
        colors: Color[] | null;
        name: string;
      };
    };
    resetNamedColors: () => {
      type: "reset named colors (src.logics.colorLogic)";
      payload: {
        value: true;
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
    "set named color (src.logics.colorLogic)": "setNamedColor";
    "reset named colors (src.logics.colorLogic)": "resetNamedColors";
    "set greys (src.logics.colorLogic)": "setGreys";
  };
  actionTypes: {
    setColors: "set colors (src.logics.colorLogic)";
    setPrimary: "set primary (src.logics.colorLogic)";
    setSecondary: "set secondary (src.logics.colorLogic)";
    setNamedColor: "set named color (src.logics.colorLogic)";
    resetNamedColors: "reset named colors (src.logics.colorLogic)";
    setGreys: "set greys (src.logics.colorLogic)";
  };
  actions: {
    setColors: (colors: Color[][]) => void;
    setPrimary: (colors: Color[]) => void;
    setSecondary: (colors: Color[]) => void;
    setNamedColor: (name: string, colors: Color[] | null) => void;
    resetNamedColors: () => void;
    setGreys: (greys: Color[]) => void;
  };
  asyncActions: {
    setColors: (colors: Color[][]) => Promise<any>;
    setPrimary: (colors: Color[]) => Promise<any>;
    setSecondary: (colors: Color[]) => Promise<any>;
    setNamedColor: (name: string, colors: Color[] | null) => Promise<any>;
    resetNamedColors: () => Promise<any>;
    setGreys: (greys: Color[]) => Promise<any>;
  };
  defaults: {
    allColors: Color[][];
    greys: Color[];
    namedColors: Record<string, Color[]>;
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
    allColors: Color[][];
    greys: Color[];
    namedColors: Record<string, Color[]>;
  };
  reducers: {
    allColors: (state: Color[][], action: any, fullState: any) => Color[][];
    greys: (state: Color[], action: any, fullState: any) => Color[];
    namedColors: (
      state: Record<string, Color[]>,
      action: any,
      fullState: any
    ) => Record<string, Color[]>;
  };
  selector: (state: any) => {
    allColors: Color[][];
    greys: Color[];
    namedColors: Record<string, Color[]>;
  };
  selectors: {
    allColors: (state: any, props?: any) => Color[][];
    greys: (state: any, props?: any) => Color[];
    namedColors: (state: any, props?: any) => Record<string, Color[]>;
    colors: (state: any, props?: any) => Color[][];
    tintCount: (state: any, props?: any) => number;
    colorNames: (state: any, props?: any) => string[];
    cssVars: (state: any, props?: any) => string;
    primaryColor: (state: any, props?: any) => Color[];
    secondaryColor: (state: any, props?: any) => Color[];
  };
  sharedListeners: {};
  values: {
    allColors: Color[][];
    greys: Color[];
    namedColors: Record<string, Color[]>;
    colors: Color[][];
    tintCount: number;
    colorNames: string[];
    cssVars: string;
    primaryColor: Color[];
    secondaryColor: Color[];
  };
  _isKea: true;
  _isKeaWithKey: false;
  __keaTypeGenInternalSelectorTypes: {
    colors: (allColors: Color[][]) => Color[][];
    tintCount: (colors: Color[][]) => number;
    colorNames: (namedColors: Record<string, Color[]>) => string[];
    cssVars: (
      colors: Color[][],
      greys: Color[],
      primaryColor: Color[],
      secondaryColor: Color[]
    ) => string;
    primaryColor: (namedColors: Record<string, Color[]>) => Color[];
    secondaryColor: (namedColors: Record<string, Color[]>) => Color[];
  };
}
