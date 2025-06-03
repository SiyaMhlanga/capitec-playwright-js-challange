import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/page-objects/login.page.js';
import { InventoryPage } from '../../src/page-objects/inventory.page.js';
import { CartPage } from '../../src/page-objects/cart.page.js';
import { CheckoutPage } from '../../src/page-objects/checkout.page.js';
import uiCredentials from '../../test-data/uiCredentials.json' assert { type: 'json' };
import checkout from '../../test-data/checkout.json' assert { type: 'json' };
test.describe.serial('UI Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

   
    const user = uiCredentials.validUsers.find(u => u.username === 'standard_user');
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    
    await inventoryPage.expectOnInventoryPage();

    
    await page.click('.inventory_item button:has-text("Add to cart")');

    
    await cartPage.openCart();
  });

  test('Complete checkout flow', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    
    await page.click('[data-test="checkout"]'); 

   
    await checkoutPage.enterUserInfo(checkout.data.firstName, checkout.data.lastName,checkout.data.zipCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();

   
    await checkoutPage.expectCheckoutComplete();
  });
});
