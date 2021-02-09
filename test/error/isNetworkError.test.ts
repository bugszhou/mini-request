import isNetworkError from "../../src/error/isNetworkError";

describe("isNetworkError", () => {
  it("null, undefined, empty object", () => {
    expect(isNetworkError(null)).toBeFalsy();
    expect(isNetworkError(undefined)).toBeFalsy();
    expect(isNetworkError({})).toBeFalsy();
  });

  it("normal", () => {
    expect(
      isNetworkError({
        status: false,
      })
    ).toBeFalsy();

    expect(
      isNetworkError({
        status: true,
      })
    ).toBeFalsy();

    expect(
      isNetworkError({
        status: null,
      })
    ).toBeFalsy();

    expect(
      isNetworkError({
        status: "null",
      })
    ).toBeFalsy();

    expect(
      isNetworkError({
        status: 123,
      })
    ).toBeFalsy();

    expect(
      isNetworkError({
        status: undefined,
      })
    ).toBeFalsy();

    expect(
      isNetworkError({
        status: "NETWORK_ERROR",
      })
    ).toBeTruthy();
  });
});
