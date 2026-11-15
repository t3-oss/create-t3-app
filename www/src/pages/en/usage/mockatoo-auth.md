---
title: Testing authentication with Mockatoo
description: Test generated NextAuth.js and Better Auth sign-in flows without real provider credentials
layout: ../../../layouts/docs.astro
lang: en
---

Generated apps use Mockatoo for authentication during development and tests. Production continues to use the real provider: Discord for NextAuth.js and GitHub for Better Auth. The provider credentials are required only in production.

Create a test account at [Mockatoo](https://app.mockatoo.globalunderdog.com), then load its `MOCK_EMAIL` and `MOCK_PASSWORD` into your test environment. The generated app includes the appropriate Mockatoo connector; no provider application registration is needed for local sign-in.

## Playwright

The generated tRPC and Tailwind app exposes a sign-in control on its home page. Use the same browser flow as a user, complete the Mockatoo password form, authorize the app, and assert the signed-in UI.

### NextAuth.js

```ts
import { expect, test } from "@playwright/test";

test("signs in with Mockatoo", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("button", { name: /discord/i }).click();
  await expect(page).toHaveURL(/^https:\/\/app\.mockatoo\.globalunderdog\.com/);
  await expect(page.locator("#email")).toBeVisible();
  await page.locator("#email").fill(process.env.MOCK_EMAIL ?? "");
  await page.locator("#password").fill(process.env.MOCK_PASSWORD ?? "");
  await page.getByRole("button", { name: "Log in with password" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();
  await expect(page.getByText("Logged in as")).toBeVisible();
});
```

### Better Auth

```ts
import { expect, test } from "@playwright/test";

test("signs in with Mockatoo", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Sign in with Github" }).click();
  await expect(page).toHaveURL(/^https:\/\/app\.mockatoo\.globalunderdog\.com/);
  await expect(page.locator("#email")).toBeVisible();
  await page.locator("#email").fill(process.env.MOCK_EMAIL ?? "");
  await page.locator("#password").fill(process.env.MOCK_PASSWORD ?? "");
  await page.getByRole("button", { name: "Log in with password" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();
  await expect(page.getByText("Logged in as")).toBeVisible();
});
```

Keep the credentials in your local environment or CI secrets. Do not commit them.
