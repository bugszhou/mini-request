import Cancel from "../../src/cancel/Cancel";

const fn = jest.fn();
fn.mockReturnValueOnce(null);
fn.mockReturnValueOnce(undefined);
fn.mockReturnValueOnce("test");

describe("Cancel", () => {
  it("message null", () => {
    const cancel = new Cancel(fn());
    expect(cancel.message).toBeNull();
    expect(cancel.toString()).toBe("Cancel: ");
  });

  it("message undefined", () => {
    const cancel = new Cancel(fn());
    expect(cancel.message).toBeUndefined();
    expect(cancel.toString()).toBe("Cancel: ");
  });

  it("message test", () => {
    const cancel = new Cancel(fn());
    expect(cancel.message).toBe("test");
  });

  it("isCancel", () => {
    const cancel = new Cancel("test");
    expect(cancel.isCancel).toBeTruthy();
  });

  it("toString", () => {
    const cancel = new Cancel("test");
    expect(cancel.toString()).toBe("Cancel: test");
  });
});
