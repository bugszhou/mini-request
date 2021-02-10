import isCancel from "../../src/cancel/isCancel";

describe("isCancel", () => {
  it("null, undefined", () => {
    expect(isCancel(null)).toBeFalsy();
    expect(isCancel(undefined)).toBeFalsy();
  });

  it("is cancel", () => {
    const canceler = {
      isCancel: 132,
    };
    expect(isCancel(canceler)).toBeTruthy();
    expect(isCancel({})).toBeFalsy();
    expect(
      isCancel({
        isCancel: false,
      })
    ).toBeFalsy();
    expect(
      isCancel({
        isCancel: true,
      })
    ).toBeTruthy();
  });
});
