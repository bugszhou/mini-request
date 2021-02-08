import normalizeHeaderName from "../../src/helpers/normalizeHeaderName";

describe("normalizeHeaderName", () => {
  it("null headers", () => {
    const headers = null;
    normalizeHeaderName(null, "");
    expect(headers).toBeNull();
  });

  it("undefined headers", () => {
    let headers: any;

    normalizeHeaderName(headers, "");

    expect(headers).toBeUndefined();
  });

  it("empty headers", () => {
    const headers = {};
    normalizeHeaderName(headers, "");
    expect(headers).toEqual({});
  });

  it("normalize header", () => {
    const headers = {
      "content-type": "plain/text",
    };

    normalizeHeaderName(headers, "Content-Type");
    expect(headers).toEqual({
      "Content-Type": "plain/text",
    });
  });
});
