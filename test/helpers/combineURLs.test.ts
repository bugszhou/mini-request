import combineURLs from "../../src/helpers/combineURLs";

describe("combineURLs", () => {
  it("baseURL undefined", () => {
    expect(combineURLs(undefined, "")).toBe("");
    expect(combineURLs(undefined, "/demo")).toBe("/demo");
  });

  it("relativeURL undefined", () => {
    expect(combineURLs("https://xxx.com", undefined)).toBe("https://xxx.com");
  });

  it("base combine", () => {
    expect(combineURLs("https://xxx.com", "/api/send")).toBe(
      "https://xxx.com/api/send"
    );
  });

  it("base end of / combine", () => {
    expect(combineURLs("https://xxx.com/", "/api/send")).toBe(
      "https://xxx.com/api/send"
    );
  });

  it("relative not start of / combine", () => {
    expect(combineURLs("https://xxx.com/", "api/send")).toBe(
      "https://xxx.com/api/send"
    );
  });
});
