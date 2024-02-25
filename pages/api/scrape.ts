// pages/api/scrape.ts

import { NextApiRequest, NextApiResponse } from "next";
import { searchProductInPriceHistory, ProductInfo } from "../../lib/scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  try {
    const productData: ProductInfo | null = await searchProductInPriceHistory(
      url
    );
    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching product data." });
  }
}
