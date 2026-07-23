import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppShell } from ".";

const navigationItems = [
  { href: "#overview", label: "Overview" },
  { href: "#content", label: "Content" },
];

function renderShell() {
  return render(
    <AppShell
      activeNavigationItem="#overview"
      navigationItems={navigationItems}
      pageTitle="Shell preview"
    >
      <p>Foundation content</p>
    </AppShell>,
  );
}

describe("AppShell", () => {
  it("renders its page title and main content", () => {
    renderShell();

    expect(
      screen.getByRole("heading", { level: 1, name: "Shell preview" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Foundation content");
  });

  it("marks the active navigation item as the current page", () => {
    renderShell();

    expect(
      screen.getAllByRole("link", { name: "Overview" })[0],
    ).toHaveAttribute("aria-current", "page");
  });

  it("connects the skip link to the main content", () => {
    renderShell();

    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("opens the mobile menu from the menu button", async () => {
    const user = userEvent.setup();
    renderShell();

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Close navigation menu" }),
    ).toBeInTheDocument();
  });

  it("closes the mobile menu using Escape", async () => {
    const user = userEvent.setup();
    renderShell();

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    await user.click(menuButton);
    await user.keyboard("{Escape}");

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("button", { name: "Close navigation menu" }),
    ).not.toBeInTheDocument();
  });

  it("closes the mobile menu using its close button", async () => {
    const user = userEvent.setup();
    renderShell();

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Close navigation menu" }),
    );

    expect(
      screen.queryByRole("dialog", { name: "Navigation" }),
    ).not.toBeInTheDocument();
  });
});
