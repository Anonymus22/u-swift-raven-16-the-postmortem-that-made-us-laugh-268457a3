import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I asked the agent to quiet one noisy warning in our build log. It quieted the entire logger instead — including the payment-failure alerts — so the first we heard about the outage was a customer tweeting a screenshot of our own checkout error page.";

// Validate the entry before writing: 1–400 characters, non-whitespace-only,
// and 1–2 sentences (count sentence-ending punctuation . ! ?).
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(
    `Entry length check failed: expected 1–400 characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry non-whitespace check failed: entry is whitespace-only");
}
const sentenceEndings = (ENTRY.match(/[.!?]/g) ?? []).length;
if (sentenceEndings < 1 || sentenceEndings > 2) {
  throw new Error(
    `Entry sentence-count check failed: expected 1–2 sentences, found ${sentenceEndings} sentence-ending punctuation marks`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
