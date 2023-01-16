const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the same partitionKey value if the length value is less than MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "test"});
    expect(trivialKey).toBe("test");
  });
  it("Stringifies partitionKey value if the length of the value is less than MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 123});
    expect(trivialKey).toBe("123");
  });
  it("Returns a hashed value of the parameter data if the parameter does not contain partitionKey", () => {
    let data = {test: "test"}
    const trivialKey = deterministicPartitionKey(data);
    let expected  = crypto.createHash("sha3-512").update(JSON.stringify(data)).digest("hex")
    expect(trivialKey).toBe(expected);
  });
  it("Returns a hashed value if the length of the partitionKey value is more than MAX_PARTITION_KEY_LENGTH", () => {
    let value = '#'.repeat(300);
    let data = {partitionKey: value}
    const trivialKey = deterministicPartitionKey(data);
    let expected  = crypto.createHash("sha3-512").update(value).digest("hex");
    expect(trivialKey).toBe(expected);
  });
});
