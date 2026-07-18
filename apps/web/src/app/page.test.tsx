import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the foundation content accessibly", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "AccioTech Operating System",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("From Imagination to Innovation"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Frontend foundation is ready."),
    ).toBeInTheDocument();
  });
});
