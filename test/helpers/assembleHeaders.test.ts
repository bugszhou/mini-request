import assembleReqHeaders, {
  formattedHeader,
  filterHeaders,
  combineCookiesStr,
} from "../../src/helpers/assembleHeaders";
jest.mock("../../src/adapters/wx/storageCookies");
import { getCookie } from "../../src/adapters/wx/storageCookies";

describe("formattedHeader", () => {
  it("undefined, null, empty normalizedNames", () => {
    expect(formattedHeader(null, ["Content-Type"])).toEqual({});

    expect(formattedHeader(undefined, ["Content-Type"])).toEqual({});

    expect(formattedHeader(null, [])).toEqual({});

    expect(formattedHeader({ demo: "demo" }, [])).toEqual({ demo: "demo" });
  });

  it("formatted some key", () => {
    expect(
      formattedHeader(
        {
          "content-type": "plain/text",
        },
        ["Content-Type"]
      )
    ).toEqual({
      "Content-Type": "plain/text",
    });
  });

  it("formatted different key", () => {
    expect(
      formattedHeader(
        {
          "content-type": "plain/text",
        },
        ["Accept"]
      )
    ).toEqual({
      "content-type": "plain/text",
    });
  });

  it("formatted empty headers", () => {
    expect(formattedHeader({}, ["Accept"])).toEqual({});
  });
});

describe("filterHeaders", () => {
  it("null, undefined", () => {
    expect(filterHeaders(undefined, "post")).toEqual({});
  });

  it("filter", () => {
    const headers = {
      token: "123",
      common: {
        "Content-Type": "plain/text",
      },
      post: {
        "Content-Type": "application/json",
      },
    };
    expect(filterHeaders(headers, "post")).toEqual({
      token: "123",
      "Content-Type": "application/json",
    });
    expect(filterHeaders(headers, "get")).toEqual({
      token: "123",
      "Content-Type": "plain/text",
    });
  });
});

describe("combineCookiesStr", () => {
  it("null, undefined", () => {
    (getCookie as jest.MockedFunction<any>).mockReturnValueOnce("");
    expect(combineCookiesStr(undefined, "username")).toBe("username");

    expect(combineCookiesStr(undefined, "")).toBeUndefined();
    expect(combineCookiesStr("", "")).toBe("");
    expect(combineCookiesStr("", undefined)).toBe("");
    expect(combineCookiesStr("username=tom", undefined)).toBe("username=tom");
  });

  it("combine string", () => {
    (getCookie as jest.MockedFunction<any>).mockReturnValueOnce("jack");
    expect(combineCookiesStr("age=14", "username")).toBe(
      "age=14; username=jack"
    );
  });

  it("combine null", () => {
    (getCookie as jest.MockedFunction<any>).mockReturnValueOnce(null);
    expect(combineCookiesStr("age=14", "username")).toBe("age=14; username");
  });

  it("original cookiesStr is not string", () => {
    (getCookie as jest.MockedFunction<any>).mockReturnValueOnce("tom");
    expect(combineCookiesStr({} as string, "username")).toBe("username=tom");
  });
});

describe("assembleReqHeaders", () => {
  it("null, undefined", () => {
    expect(assembleReqHeaders(undefined, undefined)).toEqual({});
    expect(assembleReqHeaders(null, undefined)).toEqual({});
  });

  it("empty headers", () => {
    expect(assembleReqHeaders({}, undefined)).toEqual({});
    expect(assembleReqHeaders({}, undefined)).toEqual({});

    expect(assembleReqHeaders({}, {})).toEqual({
      "Content-Type": "application/json; charset=utf-8",
    });
  });

  it("headers has Content-Type, do not reset content-type", () => {
    const headers = {
      "content-type": "plain/text",
    };

    const normalizedHeaders = {
      "Content-Type": "plain/text",
    };
    expect(assembleReqHeaders(headers, undefined)).toEqual({});
    expect(assembleReqHeaders(headers, undefined)).toEqual({});

    expect(assembleReqHeaders(headers, "tome")).toEqual(normalizedHeaders);
    expect(assembleReqHeaders(headers, {})).toEqual(normalizedHeaders);
  });
});
