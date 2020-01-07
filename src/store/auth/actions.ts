import { Operator, pipe } from "overmind";
import { Credentials } from "../../types";
import * as o from "./operators";

export const login: Operator<Credentials> = pipe(o.login());
