import Adapter from "../../src/adapters/Adapter";
import AppletsRequest from "../../src/core/AppletsRequest";
import getDefaults from "../../src/defaults";

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
describe("Request", () => {
  const appletsRequest = new AppletsRequest({
    ...getDefaults(),
    adapter,
  });

  it("Adapter Error", () => {
    return new AppletsRequest().request("/get").catch((err) => {
      expect(err.status).toBe("SCRIPT_ERROR");
    });
  });

  it("Normal", () => {
    return new AppletsRequest(getDefaults()).request("/get").catch((err) => {
      expect(err.status).toBe(404);
    });
  });

  it("Normal getRequestTask undefined", () => {
    return new AppletsRequest(getDefaults())
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
    return new AppletsRequest(getDefaults())
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
    const appletsRequest = new AppletsRequest(getDefaults());
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
    const appletsRequest = new AppletsRequest(getDefaults());
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
    const appletsRequestCancel = new AppletsRequest(getDefaults());
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

describe("AppletsRequest", () => {
  it("Options is config", () => {
    const appletsRequest = new AppletsRequest();
    appletsRequest.interceptors.request.use((config) => {
      return config;
    });
    appletsRequest.interceptors.request.eject(0);
    return appletsRequest
      .request({
        url: "/get1",
      })
      .catch((err) => {
        expect(err.status).toBe("SCRIPT_ERROR");
      });
  });

  it("Get", () => {
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    const appletsRequest = new AppletsRequest(getDefaults());
    return appletsRequest
      .get("/get1", {
        adapter: adapterFn,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("Delete", () => {
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    const appletsRequest = new AppletsRequest(getDefaults());
    return appletsRequest
      .delete("/get1", {
        adapter: adapterFn,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("Head", () => {
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    const appletsRequest = new AppletsRequest(getDefaults());
    return appletsRequest
      .head("/get1", {
        adapter: adapterFn,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("Options", () => {
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    const appletsRequest = new AppletsRequest(getDefaults());
    return appletsRequest
      .options("/get1", {
        adapter: adapterFn,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("Post", () => {
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    const appletsRequest = new AppletsRequest(getDefaults());
    return appletsRequest
      .post(
        "/get1",
        {},
        {
          adapter: adapterFn,
        }
      )
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("Put", () => {
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    const appletsRequest = new AppletsRequest(getDefaults());
    return appletsRequest
      .put(
        "/get1",
        {},
        {
          adapter: adapterFn,
        }
      )
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("create", () => {
    const appletsRequest = new AppletsRequest(getDefaults());
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });
    return appletsRequest
      .create()
      .put(
        "/get1",
        {},
        {
          adapter: adapterFn,
        }
      )
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("getUri", () => {
    const appletsRequest = new AppletsRequest(getDefaults());
    expect(
      appletsRequest.getUri({
        baseURL: "https://xxx.com",
        url: "/get1",
      })
    ).toBe("https://xxx.com/get1");
  });

  it("getUri empty url", () => {
    const appletsRequest = new AppletsRequest(getDefaults());
    expect(
      appletsRequest.getUri({
        baseURL: "https://xxx.com",
        url: "",
      })
    ).toBe("https://xxx.com");
  });

  it("getUri absolute url", () => {
    const appletsRequest = new AppletsRequest(getDefaults());
    expect(
      appletsRequest.getUri({
        baseURL: "https://xxx.com",
        url: "https://xxx1.com/get1",
      })
    ).toBe("https://xxx1.com/get1");
  });

  it("getUri empty baseUrl", () => {
    const appletsRequest = new AppletsRequest(getDefaults());
    expect(
      appletsRequest.getUri({
        baseURL: "",
        url: "/get1",
      })
    ).toBe("/get1");
  });

  it("all", () => {
    const appletsRequest = new AppletsRequest(getDefaults());
    const adapterFn = jest.fn().mockResolvedValue({
      response: null,
      status: 200,
      config: null,
      data: {
        username: "tom1",
      },
      originRes: null,
    });

    function get1() {
      return appletsRequest.get("/get1", {
        adapter: adapterFn,
      });
    }

    function get2() {
      return appletsRequest.get("/get1", {
        adapter: adapterFn,
      });
    }
    return appletsRequest.all([get1(), get2()]).then((res) => {
      res.forEach((item) => {
        expect(item.status).toBe(200);
      });
    });
  });

  it("all Error", () => {
    const appletsRequest = new AppletsRequest(getDefaults());

    expect(() => {
      appletsRequest.all([]);
    }).toThrow();
  });
});
