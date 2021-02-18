import transformConfig from "../../src/core/transformConfig";

describe("transformData", () => {
  it("not function", () => {
    const config = {
      data: {
        username: "tom",
      },
      headers: {
        "Content-Type": "text/plain",
      },
    };
    const formattedData = transformConfig(config, undefined);

    expect(formattedData).toEqual(config);
  });

  it("has function", () => {
    const config = {
      data: {
        username: "tom",
      },
      headers: {
        "Content-Type": "text/plain",
      },
    };
    let fnHeaders: any = {};

    const formattedConfig = transformConfig(config, (tmpConfig: any = {}) => {
      fnHeaders = tmpConfig.headers;
      tmpConfig.data.age = 123;
      tmpConfig.method = "GET";
      return tmpConfig;
    });

    expect(formattedConfig).toEqual({
      method: "GET",
      data: {
        username: "tom",
        age: 123,
      },
      headers: {
        "Content-Type": "text/plain",
      },
    });
    expect(fnHeaders).toEqual(config.headers);
  });

  it("two function", () => {
    const data = {
      username: "tom",
    };
    const config = {
      data,
      headers: {
        "Content-Type": "text/plain",
      },
    };
    let fnHeaders: any = {};

    const formattedConfig = transformConfig(config, [
      (tmpConfig: any = {}) => {
        fnHeaders = tmpConfig?.headers;
        tmpConfig.method = "GET";
        return tmpConfig;
      },
      (tmpConfig: any = {}) => {
        tmpConfig.data.age = 123;
        return tmpConfig;
      },
    ]);

    expect(formattedConfig).toEqual({
      method: "GET",
      data: {
        username: "tom",
        age: 123,
      },
      headers: {
        "Content-Type": "text/plain",
      },
    });
    expect(fnHeaders).toEqual(config.headers);
  });
});
