---
title: Testing authentication with Mockatoo
description: Test the generated NextAuth.js sign-in flow without real Discord credentials
layout: ../../../layouts/docs.astro
lang: en
---

Generated apps with NextAuth.js use Mockatoo's Discord mock during development and tests. Production continues to use the real Discord provider, so `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET` are required only in production.

Create a test account at [Mockatoo](https://app.mockatoo.globalunderdog.com), then load its `MOCK_EMAIL` and `MOCK_PASSWORD` into your test environment. The generated app already includes the Mockatoo connector; no application registration is needed for local sign-in.

## Playwright

Use the same browser flow as a user: start sign-in, complete the Mockatoo password form, authorize the app, and assert that the protected UI is visible.

```ts
import { expect, test } from "@playwright/test";

test("signs in with Mockatoo", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.locator("#email").fill(process.env.MOCK_EMAIL!);
  await page.locator("#password").fill(process.env.MOCK_PASSWORD!);
  await page.getByRole("button", { name: "Log in with password" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();
  await expect(page.getByText("Signed in")).toBeVisible();
});
```

Keep the credentials in your local environment or CI secrets. Do not commit them.
