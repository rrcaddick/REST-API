import { MongooseUserRepository } from "@root/infrastructure/repositories/typegoose/user.repository";
import { IUser } from "@root/domain/user";
import { IRepository } from "@repositories";
import { getModelForClass } from "@typegoose/typegoose";

const testUser: IUser = {
  id: 1,
  name: "Ray",
  email: "test@test.com",
  phoneNumbers: [],
};

function getMockedToObject() {
  return { toObject: jest.fn(() => testUser) };
}

function getMockModelMethods() {
  return {
    create: jest.fn().mockResolvedValue(getMockedToObject()),
    findOneAndUpdate: jest.fn().mockResolvedValue(getMockedToObject()),
    findByIdAndDelete: jest.fn().mockResolvedValue(getMockedToObject()),
  };
}

function getMockedTypegoose() {
  return {
    prop: jest.fn(),
    getModelForClass: jest.fn(() => getMockModelMethods()),
  };
}

jest.mock("@typegoose/typegoose", () => getMockedTypegoose());

describe("user.repository", () => {
  let userRepo: IRepository<IUser>;

  beforeEach(() => {
    userRepo = new MongooseUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a user and return it", async () => {
      const { id, ...newUser } = testUser;

      await expect(userRepo.create(newUser)).resolves.toEqual(testUser);
    });
  });

  describe("update", () => {
    it("should update a user and return it", async () => {
      const { id, ...updatedUser } = testUser;

      await expect(userRepo.create(updatedUser)).resolves.toEqual(testUser);
    });

    it("should throw an error if no user is found", async () => {
      const mockedGetModelForClass = getModelForClass as jest.Mock;

      mockedGetModelForClass.mockReturnValue({
        findOneAndUpdate: jest.fn().mockResolvedValue(undefined),
        findByIdAndDelete: jest.fn().mockResolvedValue(getMockedToObject()),
      });

      const errorUserRepo = new MongooseUserRepository();

      await expect(errorUserRepo.update("1", testUser)).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("delete", () => {
    it("should delete a user and return it", async () => {
      await expect(userRepo.delete("1")).resolves.toEqual(testUser);
    });

    it("should throw an error if a user is not found", async () => {
      const mockedGetModelForClass = getModelForClass as jest.Mock;

      mockedGetModelForClass.mockReturnValue({
        findByIdAndDelete: jest.fn().mockResolvedValue(undefined),
      });

      const errorUserRepo = new MongooseUserRepository();

      await expect(errorUserRepo.delete("1")).rejects.toThrow("User not found");
    });
  });
});
