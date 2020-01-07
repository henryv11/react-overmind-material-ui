import { User } from "../../types";

type State = {
  user: User;
  isLoading: boolean;
  error: string;
};

export const state: State = {
  user: {
    id: -1,
    username: "",
    firstName: "",
    lastName: "",
    emails: [],
    phoneNumbers: [],
    statuses: []
  },
  isLoading: false,
  error: ""
};
