import Adapter from "../../src/adapters/Adapter";
import AppletsRequest from "../../src/core/AppletsRequest";
import defaults from "../../src/defaults";

const adapter = jest.fn();
adapter.mockRejectedValueOnce({
  response: {
    data: {
      username: "tom",
    },
  },
  status: 404,
  config: null,
  errMsg: null,
  extra: null,
});

adapter.mockResolvedValueOnce({
  response: null,
  status: 200,
  config: null,
  errMsg: null,
  data: {
    username: "tom",
  },
  originRes: null,
});

adapter.mockRejectedValueOnce({
  response: null,
  status: "NETWORK_ERROR",
  config: null,
  errMsg: null,
  extra: null,
});

adapter.mockRejectedValueOnce({
  response: null,
  status: "TIMEOUT",
  config: null,
  errMsg: null,
  extra: null,
});

/**
 * 1. 网络异常
 * 2. 超时
 * 3. 200
 * 4. 404
 * 5. 500
 */
describe("AppletsRequest", () => {
  const appletsRequest = new AppletsRequest({
    ...defaults,
    adapter,
  });

  it("Adapter Error", () => {
    return new AppletsRequest().request("/get").catch((err) => {
      expect(err.status).toBe("SCRIPT_ERROR");
    });
  });

  it("Normal", () => {
    return new AppletsRequest(defaults).request("/get").catch((err) => {
      expect(err.status).toBe(404);
    });
  });

  it("Normal getRequestTask undefined", () => {
    return new AppletsRequest(defaults)
      .request("/get", {
        getRequestTask: undefined,
        adapter: jest.fn().mockRejectedValue({
          response: {
            data: {
              username: "tom",
            },
          },
          status: 404,
          config: null,
          errMsg: null,
          extra: null,
        }),
      })
      .catch((err) => {
        expect(err.status).toBe(404);
      });
  });

  it("Normal getRequestTask", () => {
    return new AppletsRequest(defaults)
      .request("/get", {
        getRequestTask() {
          console.log("getRequestTask");
        },
        adapter: jest.fn().mockRejectedValue({
          response: {
            data: {
              username: "tom",
            },
          },
          status: 404,
          config: null,
          errMsg: null,
          extra: null,
        }),
      })
      .catch((err) => {
        expect(err.status).toBe(404);
      });
  });

  it("404", () => {
    return appletsRequest.request("/get").catch((err) => {
      expect(err.status).toBe(404);
    });
  });

  it("200", () => {
    return appletsRequest.request("/get").then((res) => {
      expect(res.status).toBe(200);
      expect(res.data).toEqual({
        username: "tom",
      });
    });
  });

  it("NETWORK_ERROR", () => {
    return appletsRequest.request("/get").catch((err) => {
      expect(err.status).toBe("NETWORK_ERROR");
    });
  });

  it("TIMEOUT", () => {
    return appletsRequest.request("/get").catch((err) => {
      expect(err.status).toBe("TIMEOUT");
    });
  });

  it("XSRF", () => {
    const appletsRequest = new AppletsRequest(defaults);
    return appletsRequest
      .request("/get", {
        readCookies() {
          return {
            "XSRF-TOKEN": "XSRF-TOKEN",
          };
        },
        getRequestTask() {
          console.log("getRequestTask");
        },
        adapter: jest.fn().mockRejectedValue({
          response: {
            data: {
              username: "tom",
            },
          },
          status: 404,
          config: null,
          errMsg: null,
          extra: null,
        }),
      })
      .catch((err) => {
        expect(err.status).toBe(404);
      });
  });

  it("Cancel Before Request", () => {
    const appletsRequest = new AppletsRequest(defaults);
    const cancelToken = new appletsRequest.CancelToken();
    cancelToken.cancel("test cancel");
    return appletsRequest
      .request("/get", {
        readCookies() {
          return {
            "XSRF-TOKEN": "XSRF-TOKEN",
          };
        },
        getRequestTask() {
          console.log("getRequestTask");
        },
        adapter: jest.fn().mockRejectedValue({
          response: {
            data: {
              username: "tom",
            },
          },
          status: 404,
          config: null,
          errMsg: null,
          extra: null,
        }),
        cancelToken,
      })
      .catch((err) => {
        expect(appletsRequest.isCancel(err)).toBeTruthy();
      });
  });

  it("Cancel After Request", (done) => {
    const appletsRequestCancel = new AppletsRequest(defaults);
    const cancelToken = new appletsRequestCancel.CancelToken();
    const config: any = {
      readCookies() {
        return {
          "XSRF-TOKEN": "XSRF-TOKEN",
        };
      },
      getRequestTask() {
        console.log("getRequestTask");
      },
      adapter() {
        return new Promise((resolve, reject) => {
          const ad = new Adapter({
            ...config,
            Adapter,
          });
          ad.subscribeCancelEvent((reason) => {
            reject(reason);
          });
        });
      },
      cancelToken,
    };

    appletsRequestCancel.request("/get", config).catch((err) => {
      expect(appletsRequestCancel.isCancel(err)).toBeTruthy();
      done();
    });
    setTimeout(() => {
      cancelToken.cancel("test cancel");
    }, 200);
  });
});
