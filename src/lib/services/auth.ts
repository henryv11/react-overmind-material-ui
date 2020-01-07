import { AbstractService, ServiceRequest, err, ok } from "./util";
import { Credentials } from "../../types";

class AuthService extends AbstractService {
  public getToken: ServiceRequest<Credentials, any> = async (
    credentials: Credentials
  ) => {
    try {
      const resp = await this.post("/auth", credentials);
      const data = await resp.json();
      if (!data) {
        return err(String(resp.status) || "invalid response");
      }
      return ok(data);
    } catch (error) {
      return err(error.message || "unknown error");
    }
  };
}

export const authService = new AuthService({
  host: "localhost",
  port: 8080
});
