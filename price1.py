import bs4
import urllib.request
import smtplib
import time

prices_list = []

def check_price():
    url = 'https://amzn.eu/d/1YcZjCa'

    sauce = urllib.request.urlopen(url).read()
    soup = bs4.BeautifulSoup(sauce, "html.parser")

    prices = soup.find(id="priceblock_ourprice").get_text()
    prices = float(prices.replace(",", "").replace("₹", ""))
    prices_list.append(prices)
    return prices

def send_email(message, sender_email, sender_password, receiver_email):
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login(sender_email, sender_password)
    s.sendmail(sender_email, receiver_email, message)
    s.quit()

def price_decrease_check(price_list):
    if prices_list[-1] < prices_list[-2]:
        return True
    else:
        return False

count = 1
while True:
    current_price = check_price()
    if count > 1:
        flag = price_decrease_check(prices_list)
        if flag:
            decrease = prices_list[-1] - prices_list[-2]
            message = f"The price has decrease please check the item. The price decrease by {decrease} rupees."
            send_email(message) #ADD THE OTHER AGRUMENTS sender_email, sender_password, receiver_email
    time.sleep(43000)
    count += 1