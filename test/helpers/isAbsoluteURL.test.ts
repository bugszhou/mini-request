import isAbsoluteURL from "../../src/helpers/isAbsoluteURL";

describe("isAbsoluteURL", () => {
  it("not absolute url", () => {
    expect(isAbsoluteURL("")).toBeFalsy();

    expect(isAbsoluteURL("xxx.com")).toBeFalsy();

    // expect(isAbsoluteURL()).toBeFalsy();

    // expect(isAbsoluteURL(null)).toBeFalsy();

    expect(isAbsoluteURL(undefined)).toBeFalsy();

    // expect(isAbsoluteURL(123)).toBeFalsy();

    // expect(isAbsoluteURL(true)).toBeFalsy();

    expect(isAbsoluteURL("19.14.23.12")).toBeFalsy();
  });

  it("is absolute url", () => {
    expect(isAbsoluteURL("http://19.14.23.12")).toBeTruthy();

    expect(isAbsoluteURL("https://19.14.23.12")).toBeTruthy();

    expect(isAbsoluteURL("http://xxx.com")).toBeTruthy();

    expect(isAbsoluteURL("https://www.xxx.com")).toBeTruthy();

    expect(isAbsoluteURL("//www.xxx.com")).toBeTruthy();
  });
});
