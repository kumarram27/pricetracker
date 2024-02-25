const puppeteer = require("puppeteer");

// Define the product link
const productLink =
  "https://www.flipkart.com/gold-art-india-mango-terracotta-ganesha-car-dashboard-home-decor-decorative-showpiece-9-cm/p/itm035d51031f1fd?pid=SHIGZ5V5HTAQKPZZ&lid=LSTSHIGZ5V5HTAQKPZZXOPH0W&marketplace=FLIPKART&q=ganesh+idol&store=arb%2Fuj2%2Fz1t&srno=s_1_3&otracker=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&fm=organic&iid=en_nKzZSTTw9ZtMkMhoiG5YRKw1x5ni3h-l8T-GpK-WY6qIUDYN9DJX1BUkOUILhgN8cC-FJY8xe2EfUohG_REMPQ%3D%3D&ppt=pp&ppn=pp&ssid=ltp0en9hn40000001708623944162&qH=cbeaf2f5cce45232";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Price History website
  await page.goto("https://pricehistoryapp.com");

  try {
    const inputSelector =
      ' input';
    await page.waitForSelector(inputSelector);

    const inputElement = await page.$(inputSelector);
    if (inputElement) {
      await inputElement.type(productLink);
      console.log(productLink, "Product link entered successfully!");
    } else {
      console.error("Input element not found!");
    }

    // Press "Enter" key
    await page.keyboard.press("Enter");
    console.log("Enter key pressed!");

    // Wait for the product information container to appear
    await page.waitForNavigation();

    // Get the title element
    const titleElement = await page.$eval(
      "#__next > div:nth-child(4) > div.content-width.mx-auto.px-3",
      (element) => element.textContent.trim()
    );

    console.log("Title:", titleElement);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
