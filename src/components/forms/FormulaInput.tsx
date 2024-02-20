import { MaskedInput } from "grommet";
import { ChildFunctionProps } from "kea-forms";
import { InputProps } from "./types";

export function FormulaInput({
  value,
  onChange,
  name,
  id,
}: Partial<ChildFunctionProps> & InputProps) {
  return (
    <MaskedInput
      value={value}
      name={name}
      id={id}
      onChange={({ target }) => onChange && onChange(target.value)}
      mask={[{ fixed: "f(x,y)=" }, { regexp: /.*/ }]}
    />
  );
}
