import { Operator, mutate } from "overmind";
import { Credentials } from "../../types";

export const login: () => Operator<Credentials> = () =>
  mutate(async function login({ state, effects }, credentials) {
    state.auth.state.isLoading = true;
    const { isErr, value } = await effects.auth.api.getToken(credentials);
    if (isErr()) {
      state.auth.state.error = value;
    } else {
      state.auth.state.isAuthenticated = true;
      state.auth.state.token = value;
    }
    state.auth.state.isLoading = false;
  });
