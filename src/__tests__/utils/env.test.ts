import { describe } from "node:test";
import { getEnv, isDevelopment } from "../../utils/env";

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
