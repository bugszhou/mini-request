import mergeConfig from "../../src/core/mergeConfig";
import defaultConfig from "../../src/defaults";

describe("mergeConfig", () => {
  it("merge undefined", () => {
    const config = mergeConfig(defaultConfig, undefined);
    const mergedConfig = {
      transformConfig: [],
      transformResponse: [],
      timeout: 10000,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      headers: {
        common: {
          Accept: "application/json, text/plain, */*",
        },
        delete: {},
        get: {},
        head: {},
        options: {},
        post: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        put: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        patch: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    };
    expect(config.transformRequest).toBeInstanceOf(Array);
    expect(config.validateStatus).toBeInstanceOf(Function);
    delete config.transformRequest;
    delete config.validateStatus;
    expect(config).toEqual(mergedConfig);
  });

  it("merge config", () => {
    function validateStatus() {
      return false;
    }
    const config2 = {
      url: "/demo/test",
      baseURL: "https://www.xxx.com",
      data: {
        username: "tom",
        info: {
          age: 12,
        },
      },
      validateStatus,
    };
    const mergedConfig = {
      url: "/demo/test",
      baseURL: "https://www.xxx.com",
      data: {
        username: "tom",
        info: {
          age: 12,
        },
      },
      transformConfig: [],
      transformResponse: [],
      timeout: 10000,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      headers: {
        common: {
          Accept: "application/json, text/plain, */*",
        },
        delete: {},
        get: {},
        head: {},
        options: {},
        post: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        put: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        patch: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    };
    const config = mergeConfig(defaultConfig, config2);
    expect(config.transformRequest).toBeInstanceOf(Array);
    expect(config.validateStatus).toEqual(validateStatus);
    delete config.transformRequest;
    delete config.validateStatus;
    expect(config).toEqual(mergedConfig);
  });

  it("merge deep config", () => {
    function validateStatus() {
      return false;
    }
    const config2 = {
      url: "/demo/test",
      baseURL: "https://www.xxx.com",
      params: {
        username: "tom",
        info: {
          age: 12,
        },
      },
    };
    const mergedConfig = {
      url: "/demo/test",
      baseURL: "https://www.xxx.com",
      params: {
        username: "tom",
        info: {
          age: 12,
          father: "tome",
        },
      },
    };
    const config = mergeConfig(
      {
        params: {
          username: "tom",
          info: {
            father: "tome",
          },
        },
      },
      config2
    );
    expect(config).toEqual(mergedConfig);
  });
});