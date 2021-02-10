import defaultAdapter from "../../src/adapters";

describe("defaultAdapter", () => {
  it("Get default", () => {
    const request = defaultAdapter();
    return request({}).then((res) => {
      expect(res).toEqual({
        headers: {},
        config: { method: "GET" },
        data: {},
        status: 404,
        originalRes: null,
      });
    });
  });
});
