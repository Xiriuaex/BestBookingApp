import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/'

test.beforeEach(async ({ page }) => {
  
    //page is the browser window, what we deal in:
  await page.goto(UI_URL);

  //get the sign in button:
  await page.getByRole("link", {name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("pragyanchetia22@gmail.com");
  await page.locator("[name=password]").fill("thisisnote");

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Sign In Successful!")).toBeVisible();

});

test("Should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("test hotel");
    await page.locator('[name="city"]').fill("test city");
    await page.locator('[name="country"]').fill("test country");
    await page.locator('[name="description"]').fill("test descript test description test descript test description test descript test description");
    await page.locator('[name="pricePerNight"]').fill("999");
    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Budget").click();

    await page.getByText("Free WiFi").check();
    await page.getByText("Parking").check();

    await page.locator('[name="adultCount"]').fill("23");
    await page.locator('[name="childCount"]').fill("2");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpeg"),
        path.join(__dirname, "files", "2.jpg"),
        path.join(__dirname, "files", "3.jpeg"),
    ]);

    await page.getByRole("button", {name: "Save"}).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});


test("Should allow user to view the hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("whatever")).toBeVisible();
    await expect(page.getByText("External Affairs Minister")).toBeVisible();
    await expect(page.getByText("CHARAIDEO, India")).toBeVisible();
    await expect(page.getByText("Luxury")).toBeVisible();
    await expect(page.getByText("899/N")).toBeVisible();
    await expect(page.getByText("21 adults, 0 children")).toBeVisible();
    await expect(page.getByText("5 Star Rating")).toBeVisible();

    await expect(page.getByRole("link", {name: "View Details"})).toBeVisible();
    await expect(page.getByRole("link", {name: "Add Hotel"})).toBeVisible();
});