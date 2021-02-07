import isURLSameOrigin from "../../src/helpers/isURLSameOrigin";

describe("isURLSameOrigin", () => {
  it("同域", () => {
    expect(isURLSameOrigin()).toBeTruthy();
  });
});
