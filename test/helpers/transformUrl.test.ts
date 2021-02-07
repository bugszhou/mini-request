/**
 *
 * 1. 丢弃URL中哈希#部分
 * 2. 忽略null和undefined的数据
 * 3. 参数值为数组
 * 4. 参数值为对象
 * 5. 参数值为Date类型
 * 6. 可以出现在URL中的特殊字符
 * 7. 保留url中的参数
 */
import transformUrl from "../../src/helpers/transformUrl";

describe("transformUrl", () => {
  it("params undefined", () => {
    expect(transformUrl("", undefined)).toEqual("");
  });

  it("no params", () => {
    expect(transformUrl("base/url")).toEqual("base/url");
  });

  it("remove hash", () => {
    expect(transformUrl("base/url#demo")).toEqual("base/url");
  });

  it("remove null and undefined", () => {
    expect(
      transformUrl("base/url#demo", {
        p1: null,
        p2: undefined,
      })
    ).toEqual("base/url");
  });

  it("remove null and undefined, has p3", () => {
    expect(
      transformUrl("base/url#demo", {
        p1: null,
        p2: undefined,
        p3: 2,
      })
    ).toEqual("base/url?p3=2");
  });

  it("Param Array", () => {
    expect(
      transformUrl("base/url#demo", {
        p1: null,
        p2: undefined,
        p3: [2, "test"],
      })
    ).toEqual("base/url?p3[]=2&p3[]=test");
  });

  it("Param Object", () => {
    expect(
      transformUrl("base/url#demo", {
        p1: null,
        p2: undefined,
        p3: { demo: 3 },
      })
    ).toEqual("base/url?p3=%7B%22demo%22:3%7D");
  });

  it("Param Date", () => {
    expect(
      transformUrl("base/url#demo", {
        p1: null,
        p2: undefined,
        p3: new Date("2021-01-30T13:02:49.173Z"),
      })
    ).toEqual(`base/url?p3=2021-01-30T13:02:49.173Z`);
  });

  it("Param Empty String", () => {
    expect(
      transformUrl("base/url#demo", {
        p1: "",
        p2: "",
      })
    ).toEqual(`base/url`);
  });

  it("Param Remain Query", () => {
    expect(
      transformUrl("base/url?demo=test#demo", {
        p1: null,
        p2: undefined,
        p3: new Date("2021-01-30T13:02:49.173Z"),
      })
    ).toEqual("base/url?demo=test&p3=2021-01-30T13:02:49.173Z");
  });

  it("Params is string", () => {
    expect(transformUrl("base/url", "test")).toEqual("base/url?test");
  });

  it("Params is string and url has query", () => {
    expect(transformUrl("base/url?demo=234", "test")).toEqual(
      "base/url?demo=234&test"
    );
  });

  it("paramsSerializer", () => {
    expect(
      transformUrl(
        "base/url?demo=234",
        { test: 132, name: "tom" },
        (params) => {
          const queryStrs = Object.entries(params).map(([key, val]) => {
            return `${key}=${val}`;
          });
          return queryStrs.join("&");
        }
      )
    ).toEqual("base/url?demo=234&test=132&name=tom");
  });

  it("paramsSerializer no transform param", () => {
    expect(
      transformUrl("base/url?demo=234", { test: 132, name: "tom" }, () => {
        return "name=tom";
      })
    ).toEqual("base/url?demo=234&name=tom");
  });
});
