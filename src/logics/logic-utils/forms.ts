import { FieldName, FieldNamePath } from "kea-forms";

export function splitPathKey(key: FieldName): FieldNamePath {
  if (Array.isArray(key)) {
    return key;
  }
  if (typeof key === "number") {
    return [key];
  }
  if (key === "") {
    return [];
  }
  return `${key}`.split(".");
}

export function deepAssign(state: any, key: FieldName, value: any): any {
  const path = splitPathKey(key);
  if (path.length === 0 || (path.length === 1 && path[0] === "")) {
    return value;
  }
  const [current, ...nextPath] = path;
  if (Array.isArray(state)) {
    const currentNumber =
      typeof current === "string" ? parseInt(current) : current;
    return state.map((element, index) =>
      index === currentNumber ? deepAssign(element, nextPath, value) : element
    );
  }
  if (typeof state === "object") {
    const currentString =
      typeof current !== "string" ? current.toString() : current;
    return {
      ...state,
      [currentString]: deepAssign(state[currentString], nextPath, value),
    };
  }
  return state;
}
