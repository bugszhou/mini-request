import getCookies, { getCookie } from "../../src/cookie/getCookies";

export type IFn = (storageKey: string) => Record<string, any>;

describe("getCookies", () => {
  const fn = jest.fn();
  fn.mockReturnValueOnce(null)
    .mockReturnValueOnce(undefined)
    .mockReturnValueOnce(123)
    .mockReturnValueOnce("demo");

  it("null, undefined", () => {
    expect(getCookies(fn())).toEqual({});
    expect(getCookies(fn())).toEqual({});
  });

  it("readCookies not a function", () => {
    expect(
      getCookies({
        readCookies: fn() as IFn,
      })
    ).toEqual({});

    expect(
      getCookies({
        readCookies: fn() as IFn,
      })
    ).toEqual({});

    let tmpStorageKey = "";
    const readCookies = (storageKey: string) => {
      tmpStorageKey = storageKey;
      return {
        token: "token1",
      };
    };

    expect(
      getCookies({
        readCookies,
      })
    ).toEqual({
      token: "token1",
    });

    expect(tmpStorageKey).not.toBe("");
    expect(tmpStorageKey).not.toBeUndefined();
    expect(tmpStorageKey).not.toBeNull();
  });
});

describe("getCookie", () => {
  const fn = jest.fn();
  fn.mockReturnValueOnce(null)
    .mockReturnValueOnce(undefined)
    .mockReturnValueOnce(null)
    .mockReturnValue(undefined);

  const cookies = {
    name: "tom",
  };
  it("null, undefined", () => {
    expect(getCookie(fn(), undefined)).toBe("");
    expect(getCookie(fn(), undefined)).toBe("");
    expect(getCookie(fn(), "name")).toBe("");
    expect(getCookie(fn(), "name")).toBe("");
  });

  it("normal cookies", () => {
    expect(getCookie(cookies, undefined)).toBe("");
    expect(getCookie(cookies, "")).toBe("");
    expect(getCookie(cookies, "token")).toBe("");
    expect(getCookie(cookies, "name")).toBe("tom");
  });
});
