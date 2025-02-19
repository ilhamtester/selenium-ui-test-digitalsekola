// Import necessary modules from selenium-webdriver
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

// Define an asynchronous function to run the test
async function saucedemoTest() {
  // Create a new instance of Chrome options and set it to run in headless mode
  let options = new chrome.Options();
  options.addArguments("--headless");

  // Create a new instance of the WebDriver for Chrome with the specified options
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Exception Handling & Conclusion
  try {
    // Open the URL in the browser
    await driver.get("https://saucedemo.com");
    console.log("Opened saucedemo.com");
    await driver.sleep(2000); // Delay 2 seconds

    // Login
    // Find the username input field by its ID and enter the username
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    console.log("Entered username");
    await driver.sleep(2000); // Delay 2 seconds

    // Find the password input field by its XPath and enter the password
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
    console.log("Entered password");
    await driver.sleep(2000); // Delay 2 seconds

    // Find the login button by its name and click it
    await driver.findElement(By.name("login-button")).click();
    console.log("Clicked login button");
    await driver.sleep(2000); // Delay 2 seconds

    // Validate user is on the dashboard
    // Find the element containing the app logo text and get its text
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    // Assert that the text includes "Swag Labs"
    assert.strictEqual(
      titleText.includes("Swag Labs"),
      true,
      'Title does not include "Swag Labs"'
    );
    console.log("Validated user is on the dashboard");
    await driver.sleep(2000); // Delay 2 seconds

    // Add item to cart
    // Find the first item button by its CSS selector and click it
    await driver.findElement(By.css(".inventory_item button")).click();
    console.log("Added item to cart");
    await driver.sleep(2000); // Delay 2 seconds

    // Validate item is added to cart
    // Find the cart badge element by its CSS selector and get its text
    let cartBadge = await driver.findElement(By.css(".shopping_cart_badge")).getText();
    // Assert that the cart badge text is "1"
    assert.strictEqual(cartBadge, "1", "Item was not added to the cart");
    console.log("Validated item is added to cart");
    await driver.sleep(2000); // Delay 2 seconds

    // Open cart menu
    // Find the cart link element by its CSS selector and click it
    await driver.findElement(By.css(".shopping_cart_link")).click();
    console.log("Opened cart menu");
    await driver.sleep(2000); // Delay 2 seconds

    // Validate item in cart
    // Find the cart item name element by its CSS selector and get its text
    let cartItem = await driver.findElement(By.css(".cart_item .inventory_item_name")).getText();
    // Assert that the cart item name is "Sauce Labs Backpack"
    assert.strictEqual(cartItem, "Sauce Labs Backpack", "Item in cart does not match the added item");
    console.log("Validated item in cart");
    await driver.sleep(2000); // Delay 2 seconds

    // Add a delay to keep the browser open for 10 seconds
    await driver.sleep(2000);

    // Assertion to indicate success
    console.log("Testing Success!.");
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the test function
saucedemoTest();