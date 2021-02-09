import isTimeout from "../../src/error/isTimeout";

describe("isTimeout", () => {
  it("null, undefined, empty object", () => {
    expect(isTimeout(null)).toBeFalsy();
    expect(isTimeout(undefined)).toBeFalsy();
    expect(isTimeout({})).toBeFalsy();
  });

  it("normal", () => {
    expect(
      isTimeout({
        status: false,
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: true,
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: null,
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: "null",
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: 123,
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: undefined,
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: "NETWORK_ERROR",
      })
    ).toBeFalsy();

    expect(
      isTimeout({
        status: "TIMEOUT",
      })
    ).toBeTruthy();
  });
});
