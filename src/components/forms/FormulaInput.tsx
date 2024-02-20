import { MaskedInput } from "grommet";
import { ChildFunctionProps } from "kea-forms";
import { styled } from "styled-components";
import { Font } from "../../theme/constants";
import { InputProps } from "./types";

const MonospaceMaskedInput = styled(MaskedInput)`
    font-family: ${Font.Mono};
    font-size: 16px;
`;

export function FormulaInput({
  value,
  onChange,
  name,
  id,
}: Partial<ChildFunctionProps> & InputProps) {
  return (
    <MonospaceMaskedInput
      value={value}
      name={name}
      id={id}
      onChange={({ target }) => onChange && onChange(target.value)}
      mask={[{ fixed: "f(x,y)=" }, { regexp: /.*/ }]}
    />
  );
}
