const crypto = require("crypto");
const generateCandidate = (event) => {
  let candidate;
  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }
  return candidate;
}

const stringifyCandidateData = (candidate) => {
  const TRIVIAL_PARTITION_KEY = "0";
  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  return candidate;
}

const encodeCandidateData = (candidate) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate
}

exports.deterministicPartitionKey = (event) => {
  let candidate;
  if (event) {
    candidate = generateCandidate(event)
  }
  candidate = stringifyCandidateData(candidate)
  candidate = encodeCandidateData(candidate)
  
  return candidate;
};