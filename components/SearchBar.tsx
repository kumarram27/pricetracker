"use client";
import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidValidProductUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.in") ||
        hostname.includes("flipkart.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("flipkart") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidValidProductUrl(searchPrompt);
    if (!isValidLink) return alert("Please enter a valid product link");

    try {
      setIsLoading(true);
      const response = await axios.post("/api/scrape", { url: searchPrompt });
      setProductData(response.data);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching product data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="Search for products"
          className="searchbar-input"
        />

        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchPrompt === "" || isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {productData && (
        <div>
          <h2>Product Details</h2>
          <p>Title: {productData.title}</p>
          <p>Lowest Price: {productData.lowestPrice}</p>
          <p>Lowest Price Date: {productData.lowestPriceDate}</p>
          <p>Average Price: {productData.averagePrice}</p>
          <p>Current Price: {productData.currentPrice}</p>
          <img src={productData.image} alt="Product" />
          <div
            dangerouslySetInnerHTML={{ __html: productData.priceDetailsHTML }}
          />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;
