import { encrypt, compare } from "../../../src/utils/encrypt";

describe("Hashing test cases", () => {
  it("not plain password", async () => {
    const value = "123456";
    const hash = await encrypt(value);
    expect(hash).not.toBe(value);
  });
  it("comparing hashes return true", async () => {
    const value = "123456";
    const hash = await encrypt(value);
    expect(await compare(value, hash)).toBe(true);
  });
});
