import { getEnv, isDevelopment, isTest } from "@utils/env";

describe("env", () => {
  let initialProcess: NodeJS.ProcessEnv;

  beforeAll(() => {
    initialProcess = process.env;
  });

  afterEach(() => {
    process.env = initialProcess;
  });

  describe("getEvn", () => {
    it("should return the correct env variable", () => {
      process.env.TEST_ENV = "Test Variable";
      expect(getEnv("TEST_ENV")).toBe("Test Variable");
    });
  });

  describe("isDevelopment", () => {
    it("should return true in development environment", () => {
      process.env.NODE_ENV = "development";
      expect(isDevelopment()).toBe(true);
    });
  });

  describe("isTest", () => {
    it("should return true in test environment", () => {
      process.env.NODE_ENV = "test";
      expect(isTest()).toBe(true);
    });
  });
});
