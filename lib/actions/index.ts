"use server";

import { scrapeProductData } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;
    try {
        const productData = await scrapeProductData(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
    }
}