import { Operator, mutate } from "overmind";
import { UserRegistration } from "../../types";

export const registerUser: () => Operator<UserRegistration> = () =>
  mutate(async function registerUser({ state, effects }, user) {
    state.user.state.isLoading = true;
    const { isErr, value } = await effects.user.api.registerUser(user);
    if (isErr()) {
      state.user.state.error = value;
    } else {
      state.user.state.user = value;
    }
    state.user.state.isLoading = false;
    return user;
  });

export const loginUser: () => Operator<UserRegistration> = () =>
  mutate(function loginUser({ state, actions }, user) {
    console.log(state.user.state.error, state.user.state.user);
    if (!state.user.state.error && !!state.user.state.user) {
      const { username, password } = user;
      actions.auth.login({ username, password });
    }
    return user;
  });
