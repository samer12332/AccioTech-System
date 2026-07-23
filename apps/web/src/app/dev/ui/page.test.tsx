import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import UiShowcase from "./page";

it("renders the UI foundation reference essentials", () => {
  render(<UiShowcase />);

  expect(
    screen.getByRole("heading", { level: 1, name: "UI Foundation" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: "UI foundation sections" }),
  ).toHaveTextContent("Foundation");
  expect(screen.getByText("--color-primary")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "primary" })).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: "Email address" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: "Reference name" }),
  ).toHaveAttribute("aria-describedby", "reference-invalid-error");
  expect(
    screen.getByText("Enter a descriptive reference name."),
  ).toHaveAttribute("id", "reference-invalid-error");
  expect(
    screen.getByRole("alert", { name: "Unable to continue" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Loading interface examples").closest('[role="status"]'),
  ).toBeInTheDocument();
});
