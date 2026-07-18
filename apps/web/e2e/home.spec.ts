import { expect, test } from "@playwright/test";

test("homepage renders the foundation content without browser errors", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().startsWith("Failed to load resource:")
    ) {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });
  page.on("response", (response) => {
    if (response.status() < 400) {
      return;
    }

    const pathname = new URL(response.url()).pathname;
    const isAllowedFaviconResponse =
      response.status() === 404 && pathname === "/favicon.ico";

    if (!isAllowedFaviconResponse) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto("/", { waitUntil: "networkidle" });
  if (!response) {
    throw new Error("Homepage navigation did not receive a response.");
  }

  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle("AccioTech Operating System");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "AccioTech Operating System",
    }),
  ).toBeVisible();
  await expect(page.getByText("From Imagination to Innovation")).toBeVisible();
  await expect(page.getByText("Frontend foundation is ready.")).toBeVisible();
  expect(failedResponses).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("unknown routes return a rendered 404 response", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  if (!response) {
    throw new Error("Unknown-route navigation did not receive a response.");
  }

  expect(response.status()).toBe(404);
  await expect(page.locator("body")).toBeVisible();
});
