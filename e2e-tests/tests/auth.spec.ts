import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/'

test('Should allow the user to Sign In', async ({ page }) => {
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

test("Should allow user to Register",async ({ page }) => {

  const test_email = `test_random_mail${Math.floor(Math.random()*9000)+9000}@gmail.com`;
  const test_Fname = `testFName${Math.floor(Math.random()*1000)+1000}`
  const test_Lname = `testLName${Math.floor(Math.random()*1000)+1000}`
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "Create an account here"}).click();

  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill(test_Fname);
  await page.locator("[name=lastName]").fill(test_Lname);
  await page.locator("[name=email]").fill(test_email);
  await page.locator("[name=password]").fill("test_emailcc");
  await page.locator("[name=confirmPassword]").fill("test_emailcc");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

})