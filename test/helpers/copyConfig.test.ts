import copyConfig from "../../src/helpers/copyConfig";

describe("copyConfig", () => {
  it("null, undefined", () => {
    expect(copyConfig(null)).toEqual({});

    expect(copyConfig(undefined)).toEqual({});
  });

  it("empty object", () => {
    expect(copyConfig({})).toEqual({});
  });

  it("function", () => {
    const demo = () => {
      console.log(demo);
    };

    expect(copyConfig(demo)).toEqual({
      0: demo,
    });
  });

  it("Array", () => {
    const arr = [1, 2, 4];

    expect(copyConfig(arr)).toEqual([1, 2, 4]);
  });

  it("config", () => {
    const config = {
      url: "https://xxx.com/api/demo",
      data: {
        test: {
          name: "tom",
          age: 12,
        },
      },
    };
    const copyData = copyConfig(config);

    config.data.test.age = 25;

    expect(copyData).toEqual({
      url: "https://xxx.com/api/demo",
      data: {
        test: {
          name: "tom",
          age: 12,
        },
      },
    });

    expect(config).toEqual({
      url: "https://xxx.com/api/demo",
      data: {
        test: {
          name: "tom",
          age: 25,
        },
      },
    });
  });
});
