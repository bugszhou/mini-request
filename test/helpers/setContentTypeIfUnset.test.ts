import setContentTypeIfUnset from "../../src/helpers/setContentTypeIfUnset";

describe("setContentTypeIfUnset", () => {
  it("unSetContentType", () => {
    const headers = {};
    setContentTypeIfUnset(headers, "application/json");
    expect(headers).toEqual({
      "Content-Type": "application/json",
    });
  });
  it("hadSetContentType", () => {
    const headers = {
      "Content-Type": "plain/text",
    };
    setContentTypeIfUnset(headers, "application/json");
    expect(headers).toEqual({
      "Content-Type": "plain/text",
    });
  });
});
