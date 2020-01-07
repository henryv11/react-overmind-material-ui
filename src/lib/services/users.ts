import { AbstractService, ServiceRequest, err, ok } from "./util";
import { UserRegistration } from "../../types";

class UserService extends AbstractService {
  public registerUser: ServiceRequest<UserRegistration, any> = async (
    user: UserRegistration
  ) => {
    try {
      const resp = await this.post("/users", user);
      const data = await resp.json();
      const { user: newUser, error } = data;
      if (!newUser && !error) {
        return err("invalid response");
      }
      if (error) {
        return err(error);
      }
      return ok(newUser);
    } catch (error) {
      return err(error.message || "unknown error");
    }
  };

  public isUsernameTaken: ServiceRequest<string, boolean> = async (
    username: string
  ) => {
    try {
      const resp = await this.get("/users/username", { username });
      const { data } = await resp.json();
      const { isUsernameTaken } = data;
      if (isUsernameTaken === undefined) {
        return err("invalid response");
      }
      return ok(isUsernameTaken);
    } catch (error) {
      return err(error.message || "unknown error");
    }
  };

  public isEmailTaken: ServiceRequest<string, boolean> = async (
    email: string
  ) => {
    try {
      const resp = await this.get("/users/email", { email });
      const { data } = await resp.json();
      const { isEmailTaken } = data;
      if (isEmailTaken === undefined) {
        return err("invalid response");
      }
      return ok(isEmailTaken);
    } catch (error) {
      return err(error.message || "unknown error");
    }
  };
}

export const userService = new UserService({
  host: "localhost",
  port: 8080
});
