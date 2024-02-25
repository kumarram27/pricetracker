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
    await Promise.all([
      page.waitForNavigation({ timeout: 70000 }), // Increase to 70 seconds
      page.click("button#search-submit"),
    ]);

    // Get the title
    const titleElement = await page.$eval(
      ".col-12.ph-title.my-1 h1",
      (element) => element.textContent.trim()
    );

    // Get the image URL
    const imageURL = await page.$eval(
      ".ph-hero-image img",
      (element) => element.src
    );

    // Get the lowest price and its date
    const lowestPriceDate = await page.$eval(
      ".ph-table-overview tr:nth-child(1) td:nth-child(1)",
      (element) => element.textContent.trim()
    );
    const lowestPrice = await page.$eval(
      ".ph-table-overview tr:nth-child(1) td:nth-child(2)",
      (element) => element.textContent.trim()
    );

    // Get the average price
    const averagePrice = await page.$eval(
      ".ph-table-overview tr:nth-child(2) td",
      (element) => element.textContent.trim()
    );

    // Get the current price
    const currentPrice = await page.$eval(
      ".ph-table-offer tbody tr:nth-child(1) td:nth-child(2)",
      (element) => element.textContent.trim()
    );

    // Get the HTML of the price details section
    const priceDetailsHTML = await page.$eval(
      "#price-details",
      (element) => element.outerHTML
    );

    // Construct the product info object
    const productInfo = {
      title: titleElement,
      image: imageURL,
      lowestPrice: lowestPrice,
      lowestPriceDate: lowestPriceDate,
      averagePrice: averagePrice,
      currentPrice: currentPrice,
      priceDetailsHTML: priceDetailsHTML,
    };

    console.log("Product Info:", productInfo);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
