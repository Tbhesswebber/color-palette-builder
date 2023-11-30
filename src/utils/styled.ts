export function props<T, K extends keyof T>(
  key: K,
  defaultValue?: T[K],
): (props: T) => T[K] | undefined {
  return (props) => props[key] ?? defaultValue;
}
