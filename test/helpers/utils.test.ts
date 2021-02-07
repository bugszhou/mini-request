import {
  assign,
  forEach,
  isDate,
  isObject,
  isPlainObject,
  merge,
} from "../../src/helpers/utils";

describe("utils module test", () => {
  describe("isDate", () => {
    it("new Date", () => {
      expect(isDate(new Date())).toBe(true);
    });

    it("String", () => {
      expect(isDate("2020-12-23")).toBe(false);
    });

    it("Number", () => {
      expect(isDate(123)).toBe(false);
    });

    it("null and undefined", () => {
      expect(isDate(null)).toBe(false);

      expect(isDate(undefined)).toBe(false);
    });

    it("Object", () => {
      expect(isDate({})).toBe(false);
    });

    it("Boolean", () => {
      expect(isDate(true)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("Basic Types", () => {
      expect(isObject(23)).toBeFalsy();

      expect(isObject("test")).toBeFalsy();

      expect(isObject(undefined)).toBeFalsy();

      expect(isObject(null)).toBeFalsy();

      expect(isObject(false)).toBeFalsy();

      expect(isObject({})).toBeTruthy();
    });

    it("Object Type", () => {
      expect(isObject(new Date())).toBeTruthy();

      expect(isObject(new String("String Type"))).toBeTruthy();

      expect(isObject(Object.create(null))).toBeTruthy();
    });
  });

  describe("isPlainObject", () => {
    it("Basic Types", () => {
      expect(isPlainObject(23)).toBe(false);

      expect(isPlainObject("test")).toBe(false);

      expect(isPlainObject(undefined)).toBe(false);

      expect(isPlainObject(null)).toBe(false);

      expect(isPlainObject(false)).toBe(false);

      expect(isPlainObject({})).toBe(true);
    });

    it("Object Type", () => {
      expect(isPlainObject(new Date())).toBe(false);

      expect(isPlainObject(new String("String Type"))).toBe(false);

      expect(
        isPlainObject({
          name: "tom",
          age: 34,
        })
      ).toBe(true);

      expect(isPlainObject(Object.create(null))).toBe(true);

      expect(isPlainObject(Object.assign({ age: 23 }))).toBe(true);

      expect(isPlainObject(Object.create({ age: 25 }))).toBe(false);
    });
  });

  describe("assign(A, B)：A拥有B中的方法和属性", () => {
    it("null or undefined", () => {
      expect(assign(null, null)).toEqual(null);
      expect(assign(null, undefined)).toEqual(null);
      expect(assign(undefined, null)).toEqual(undefined);
      expect(assign(undefined, undefined)).toEqual(undefined);
    });

    it("assign", () => {
      expect(assign({}, null)).toEqual({});

      expect(assign({}, { de: 34 })).toEqual({ de: 34 });

      expect(assign({ name: "tom" }, {})).toEqual({ name: "tom" });

      expect(assign({ name: "tom" }, undefined)).toEqual({ name: "tom" });

      expect(assign({ name: "tom" }, 123)).toEqual({ name: "tom" });

      expect(assign({ name: "tom" }, "123")).toEqual({ name: "tom" });

      expect(assign({ name: "tom" }, new Date())).toEqual({ name: "tom" });

      expect(assign({ name: "tom" }, { age: 24 })).toEqual({
        name: "tom",
        age: 24,
      });

      const B = {
        age: 35,
        speak() {
          console.log("speak");
        },
      };
      const AF = assign({ name: "tom" }, B);
      B.age = 29;
      expect(AF.name).toBe("tom");
      expect(AF.age).toBe(35);
      expect(AF.speak).toEqual(B.speak);
      expect(B.speak).toEqual(B.speak);
      expect(B.age).toEqual(29);
    });

    it("assign: B覆盖A的属性", () => {
      const A = { name: "tom", age: 27 };
      const B = {
        age: 35,
        speak,
      };
      const AF = assign(A, B);
      B.age = 29;
      B.speak = () => {
        // empty
      };

      function speak() {
        console.log("speak");
      }
      expect(AF.name).toBe("tom");
      expect(AF.age).toBe(35);
      expect(AF.speak).toEqual(speak);
      expect(B.age).toEqual(29);
    });
  });

  describe("forEach", () => {
    it("null", () => {
      const A = null;
      const B: any = {};
      forEach(A, (val, key) => {
        B[key] = val;
      });

      expect(A).toBeNull();
      expect(B).toEqual({});
    });

    it("undefined", () => {
      const A = undefined;
      const B: any = {};
      forEach(A, (val, key) => {
        B[key] = val;
      });

      expect(A).toBeUndefined();
      expect(B).toEqual({});
    });

    it("plainObject", () => {
      const A = { a: 1, b: 2, c: 3 };
      const B: any = {};

      forEach(A, (val, key) => {
        B[key] = val;
      });

      expect(A).toEqual({ a: 1, b: 2, c: 3 });
      expect(B).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("string obj", () => {
      const A = new String("123");
      const B: any = {};

      forEach(A, (val, key) => {
        B[key] = val;
      });

      expect(A).toEqual(new String("123"));
      expect(B).toEqual({
        0: "1",
        1: "2",
        2: "3",
      });
    });
    it("plain string", () => {
      const A = "123";
      const B: any = {};

      forEach(A, (val, key) => {
        B[key] = val;
      });

      expect(A).toEqual("123");
      expect(B).toEqual({
        0: "123",
      });
    });
  });

  describe("merge", () => {
    it("Basic Types", () => {
      const a = { name: "tom", age: 12 };
      const b = { sex: "male" };
      const c = merge(a, b);
      const d = merge(a, b, {
        age: 25,
      });
      const e = merge(Object.create(null), a, b, {
        name: "jade",
      });

      b.sex = "female";

      expect(c).toEqual({
        name: "tom",
        age: 12,
        sex: "male",
      });

      expect(d).toEqual({
        name: "tom",
        age: 25,
        sex: "male",
      });

      expect(e).toEqual({
        name: "jade",
        age: 12,
        sex: "male",
      });
    });

    it("Object", () => {
      const a = { name: "tom", age: 12 };
      const b = {
        sex: "male",
        students: {
          first: "a",
          second: "b",
        },
        teachers: ["a", "b", "c"],
      };
      const c = merge(a, b);

      b.students.first = "female";
      b.teachers[1] = "d";

      expect(c).toEqual({
        name: "tom",
        age: 12,
        sex: "male",
        students: {
          first: "a",
          second: "b",
        },
        teachers: ["a", "b", "c"],
      });

      expect(b).toEqual({
        sex: "male",
        students: {
          first: "female",
          second: "b",
        },
        teachers: ["a", "d", "c"],
      });
    });
  });
});
