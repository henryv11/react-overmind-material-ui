type Error = "invalid password";

type State = {
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
  error: Error | string;
};

export const state: State = {
  isAuthenticated: false,
  token: "",
  isLoading: false,
  error: ""
};
