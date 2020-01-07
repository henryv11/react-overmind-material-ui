import { IConfig } from "overmind";
import { namespaced } from "overmind/config";
import { createHook } from "overmind-react";
import * as auth from "./auth";
import * as user from "./user";

export const config = namespaced({
  auth,
  user
});

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

export const useStore = createHook<typeof config>();
