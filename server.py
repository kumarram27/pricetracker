from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Define the product link
product_link = "https://www.flipkart.com/gold-art-india-mango-terracotta-ganesha-car-dashboard-home-decor-decorative-showpiece-9-cm/p/itm035d51031f1fd?pid=SHIGZ5V5HTAQKPZZ&lid=LSTSHIGZ5V5HTAQKPZZXOPH0W&marketplace=FLIPKART&q=ganesh+idol&store=arb%2Fuj2%2Fz1t&srno=s_1_3&otracker=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&fm=organic&iid=en_nKzZSTTw9ZtMkMhoiG5YRKw1x5ni3h-l8T-GpK-WY6qIUDYN9DJX1BUkOUILhgN8cC-FJY8xe2EfUohG_REMPQ%3D%3D&ppt=pp&ppn=pp&ssid=ltp0en9hn40000001708623944162&qH=cbeaf2f5cce45232"

# Start a Selenium WebDriver session
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Add headless argument
driver = webdriver.Chrome(options=options)

# Navigate to the Price History website
driver.get("https://pricehistoryapp.com")

try:
    # Wait for the input field to appear
    input_field = WebDriverWait(driver, 100).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "input[placeholder='Enter name or paste the product link']"))
    )

    # Type the product link into the input field
    input_field.send_keys(product_link)

    # Find the search button and click it
    search_button = WebDriverWait(driver, 100).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[title='Search Price History']"))
    )
    search_button.click()

    # Wait for the product information to appear
    time.sleep(1)  # Add a short waiting period
    product_info = WebDriverWait(driver, 100).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "#__next > div:nth-child(4) > div.content-width.mx-auto.px-3"))
    )

    # Print the product information
    print("Product Information:", product_info.text)

finally:
    # Close the browser
    driver.quit()
