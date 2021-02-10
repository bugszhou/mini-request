/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-10 11:25:26
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-10 12:50:10
 * @Description CancelToken test case
 * 1. new 创建
 * 2. new 创建被传入监听函数，监听cancelToken创建成功并且接收取消函数为形参
 * 3. source()创建
 * 4. 订阅取消事件监听函数
 * 5. 判断是否已经执行了取消操作
 */

import CancelToken from "../../src/cancel/CancelToken";

const returnNumberFn = jest.fn();
returnNumberFn.mockReturnValue(123);

describe("CancelToken", () => {
  describe("new CancelToken()", () => {
    it("cancel", (done) => {
      const cancelToken = new CancelToken();
      cancelToken.cancel("cancel");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        done();
      });
    });

    it("double cancel", (done) => {
      const cancelToken = new CancelToken();
      cancelToken.cancel("cancel");
      cancelToken.cancel("cancel1");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        expect(canceler.message).toBe("cancel");
        done();
      });
    });

    it("double cancel throw reason", () => {
      const cancelToken = new CancelToken();
      cancelToken.cancel("cancel");
      expect(() => {
        cancelToken.throwIfRequested();
      }).toThrow();
    });
  });

  describe("new CancelToken(executor)", () => {
    it("cancel", (done) => {
      const cancelToken = new CancelToken(returnNumberFn());
      cancelToken.cancel("cancel");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        done();
      });
    });

    it("double cancel", (done) => {
      const cancelToken = new CancelToken(returnNumberFn());
      cancelToken.cancel("cancel");
      cancelToken.cancel("cancel1");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        expect(canceler.message).toBe("cancel");
        done();
      });
    });

    it("double cancel throw reason", () => {
      const cancelToken = new CancelToken(returnNumberFn());
      cancelToken.cancel("cancel");
      expect(() => {
        cancelToken.throwIfRequested();
      }).toThrow();
    });

    it("cancel use canceler", () => {
      let cancel: any;
      new CancelToken((canceler) => {
        cancel = canceler;
      });
      expect(cancel).toBeInstanceOf(Function);
      cancel!("cancel");
    });

    it("subscribeCancelEvent use canceler", (done) => {
      let cancel: any;
      const cancelToken = new CancelToken((canceler) => {
        cancel = canceler;
      });
      cancel!("cancel");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        done();
      });
    });

    it("double cancel throw reason use canceler", () => {
      let cancel: any;
      const cancelToken = new CancelToken((canceler) => {
        cancel = canceler;
      });
      cancel("cancel");
      expect(() => {
        cancelToken.throwIfRequested();
      }).toThrow();
    });
  });

  describe("CancelToken.source not executor", () => {
    it("cancel", (done) => {
      const { token: cancelToken, cancel } = CancelToken.source();
      cancel("cancel");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        done();
      });
    });

    it("double cancel", (done) => {
      const { token: cancelToken, cancel } = CancelToken.source();
      cancel("cancel");
      cancel("cancel1");
      cancelToken.subscribeCancelEvent((canceler) => {
        expect(canceler.isCancel).toBeTruthy();
        expect(canceler.message).toBe("cancel");
        done();
      });
    });

    it("double cancel throw reason", () => {
      const { token: cancelToken, cancel } = CancelToken.source();
      cancel("cancel");
      expect(() => {
        cancelToken.throwIfRequested();
      }).toThrow();
    });
  });
});
