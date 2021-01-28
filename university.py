from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time
import sys
url = 'https://www.bachelorsportal.com/search/#q=di-289|lv-bachelor|tc-EUR&start=20'
chrome_driver_path = 'C:\\Users\\hgokh\\Downloads\\chromedriver_win32\\chromedriver.exe'
chrome_options = Options()
chrome_options.add_argument('--headless')
webdriver = webdriver.Chrome(
  executable_path=chrome_driver_path, options=chrome_options
)
with webdriver as driver:
    # Set timeout time 
    wait = WebDriverWait(driver, 10)
    # retrive url in headless browser
    driver.get(url)
    final_data = {}
    d =[]
    # find search box
    search = driver.find_elements_by_xpath('//div[@class="CardHeader"]')
    search1 = driver.find_elements_by_xpath('//span[@class="Location"]')
    # search = driver.find_element_by_class_name("Result")
    i=0
    for data in search:
        final_data={}
        final_data['course'] = data.text
        final_data['Location'] = search1[i].text
        i=i+1
        d.append(final_data)
    print(d)