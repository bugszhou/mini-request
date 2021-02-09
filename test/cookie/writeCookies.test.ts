import writeCookies from "../../src/cookie/writeCookies";

describe("writeCookies", () => {
  it("null, undefined", () => {
    const config: any = {
      autoCookies: true,
      writeCookies: 1234,
    };
    expect(writeCookies({}, null)).toBeUndefined();

    expect(writeCookies(config, undefined)).toBeUndefined();
  });

  it("writeCookies not a function", () => {
    const config: any = {
      autoCookies: true,
      writeCookies: null,
    };
    expect(writeCookies(config, null)).toBeUndefined();
  });

  it("writeCookies not a function", () => {
    const originalCookies: Record<string, any> = {
      token: "234",
    };
    let writeCookiesData = null;
    let tmpStorageKey = "";
    const config = {
      autoCookies: true,
      writeCookies: (storageKey: string, cookies: any) => {
        writeCookiesData = cookies;
        tmpStorageKey = storageKey;
      },
    };
    expect(writeCookies(config, originalCookies)).toBeUndefined();

    expect(writeCookiesData).toEqual(originalCookies);

    expect(tmpStorageKey).not.toBe("");
  });
});
