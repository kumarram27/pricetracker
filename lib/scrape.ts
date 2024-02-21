import puppeteer from "puppeteer";

export interface ProductInfo {
  name: string;
  currentPrice: number;
  lowestPrice: number;
  averagePrice: number;
  highestPrice: number;
}

export async function searchProductInPriceHistory(
  productLink: string
): Promise<ProductInfo | null> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://pricehistory.com");

    // Wait for the search input field to appear
    await page.waitForSelector(".flex.flex-col.mt-5.space-y-1 input");

    // Type the product link into the search input field
    await page.type(".flex.flex-col.mt-5.space-y-1 input", productLink);

    // Click the search button
    await page.click(".flex.flex-col.mt-5.space-y-1 button");

    // Wait for the search results to appear
    const productInfo: ProductInfo = await page.evaluate(() => {
        const productNameElement = document.querySelector(
            "h1.font-semibold.text-lg"
        );
        const productName = productNameElement
            ? productNameElement.textContent?.trim() ?? ""
            : "";

        const productInfoText =
            document
                .querySelector(".content-width.mx-auto.px-3")
                ?.textContent?.trim() ?? "";
        const regex =
            /This product price is (\d+) but the lowest price is (\d+)\. The average and highest price are (\d+) and (\d+) respectively\./;
        const match = productInfoText.match(regex);

        if (!match) {
            throw new Error("Product information not found.");
        }

        const [
            ,
            currentPriceStr,
            lowestPriceStr,
            averagePriceStr,
            highestPriceStr,
        ] = match;

        const currentPrice = parseFloat(currentPriceStr);
        const lowestPrice = parseFloat(lowestPriceStr);
        const averagePrice = parseFloat(averagePriceStr);
        const highestPrice = parseFloat(highestPriceStr);

        return {
            name: productName,
            currentPrice,
            lowestPrice,
            averagePrice,
            highestPrice,
        };
    });

    await browser.close();

    return productInfo;
  } catch (error) {
    console.error("Error searching product in PriceHistory:", error);
    return null;
  }
}
