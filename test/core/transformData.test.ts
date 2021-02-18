import transformData from "../../src/core/transformData";

describe("transformData", () => {
  it("not function", () => {
    const data = {
      username: "tom",
    };
    const formattedData = transformData(
      data,
      {
        "Content-Type": "text/plain",
      },
      undefined
    );

    expect(formattedData).toEqual(data);
  });

  it("has function", () => {
    const data = {
      username: "tom",
    };
    const headers = {
      "Content-Type": "text/plain",
    };
    let fnHeaders: any = {};

    const formattedData = transformData(
      data,
      {
        "Content-Type": "text/plain",
      },
      (data, headers) => {
        fnHeaders = headers;
        return JSON.stringify(data);
      }
    );

    expect(formattedData).toBe(JSON.stringify(data));
    expect(fnHeaders).toEqual(headers);
  });

  it("two function", () => {
    const data = {
      username: "tom",
    };
    const headers = {
      "Content-Type": "text/plain",
    };
    let fnHeaders: any = {};

    const formattedData = transformData(
      data,
      {
        "Content-Type": "text/plain",
      },
      [
        (data, headers) => {
          fnHeaders = headers;
          return JSON.stringify(data);
        },
        (data) => {
          return JSON.parse(data);
        },
      ]
    );

    expect(formattedData).toEqual(data);
    expect(fnHeaders).toEqual(headers);
  });
});
