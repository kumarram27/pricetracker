import puppeteer from "puppeteer";

export interface ProductInfo {
  title: string | null;
  image: string | null;
  lowestPrice: string | null;
  lowestPriceDate: string | null;
  averagePrice: string | null;
  currentPrice: string | null;
  priceDetailsHTML: string | null;
}

export async function searchProductInPriceHistory(
  productLink: string
): Promise<ProductInfo | null> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto("https://price-history.in/");

    // Wait for the search input field to appear
    await page.waitForSelector("input#search");

    // Type the product link into the input field
    await page.type("input#search", productLink);

    // Click on the submit button
    await Promise.all([
      page.waitForNavigation({ timeout: 70000 }), // Increase to 70 seconds
      page.click("button#search-submit"),
    ]);

    console.log("Search submitted!");

    // Wait for the title element to appear
    await page.waitForSelector(".col-12.ph-title.my-1 h1");

    // Get the title text
    const titleElement = await page.$eval(
      ".col-12.ph-title.my-1 h1",
      (element) => element?.textContent?.trim() // Use optional chaining to safely access text content
    );

    // Get the image URL
    const imageURL = await page.$eval(
      ".ph-hero-image img",
      (element) => element.src
    );

    // Get the lowest price and its date
    const lowestPriceDate = await page.$eval(
      ".ph-table-overview tr:nth-child(1) td:nth-child(1)",
      (element) => element.textContent?.trim()
    );
    const lowestPrice = await page.$eval(
      ".ph-table-overview tr:nth-child(1) td:nth-child(2)",
      (element) => element.textContent?.trim()
    );

    // Get the average price
    const averagePrice = await page.$eval(
      ".ph-table-overview tr:nth-child(2) td",
      (element) => element.textContent?.trim()
    );

    // Get the current price
    const currentPrice = await page.$eval(
      ".ph-table-offer tbody tr:nth-child(1) td:nth-child(2)",
      (element) => element.textContent?.trim()
    );

    // Get the HTML of the price details section
    const priceDetailsHTML = await page.$eval(
      "#price-details",
      (element) => element.outerHTML
    );

    await browser.close();

    // Construct the product info object
    const productInfo: ProductInfo = {
      title: titleElement || null,
      image: imageURL,
      lowestPrice: lowestPrice || null,
      lowestPriceDate: lowestPriceDate || null,
      averagePrice: averagePrice || null,
      currentPrice: currentPrice || null,
      priceDetailsHTML: priceDetailsHTML,
    };

    // Return the scraped product information
    return productInfo;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
