import AppletsRequestError, {
  createError,
} from "../../src/core/AppletsRequestError";

describe("AppletsRequestError", () => {
  it("Create", () => {
    const fn = jest.fn();
    fn.mockReturnValueOnce(undefined);
    fn.mockReturnValueOnce(null);
    const err = createError("test err", fn(), "NETWORK_ERROR", fn());

    expect(err).toBeInstanceOf(AppletsRequestError);
    expect(err.errMsg).toBe("test err");
    expect(err.config).toBeUndefined();
    expect(err.extra).toBeUndefined();
    expect(err.response).toBeNull();
    expect(err.status).toBe("NETWORK_ERROR");
  });
  it("Create config and response", () => {
    const config: any = {
      adapter: jest.fn(),
      method: "GET",
      url: "/demo/get",
      baseURL: "https://wwww.xxxx.com/",
    } as any;
    const response = {
      data: {},
    } as any;
    const err = createError("test err", config, "NETWORK_ERROR", response);

    expect(err).toBeInstanceOf(AppletsRequestError);
    expect(err.errMsg).toBe("test err");
    expect(err.config).toEqual(config);
    expect(err.extra).toBeUndefined();
    expect(err.response).toEqual(response);
    expect(err.status).toBe("NETWORK_ERROR");
  });
  it("Create no status", () => {
    const config: any = {
      adapter: jest.fn(),
      method: "GET",
      url: "/demo/get",
      baseURL: "https://wwww.xxxx.com/",
    } as any;
    const response = {
      data: {},
    } as any;
    const statusFn = jest.fn();
    statusFn.mockReturnValueOnce(undefined);
    const err = createError("test err", config, statusFn(), response);

    expect(err).toBeInstanceOf(AppletsRequestError);
    expect(err.errMsg).toBe("test err");
    expect(err.config).toEqual(config);
    expect(err.extra).toBeUndefined();
    expect(err.response).toEqual(response);
    expect(err.status).toBe("NETWORK_ERROR");
  });
});
