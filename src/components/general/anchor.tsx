import { AnchorExtendedProps, Anchor as GAnchor } from "grommet";
import { A } from "kea-router";

export function Anchor(props: AnchorExtendedProps) {
    return <GAnchor {...props} as={A} />
}
