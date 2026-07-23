import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, Button, Input, LoadingState, SectionHeader } from ".";

describe("UI primitives", () => {
  it("renders a disabled button", () => {
    render(<Button disabled>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });
  it("preserves native input attributes", () => {
    render(
      <Input aria-label="Email address" disabled name="email" type="email" />,
    );
    const input = screen.getByRole("textbox", { name: "Email address" });
    expect(input).toHaveAttribute("name", "email");
    expect(input).toBeDisabled();
  });
  it("exposes alert content accessibly", () => {
    render(
      <Alert variant="danger" title="Unable to save">
        Please try again.
      </Alert>,
    );
    expect(
      screen.getByRole("alert", { name: "Unable to save" }),
    ).toHaveTextContent("Please try again.");
  });
  it("renders an accessible loading status", () => {
    render(<LoadingState message="Loading records" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading records");
  });
  it("renders the requested heading level", () => {
    render(<SectionHeader level={3} title="Recent activity" />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Recent activity" }),
    ).toBeInTheDocument();
  });
});
