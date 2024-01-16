import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/'

test('should allow the user to sign in', async ({ page }) => {
  //page is the browser window, what we deal in:
  await page.goto(UI_URL);

  //get the sign in button:
  await page.getByRole("link", {name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("pragyanchetia22@gmail.com");
  await page.locator("[name=password]").fill("thisisnote");

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Sign In Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

});

test("should allow user to register",async ({ page }) => {

  const test_email = `test_random_mail${Math.floor(Math.random()*9000)+9000}@gmail.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "Create an account here"}).click();

  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(test_email);
  await page.locator("[name=password]").fill("test_emailcc");
  await page.locator("[name=confirmPassword]").fill("test_emailcc");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
  

})