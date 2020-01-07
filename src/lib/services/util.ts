export interface ServiceRequest<T, R> {
  (data: T): Promise<Result<any, R>>;
}
export type Result<E, V> = Err<E, unknown> | Ok<unknown, V>;

export class Err<F, S> {
  public readonly value?: F;

  constructor(value?: F) {
    this.value = value;
  }

  public isErr(): this is Err<F, S> {
    return true;
  }

  public isOk(): this is Ok<F, S> {
    return false;
  }
}

export class Ok<F, S> {
  public readonly value?: S;

  constructor(value?: S) {
    this.value = value;
  }

  public isOk(): this is Ok<F, S> {
    return true;
  }

  public isErr(): this is Err<F, S> {
    return false;
  }
}

export const ok = <F, S>(value?: S): Ok<F, S> => new Ok(value);

export const err = <F, S>(error?: F): Err<F, S> => new Err(error);

export class AbstractService {
  private url: string;
  constructor(config: { host: string; port: number }) {
    const { host, port } = config;
    this.url = `http://${host}:${port}`;
  }

  protected post = (path: string, body: any) =>
    post(`${this.url}${path}`, body);

  protected get = (path: string, query: { [key: string]: any }) =>
    fetch(`${this.url}${path}${query ? `?${queryString(query)}` : ""}`);
}

const post = (url: string, body: any) =>
  fetch(url, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json;charset=utf-8"
    // },
    body: JSON.stringify(body)
  });

const queryString = (params: { [key: string]: string }) =>
  Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
