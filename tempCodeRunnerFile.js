const puppeteer = require("puppeteer");

// Define the product link
const productLink =
  "https://www.flipkart.com/gold-art-india-mango-terracotta-ganesha-car-dashboard-home-decor-decorative-showpiece-9-cm/p/itm035d51031f1fd?pid=SHIGZ5V5HTAQKPZZ&lid=LSTSHIGZ5V5HTAQKPZZXOPH0W&marketplace=FLIPKART&q=ganesh+idol&store=arb%2Fuj2%2Fz1t&srno=s_1_3&otracker=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&fm=organic&iid=en_nKzZSTTw9ZtMkMhoiG5YRKw1x5ni3h-l8T-GpK-WY6qIUDYN9DJX1BUkOUILhgN8cC-FJY8xe2EfUohG_REMPQ%3D%3D&ppt=pp&ppn=pp&ssid=ltp0en9hn40000001708623944162&qH=cbeaf2f5cce45232";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Price History website
    await page.goto("https://price-history.in");

    // Wait for the search input field to appear
    await page.waitForSelector("input#search");

    // Type the product link into the input field
    await page.type("input#search", productLink);

    // Click on the submit button
    await page.click("button#search-submit");
    console.log("Search submitted!");

    // Wait for the search results page to load
    // Wait for the search results page to load with an increased timeout
    await Promise.all([
      page.waitForNavigation({ timeout: 70000 }), // Increase to 60 seconds
      page.click("button#search-submit"),
    ]);

    // Get the title
    const titleElement = await page.$eval(
      ".col-12.ph-title.my-1 h1",
      (element) => element.textContent.trim()
    );
    console.log("Title:", titleElement);

    // Get the price details
    const priceDetails = await page.$eval(
      "#price-details",
      (element) => element.outerHTML
    );
    console.log("Price Details:", priceDetails);

    // Get the lowest price
    const lowestPrice = await page.$eval(
      ".ph-table-overview tr:nth-child(1) td:nth-child(2)",
      (element) => element.textContent.trim()
    );
    console.log("Lowest Price:", lowestPrice);
    // Get the average price
    const averagePrice = await page.$eval(
        '#price-details > div > div.col-12.col-sm-12.col-md-6.col-lg-7.p-0 > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td' ,
        (element) => element.textContent.trim()
    );
    console.log("Average Price:", averagePrice);

    // Get the current price
    const currentPrice = await page.$eval(
      ".ph-table-offer tbody tr:nth-child(1) td:nth-child(2)",
      (element) => element.textContent.trim()
    );
    console.log("Current Price:", currentPrice);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
