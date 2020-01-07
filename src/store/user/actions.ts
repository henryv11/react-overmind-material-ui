import { UserRegistration } from "./../../types/user.d";
import { Operator, pipe } from "overmind";
import * as o from "./operators";

export const registerUser: Operator<UserRegistration> = pipe(o.registerUser());
