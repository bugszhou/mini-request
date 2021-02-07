import transformMethod from "../../src/helpers/transformMethod";

describe("transformMethod", () => {
  it("default", () => {
    expect(transformMethod()).toBe("GET");
  });

  it("post to POST", () => {
    expect(transformMethod("post")).toBe("POST");
  });
});
