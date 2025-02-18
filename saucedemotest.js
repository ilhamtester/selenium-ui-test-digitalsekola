const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoTest() {
  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://saucedemo.com");
    console.log("Opened saucedemo.com");
    await driver.sleep(2000); // Delay 2 seconds

    // Login
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    console.log("Entered username");
    await driver.sleep(2000); // Delay 2 seconds

    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
    console.log("Entered password");
    await driver.sleep(2000); // Delay 2 seconds

    await driver.findElement(By.name("login-button")).click();
    console.log("Clicked login button");
    await driver.sleep(2000); // Delay 2 seconds

    // Validate user is on the dashboard
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(
      titleText.includes("Swag Labs"),
      true,
      'Title does not include "Swag Labs"'
    );
    console.log("Validated user is on the dashboard");
    await driver.sleep(2000); // Delay 2 seconds

    // Add item to cart
    await driver.findElement(By.css(".inventory_item button")).click();
    console.log("Added item to cart");
    await driver.sleep(2000); // Delay 2 seconds

    // Validate item is added to cart
    let cartBadge = await driver.findElement(By.css(".shopping_cart_badge")).getText();
    assert.strictEqual(cartBadge, "1", "Item was not added to the cart");
    console.log("Validated item is added to cart");
    await driver.sleep(2000); // Delay 2 seconds

    // Open cart menu
    await driver.findElement(By.css(".shopping_cart_link")).click();
    console.log("Opened cart menu");
    await driver.sleep(2000); // Delay 2 seconds

    // Validate item in cart
    let cartItem = await driver.findElement(By.css(".cart_item .inventory_item_name")).getText();
    assert.strictEqual(cartItem, "Sauce Labs Backpack", "Item in cart does not match the added item");
    console.log("Validated item in cart");
    await driver.sleep(2000); // Delay 2 seconds

    // Add a delay to keep the browser open for 10 seconds
    await driver.sleep(10000);

    // Assertion to indicate success
    console.log("Test completed successfully.");
  } finally {
    // Close the browser
    await driver.quit();
  }
}

saucedemoTest();