import { NextApiRequest, NextApiResponse } from "next";
import { searchProductInPriceHistory } from "../../lib/scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  try {
    const productData = await searchProductInPriceHistory(url);
    res.status(200).json(productData);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching product data." });
  }
}
