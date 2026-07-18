import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

function ToggleExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button type="button" onClick={() => setEnabled(true)}>
      {enabled ? "Enabled" : "Enable"}
    </button>
  );
}

describe("user interaction foundation", () => {
  it("updates visible button state after a user click", async () => {
    const user = userEvent.setup();
    render(<ToggleExample />);

    await user.click(screen.getByRole("button", { name: "Enable" }));

    expect(screen.getByRole("button", { name: "Enabled" })).toBeInTheDocument();
  });
});
