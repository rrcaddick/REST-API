import { parseEnumToObject } from "@utils/enum";

describe("parseEnumToObject", () => {
  it("it should correctly parse a string enum", () => {
    enum TestEnum {
      val1 = "test1",
      val2 = "test2",
    }

    expect(parseEnumToObject(TestEnum)).toEqual({
      val1: "test1",
      val2: "test2",
    });
  });

  it("it should correctly parse a numeric enum", () => {
    enum TestEnum {
      val1,
      val2,
    }

    expect(parseEnumToObject(TestEnum)).toEqual({
      val1: 0,
      val2: 1,
    });
  });

  it("it should correctly parse a mixed enum", () => {
    enum TestEnum {
      val1 = "test1",
      val2 = 1,
    }

    expect(parseEnumToObject(TestEnum)).toEqual({
      val1: "test1",
      val2: 1,
    });
  });

  it("it should correctly parse a computed enum", () => {
    enum TestEnum {
      val1 = 5,
      val2 = val1 * 2,
      val3,
    }

    expect(parseEnumToObject(TestEnum)).toEqual({
      val1: 5,
      val2: 10,
      val3: 11,
    });
  });
});
