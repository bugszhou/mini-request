import InterceptorManager from "../../src/core/InterceptorManager";

describe("InterveptorManager", () => {
  const interceptorManager = new InterceptorManager<any>();
  const fn = jest.fn();
  const fnNull = jest.fn();
  fnNull.mockReturnValue(null);
  fn.mockReturnValue(undefined);

  it("new", () => {
    expect(interceptorManager).toBeInstanceOf(InterceptorManager);
  });

  it("use", () => {
    expect(() => {
      interceptorManager.use(() => {
        return "resolve it use";
      });
      interceptorManager.use(fn(), () => {
        return "it use";
      });
      interceptorManager.use(fnNull(), fnNull());
    }).not.toThrow();
  });

  it("eject", () => {
    expect(() => {
      interceptorManager.eject(2);
      interceptorManager.eject(fn());
    }).not.toThrow();

    expect(interceptorManager.size()).toBe(3);
  });

  it("forEach", () => {
    interceptorManager.forEach((interceptor, interceptorId) => {
      if (interceptorId === 0) {
        expect(interceptor.fulfilled).toBeInstanceOf(Function);
        expect(interceptor.rejected).toBeUndefined();
      }

      if (interceptorId === 1) {
        expect(interceptor.fulfilled).toBeUndefined();
        expect(interceptor.rejected).toBeInstanceOf(Function);
      }

      if (interceptorId === 2) {
        expect(interceptor).toBeNull();
      }
    });
  });
});
