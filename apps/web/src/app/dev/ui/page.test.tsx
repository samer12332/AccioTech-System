import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import UiShowcase from "./page";
it("renders the UI reference essentials", () => {
  render(<UiShowcase />);
  expect(
    screen.getByRole("heading", { level: 1, name: "AccioTech UI Foundation" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "primary" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  const loadingMessage = screen.getByText("Loading interface examples");
  expect(loadingMessage.closest('[role="status"]')).toBeInTheDocument();
});
