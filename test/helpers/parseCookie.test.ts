import parseCookie, { serializeCookie } from "../../src/helpers/parseCookie";

describe("Cookie Test", () => {
  describe("parseCookie", () => {
    it("null or undefined or empty string", () => {
      expect(parseCookie(null)).toEqual({});

      expect(parseCookie(undefined)).toEqual({});

      expect(parseCookie("")).toEqual({});
    });

    it("cookie", () => {
      expect(parseCookie({})).toEqual({});

      expect(parseCookie("token")).toEqual({});

      expect(parseCookie(2434)).toEqual({});

      expect(parseCookie(true)).toEqual({});

      expect(parseCookie("token=123;name=tom")).toEqual({
        token: "123",
        name: "tom",
      });

      expect(parseCookie("token=123; name=tom")).toEqual({
        token: "123",
        name: "tom",
      });

      expect(parseCookie("token=123;   name=tom")).toEqual({
        token: "123",
        name: "tom",
      });

      expect(parseCookie("token=123;   name=tom;")).toEqual({
        token: "123",
        name: "tom",
      });
    });

    it('Remove " in cookie', () => {
      expect(parseCookie(`token=123;name="tom"`)).toEqual({
        token: "123",
        name: "tom",
      });
    });

    it("Custom decode", () => {
      expect(
        parseCookie(`token=123;name="tom";demo`, {
          decode: "测试",
        })
      ).toEqual({
        token: "123",
        name: "tom",
      });
    });
  });

  describe("serializeCookie", () => {
    it("null, undefined", () => {
      // expect(() => {
      //   serializeCookie();
      // }).toThrowError("argument name is invalid");

      expect(() => {
        serializeCookie("", "token1");
      }).toThrowError("argument name is invalid");

      // expect(serializeCookie("token", null)).toBe("token=null");

      // expect(serializeCookie("token")).toBe("token=undefined");
    });

    it("name: token; value: token1", () => {
      expect(serializeCookie("token", "token1")).toBe("token=token1");
    });

    it("options.maxAge", () => {
      expect(
        serializeCookie("token", "token1", {
          maxAge: 200,
        })
      ).toBe("token=token1; Max-Age=200");

      expect(() => {
        serializeCookie("token", "token1", {
          maxAge: "b23",
        });
      }).toThrowError("option maxAge is invalid");
    });

    it("options.domain", () => {
      expect(
        serializeCookie("token", "token1", {
          domain: "xxx.com",
        })
      ).toBe("token=token1; Domain=xxx.com");

      expect(() => {
        serializeCookie("token", "token1", {
          domain: "测试",
        });
      }).toThrowError("option domain is invalid");
    });

    it("options.path", () => {
      expect(
        serializeCookie("token", "token1", {
          path: "/demo",
        })
      ).toBe("token=token1; Path=/demo");

      expect(() => {
        serializeCookie("token", "token1", {
          path: "测试",
        });
      }).toThrowError("option path is invalid");
    });

    it("options.expires", () => {
      const date = new Date(Date.now() + 24 * 60 * 60 * 1000);
      expect(
        serializeCookie("token", "token1", {
          expires: date,
        })
      ).toBe("token=token1; Expires=" + date.toUTCString());

      expect(() => {
        serializeCookie("token", "token1", {
          expires: "测试",
        });
      }).toThrowError("option expires is invalid");
    });

    it("options.httpOnly", () => {
      expect(
        serializeCookie("token", "token1", {
          httpOnly: true,
        })
      ).toBe("token=token1; HttpOnly");
    });

    it("options.secure", () => {
      expect(
        serializeCookie("token", "token1", {
          secure: true,
        })
      ).toBe("token=token1; Secure");
    });

    it("options.sameSite", () => {
      expect(
        serializeCookie("token", "token1", {
          sameSite: "strict",
        })
      ).toBe("token=token1; SameSite=Strict");

      expect(
        serializeCookie("token", "token1", {
          sameSite: true,
        })
      ).toBe("token=token1; SameSite=Strict");

      expect(
        serializeCookie("token", "token1", {
          sameSite: "lax",
        })
      ).toBe("token=token1; SameSite=Lax");

      expect(
        serializeCookie("token", "token1", {
          sameSite: "none",
        })
      ).toBe("token=token1; SameSite=None");

      expect(() => {
        serializeCookie("token", "token1", {
          sameSite: "测试",
        });
      }).toThrowError("option sameSite is invalid");
    });
  });
});
