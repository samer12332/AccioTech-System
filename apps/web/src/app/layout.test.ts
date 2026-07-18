import { describe, expect, it } from "vitest";

import { metadata } from "./layout";

describe("metadata", () => {
  it("exports the application title and description", () => {
    expect(metadata.title).toBe("AccioTech Operating System");
    expect(metadata.description).toBe(
      "Internal operating system for AccioTech.",
    );
  });
});
