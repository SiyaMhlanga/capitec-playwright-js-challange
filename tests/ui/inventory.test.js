import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/page-objects/login.page.js";
import { InventoryPage } from "../../src/page-objects/inventory.page.js";
import uiCredentials from "../../test-data/uiCredentials.json" assert { type: "json" };

test.describe.serial("UI Invetory Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const user = uiCredentials.validUsers.find(
      (x) => x.username == "standard_user"
    );
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await inventoryPage.expectOnInventoryPage();
  });
  test(" Verify the total number of items in the inventory page", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getItemCount();
    await expect(count).toBe(6);
  });
});
