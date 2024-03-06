// Generated by kea-typegen on Wed, 06 Mar 2024 19:50:16 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { ColorFormFields } from './oklchImplicitLogic'
import type { DeepPartial, DeepPartialMap, FieldName, ValidationErrorType } from 'kea-forms'
import type { Bezier, Point } from 'bezier-js'

export interface oklchImplicitFormLogicType extends Logic {
  actionCreators: {
    setColorFormValue: (
      key: FieldName,
      value: any
    ) => {
      type: "set color form value (src.logics.oklchImplicitFormLogic)";
      payload: {
        name: FieldName;
        value: any;
      };
    };
    setColorFormValues: (values: DeepPartial<ColorFormFields>) => {
      type: "set color form values (src.logics.oklchImplicitFormLogic)";
      payload: {
        values: DeepPartial<ColorFormFields>;
      };
    };
    setColorFormManualErrors: (errors: Record<string, any>) => {
      type: "set color form manual errors (src.logics.oklchImplicitFormLogic)";
      payload: {
        errors: Record<string, any>;
      };
    };
    touchColorFormField: (key: string) => {
      type: "touch color form field (src.logics.oklchImplicitFormLogic)";
      payload: {
        key: string;
      };
    };
    resetColorForm: (values?: ColorFormFields) => {
      type: "reset color form (src.logics.oklchImplicitFormLogic)";
      payload: {
        values?: ColorFormFields;
      };
    };
    submitColorForm: () => {
      type: "submit color form (src.logics.oklchImplicitFormLogic)";
      payload: {
        value: boolean;
      };
    };
    submitColorFormRequest: (colorForm: ColorFormFields) => {
      type: "submit color form request (src.logics.oklchImplicitFormLogic)";
      payload: {
        colorForm: ColorFormFields;
      };
    };
    submitColorFormSuccess: (colorForm: ColorFormFields) => {
      type: "submit color form success (src.logics.oklchImplicitFormLogic)";
      payload: {
        colorForm: ColorFormFields;
      };
    };
    submitColorFormFailure: (
      error: Error,
      errors: Record<string, any>
    ) => {
      type: "submit color form failure (src.logics.oklchImplicitFormLogic)";
      payload: {
        error: Error;
        errors: Record<string, any>;
      };
    };
  };
  actionKeys: {
    "set color form value (src.logics.oklchImplicitFormLogic)": "setColorFormValue";
    "set color form values (src.logics.oklchImplicitFormLogic)": "setColorFormValues";
    "set color form manual errors (src.logics.oklchImplicitFormLogic)": "setColorFormManualErrors";
    "touch color form field (src.logics.oklchImplicitFormLogic)": "touchColorFormField";
    "reset color form (src.logics.oklchImplicitFormLogic)": "resetColorForm";
    "submit color form (src.logics.oklchImplicitFormLogic)": "submitColorForm";
    "submit color form request (src.logics.oklchImplicitFormLogic)": "submitColorFormRequest";
    "submit color form success (src.logics.oklchImplicitFormLogic)": "submitColorFormSuccess";
    "submit color form failure (src.logics.oklchImplicitFormLogic)": "submitColorFormFailure";
  };
  actionTypes: {
    setColorFormValue: "set color form value (src.logics.oklchImplicitFormLogic)";
    setColorFormValues: "set color form values (src.logics.oklchImplicitFormLogic)";
    setColorFormManualErrors: "set color form manual errors (src.logics.oklchImplicitFormLogic)";
    touchColorFormField: "touch color form field (src.logics.oklchImplicitFormLogic)";
    resetColorForm: "reset color form (src.logics.oklchImplicitFormLogic)";
    submitColorForm: "submit color form (src.logics.oklchImplicitFormLogic)";
    submitColorFormRequest: "submit color form request (src.logics.oklchImplicitFormLogic)";
    submitColorFormSuccess: "submit color form success (src.logics.oklchImplicitFormLogic)";
    submitColorFormFailure: "submit color form failure (src.logics.oklchImplicitFormLogic)";
  };
  actions: {
    setColorFormValue: (key: FieldName, value: any) => void;
    setColorFormValues: (values: DeepPartial<ColorFormFields>) => void;
    setColorFormManualErrors: (errors: Record<string, any>) => void;
    touchColorFormField: (key: string) => void;
    resetColorForm: (values?: ColorFormFields) => void;
    submitColorForm: () => void;
    submitColorFormRequest: (colorForm: ColorFormFields) => void;
    submitColorFormSuccess: (colorForm: ColorFormFields) => void;
    submitColorFormFailure: (error: Error, errors: Record<string, any>) => void;
  };
  asyncActions: {
    setColorFormValue: (key: FieldName, value: any) => Promise<any>;
    setColorFormValues: (values: DeepPartial<ColorFormFields>) => Promise<any>;
    setColorFormManualErrors: (errors: Record<string, any>) => Promise<any>;
    touchColorFormField: (key: string) => Promise<any>;
    resetColorForm: (values?: ColorFormFields) => Promise<any>;
    submitColorForm: () => Promise<any>;
    submitColorFormRequest: (colorForm: ColorFormFields) => Promise<any>;
    submitColorFormSuccess: (colorForm: ColorFormFields) => Promise<any>;
    submitColorFormFailure: (
      error: Error,
      errors: Record<string, any>
    ) => Promise<any>;
  };
  defaults: {
    colorForm: ColorFormFields;
    isColorFormSubmitting: boolean;
    showColorFormErrors: boolean;
    colorFormChanged: boolean;
    colorFormTouches: Record<string, boolean>;
    colorFormManualErrors: Record<string, any>;
  };
  events: {};
  key: undefined;
  listeners: {};
  path: ["src", "logics", "oklchImplicitFormLogic"];
  pathString: "src.logics.oklchImplicitFormLogic";
  props: Record<string, unknown>;
  reducer: (
    state: any,
    action: any,
    fullState: any
  ) => {
    colorForm: ColorFormFields;
    isColorFormSubmitting: boolean;
    showColorFormErrors: boolean;
    colorFormChanged: boolean;
    colorFormTouches: Record<string, boolean>;
    colorFormManualErrors: Record<string, any>;
  };
  reducers: {
    colorForm: (
      state: ColorFormFields,
      action: any,
      fullState: any
    ) => ColorFormFields;
    isColorFormSubmitting: (
      state: boolean,
      action: any,
      fullState: any
    ) => boolean;
    showColorFormErrors: (
      state: boolean,
      action: any,
      fullState: any
    ) => boolean;
    colorFormChanged: (state: boolean, action: any, fullState: any) => boolean;
    colorFormTouches: (
      state: Record<string, boolean>,
      action: any,
      fullState: any
    ) => Record<string, boolean>;
    colorFormManualErrors: (
      state: Record<string, any>,
      action: any,
      fullState: any
    ) => Record<string, any>;
  };
  selector: (state: any) => {
    colorForm: ColorFormFields;
    isColorFormSubmitting: boolean;
    showColorFormErrors: boolean;
    colorFormChanged: boolean;
    colorFormTouches: Record<string, boolean>;
    colorFormManualErrors: Record<string, any>;
  };
  selectors: {
    colorForm: (state: any, props?: any) => ColorFormFields;
    isColorFormSubmitting: (state: any, props?: any) => boolean;
    showColorFormErrors: (state: any, props?: any) => boolean;
    colorFormChanged: (state: any, props?: any) => boolean;
    colorFormTouches: (state: any, props?: any) => Record<string, boolean>;
    colorFormManualErrors: (state: any, props?: any) => Record<string, any>;
    colorFormTouched: (state: any, props?: any) => boolean;
    colorFormValidationErrors: (
      state: any,
      props?: any
    ) => DeepPartialMap<ColorFormFields, ValidationErrorType>;
    colorFormAllErrors: (state: any, props?: any) => Record<string, any>;
    colorFormHasErrors: (state: any, props?: any) => boolean;
    colorFormErrors: (
      state: any,
      props?: any
    ) => DeepPartialMap<ColorFormFields, ValidationErrorType>;
    isColorFormValid: (state: any, props?: any) => boolean;
    hueFormula: (state: any, props?: any) => Bezier;
    chromaFormula: (state: any, props?: any) => Bezier;
    lightnessFormula: (state: any, props?: any) => Bezier;
    tintCount: (state: any, props?: any) => number;
    analogousHues: (
      state: any,
      props?: any
    ) => {
      count: number;
      gap: number;
    };
    complementaryHues: (
      state: any,
      props?: any
    ) => {
      count: number;
      gap: number;
    };
    centerPoint: (state: any, props?: any) => number;
    lightnessShifts: (state: any, props?: any) => Point[];
    chromaShifts: (state: any, props?: any) => Point[];
    hueShifts: (state: any, props?: any) => Point[];
    hues: (state: any, props?: any) => number[];
  };
  sharedListeners: {};
  values: {
    colorForm: ColorFormFields;
    isColorFormSubmitting: boolean;
    showColorFormErrors: boolean;
    colorFormChanged: boolean;
    colorFormTouches: Record<string, boolean>;
    colorFormManualErrors: Record<string, any>;
    colorFormTouched: boolean;
    colorFormValidationErrors: DeepPartialMap<
      ColorFormFields,
      ValidationErrorType
    >;
    colorFormAllErrors: Record<string, any>;
    colorFormHasErrors: boolean;
    colorFormErrors: DeepPartialMap<ColorFormFields, ValidationErrorType>;
    isColorFormValid: boolean;
    hueFormula: Bezier;
    chromaFormula: Bezier;
    lightnessFormula: Bezier;
    tintCount: number;
    analogousHues: {
      count: number;
      gap: number;
    };
    complementaryHues: {
      count: number;
      gap: number;
    };
    centerPoint: number;
    lightnessShifts: Point[];
    chromaShifts: Point[];
    hueShifts: Point[];
    hues: number[];
  };
  _isKea: true;
  _isKeaWithKey: false;
  __keaTypeGenInternalSelectorTypes: {
    hueFormula: (colorForm: ColorFormFields) => Bezier;
    chromaFormula: (colorForm: ColorFormFields) => Bezier;
    lightnessFormula: (colorForm: ColorFormFields) => Bezier;
    tintCount: (colorForm: ColorFormFields) => number;
    analogousHues: (colorForm: ColorFormFields) => {
      count: number;
      gap: number;
    };
    complementaryHues: (colorForm: ColorFormFields) => {
      count: number;
      gap: number;
    };
    centerPoint: (colorForm: ColorFormFields) => number;
    lightnessShifts: (lightnessFormula: Bezier, tintCount: number) => Point[];
    chromaShifts: (chromaFormula: Bezier, tintCount: number) => Point[];
    hueShifts: (hueFormula: Bezier, tintCount: number) => Point[];
    hues: (
      centerPoint: number,
      analogousHues: {
        count: number;
        gap: number;
      },
      complementaryHues: {
        count: number;
        gap: number;
      }
    ) => number[];
  };
}
