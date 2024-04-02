import { getEnv, isDevelopment } from "@utils/env";

describe("env", () => {
  let initialProcess: NodeJS.ProcessEnv;

  beforeAll(() => {
    initialProcess = process.env;
  });

  afterEach(() => {
    process.env = initialProcess;
  });

  describe("getEvn", () => {
    process.env.TEST_ENV = "Test Variable";

    it("should return the correct env variable", () => {
      expect(getEnv("TEST_ENV")).toBe("Test Variable");
    });
  });

  describe("isDevelopment", () => {
    process.env.NODE_ENV = "development";
    it("should return true in development environment", () => {
      expect(isDevelopment()).toBe(true);
    });
  });
});
