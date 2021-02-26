import Adapter from "../../src/adapters/Adapter";
import CancelToken from "../../src/cancel/CancelToken";

const fn = jest.fn();
fn.mockReturnValueOnce(null);
fn.mockReturnValueOnce(undefined);

const optionsFn = jest.fn();
optionsFn.mockReturnValueOnce(null);
optionsFn.mockReturnValueOnce(undefined);

const optionsRejectFn = jest.fn();
optionsRejectFn.mockReturnValueOnce(null);
optionsRejectFn.mockReturnValueOnce(undefined);

describe("Adapter", () => {
  it("null config", () => {
    const adapter = new Adapter(fn());
    return new Promise((resolve) => {
      return adapter.resolve(
        {
          headers: {},
          status: 200,
          data: {},
          response: null,
        },
        resolve
      );
    }).then((res) => {
      expect(res).toEqual({
        headers: {},
        status: 200,
        data: {},
        config: {},
        originalRes: null,
      });
    });
  });

  it("undefined config", () => {
    const adapter = new Adapter(fn());
    return new Promise((resolve) => {
      return adapter.resolve(
        {
          headers: {},
          status: 200,
          data: {},
          response: undefined,
        },
        resolve
      );
    }).then((res) => {
      expect(res).toEqual({
        headers: {},
        status: 200,
        data: {},
        config: {},
        originalRes: null,
      });
    });
  });

  it("resolve options is null", () => {
    const adapter = new Adapter({
      Adapter,
    });
    return new Promise((resolve) => {
      return adapter.resolve(optionsFn(), resolve);
    }).then((res) => {
      expect(res).toEqual({
        headers: {},
        status: 200,
        data: {},
        config: {},
        originalRes: null,
      });
    });
  });

  it("resolve options is undefined", () => {
    const config: any = {
      Adapter,
    };
    const adapter = new Adapter(config);
    return new Promise((resolve) => {
      return adapter.resolve(optionsFn(), resolve);
    }).then((res) => {
      expect(res).toEqual({
        headers: {},
        status: 200,
        data: {},
        config: {},
        originalRes: null,
      });
      expect(config).toEqual({
        Adapter,
      });
    });
  });

  it("resolve options is normal", () => {
    const config: any = {
      Adapter,
    };
    const adapter = new Adapter(config);
    const resolveData = {
      headers: {
        token: "token1",
        name: "tom",
      },
      status: 200,
      data: {
        msg: "success",
        data: {
          name: "tom",
        },
      },
      response: {
        cookies: ["cookie1", "cookie2"],
      },
    };
    return new Promise((resolve) => {
      return adapter.resolve(resolveData, resolve);
    }).then((res) => {
      expect(res).toEqual({
        headers: {
          token: "token1",
          name: "tom",
        },
        status: 200,
        data: {
          msg: "success",
          data: {
            name: "tom",
          },
        },
        config: {},
        originalRes: {
          cookies: ["cookie1", "cookie2"],
        },
      });
      expect(config).toEqual({
        Adapter,
      });
    });
  });

  it("reject options is null", () => {
    const adapter = new Adapter({
      Adapter,
    });
    return new Promise((resolve, reject) => {
      return adapter.reject(optionsRejectFn(), reject);
    }).catch((err) => {
      expect(err).toEqual({
        headers: null,
        status: "NETWORK_ERROR",
        errMsg: "Reject arguments Error",
        data: null,
        config: {},
        extra: null,
        response: null,
      });
    });
  });

  it("reject options is undefined", () => {
    const adapter = new Adapter({
      Adapter,
    });
    return new Promise((resolve, reject) => {
      return adapter.reject(optionsRejectFn(), reject);
    }).catch((err) => {
      expect(err).toEqual({
        headers: null,
        status: "NETWORK_ERROR",
        errMsg: "Reject arguments Error",
        data: null,
        config: {},
        extra: null,
        response: null,
      });
    });
  });

  it("reject options is normal", () => {
    const config: any = {
      Adapter,
    };
    const adapter = new Adapter(config);
    const rejectData = {
      errMsg: "404 not found",
      status: 404,
      data: {
        msg: "success",
        data: {
          name: "tom",
        },
      },
      extra: {
        cookies: ["cookie1", "cookie2"],
      },
    };
    return new Promise((resolve, reject) => {
      return adapter.reject(rejectData, reject);
    }).catch((err) => {
      expect(err).toEqual({
        errMsg: "404 not found",
        status: 404,
        headers: {},
        data: {
          msg: "success",
          data: {
            name: "tom",
          },
        },
        config: {},
        response: null,
        extra: {
          cookies: ["cookie1", "cookie2"],
        },
      });
      expect(config).toEqual({
        Adapter,
      });
    });
  });

  it("reject options is normal, extra is undefined", () => {
    const config: any = {
      Adapter,
    };
    const adapter = new Adapter(config);
    const rejectData = {
      errMsg: "404 not found",
      status: 404,
      data: {
        msg: "success",
        data: {
          name: "tom",
        },
      },
      extra: undefined,
    };
    return new Promise((resolve, reject) => {
      return adapter.reject(rejectData, reject);
    }).catch((err) => {
      expect(err).toEqual({
        errMsg: "404 not found",
        status: 404,
        headers: {},
        data: {
          msg: "success",
          data: {
            name: "tom",
          },
        },
        config: {},
        response: null,
        extra: null,
      });
      expect(config).toEqual({
        Adapter,
      });
    });
  });

  it("subscribeCancelEvent: no cancelToken", () => {
    const config: any = {
      Adapter,
    };
    const adapter = new Adapter(config);
    const result = adapter.subscribeCancelEvent((reason) => {
      return Promise.reject(reason);
    });

    expect(result).toBeUndefined();
  });

  it("subscribeCancelEvent", () => {
    const config: any = {
      cancelToken: new CancelToken(),
      Adapter,
    };
    const adapter = new Adapter(config);
    const result = adapter.subscribeCancelEvent((reason) => {
      return Promise.reject(reason);
    });

    config.cancelToken.cancel("test");

    return result.catch((err: any) => {
      expect(err).toEqual({
        message: "test",
        isCancel: true,
      });
    });
  });
});
