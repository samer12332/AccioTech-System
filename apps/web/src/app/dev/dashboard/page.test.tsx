import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import DashboardPreviewPage from "./page";

it("renders the dashboard foundation essentials", () => {
  render(<DashboardPreviewPage />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Dashboard" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Static preview")).toBeInTheDocument();
  [
    "Active groups",
    "Enrolled students",
    "Upcoming sessions",
    "Pending follow-ups",
  ].forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
  expect(
    screen.getByRole("heading", { level: 2, name: "Recent activity" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Next actions" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Create group" }),
  ).toBeInTheDocument();
});
