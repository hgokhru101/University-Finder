from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time
import sys
from pymongo import MongoClient
import re

def clean(s):
    s = s.replace('Check match\n','')
    return s

client = MongoClient('localhost', 27017)
db = client.AIT

start = 100
#Bachelor
# my_coll=db.Bachelor_Medicine
# my_coll=db.Bachelor_Law
# my_coll=db.Bachelor_Eng_Tech
# my_coll=db.Bachelor_Business_Management
# my_coll=db.Bachelor_Journalism
# my_coll=db.Bachelor_Architecture_Design

# Medicine : url = 'https://www.bachelorsportal.com/search/#q=lv-bachelor|tc-EUR|di-10&start='+str(start)
# Law : url = 'https://www.bachelorsportal.com/search/#q=di-6|lv-bachelor|tc-EUR&start='+str(start)
# Engineering and Technology : url = 'https://www.bachelorsportal.com/search/#q=lv-bachelor|tc-EUR|di-7&start='+str(start)
# Business Management : url = 'https://www.bachelorsportal.com/search/#q=di-23|lv-bachelor|tc-EUR&start='+str(start)
# Journalism : url = 'https://www.bachelorsportal.com/search/#q=lv-bachelor|tc-EUR|di-58&start='+str(start)
# Architecture and Design : url = 'https://www.bachelorsportal.com/search/#q=lv-bachelor|tc-EUR|di-258&start='+str(start)

# Masters

# my_coll=db.Master_Medicine
# my_coll=db.Master_Law
# my_coll=db.Master_Eng_Tech
# my_coll=db.Master_Business_Management
# my_coll=db.Master_Journalism
# my_coll=db.Master_Architecture_Design

# Medicine : url = 'https://www.mastersportal.com/search/#q=di-10|lv-master|tc-EUR&start='+str(start)
# Law : url = 'https://www.mastersportal.com/search/#q=di-6|lv-master|tc-EUR&start='+str(start)
# Engineering and Technology : url = 'https://www.mastersportal.com/search/#q=di-7|lv-master|tc-EUR&start='+str(start)
# Business Management : url = 'https://www.mastersportal.com/search/#q=di-23|lv-master|tc-EUR&start='+str(start)
# Journalism : url = 'https://www.mastersportal.com/search/#q=di-58|lv-master|tc-EUR&start='+str(start)
# Architecture and Design : url = 'https://www.mastersportal.com/search/#q=di-258|lv-master|tc-EUR&start='+str(start)


#PhD

# my_coll=db.PhD_Medicine
# my_coll=db.PhD_Law
# my_coll=db.PhD_Eng_Tech
# my_coll=db.PhD_Business_Management
# my_coll=db.PhD_Computer_IT
# my_coll=db.PhD_Architecture_Design

# Medicine : url = 'https://www.phdportal.com/search/#q=di-10|lv-phd|tc-EUR&start='+str(start)
# Law : url = 'https://www.phdportal.com/search/#q=di-6|lv-phd|tc-EUR'+str(start)
# Engineering and Technology : url = 'https://www.phdportal.com/search/#q=di-7|lv-phd|tc-EUR&start='+str(start)
# Business Management : url = 'https://www.phdportal.com/search/#q=di-23|lv-phd|tc-EUR&start='+str(start)
# Computer Science and IT :
# url = 'https://www.phdportal.com/search/#q=di-24|lv-phd|tc-EUR&start='+str(start)
# Architecture and Design : url = 'https://www.phdportal.com/search/#q=di-258|lv-phd|tc-EUR&start='+str(start)


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
    logo = driver.find_elements_by_xpath('//img[contains(@src,"compress")]')
    course = driver.find_elements_by_xpath('//div[@class="CardHeader"]')
    university_location = driver.find_elements_by_xpath('//span[@class="Fact LocationFact"]')
    description = driver.find_elements_by_xpath('//p[@class="Description"]')
    fee = driver.find_elements_by_xpath('//span[@class="Fact KeyFact"]')
    duration = driver.find_elements_by_xpath('//span[@class="js-duration Fact KeyFact"]')
    i=0
    j=0
    for data in logo:
        final_data={}
        final_data['logo_link'] = data.get_attribute("src")
        final_data['course'] = clean(course[i].text)
        final_data['university'] = university_location[j].text
        final_data['location'] = university_location[j+1].text
        final_data['description'] = description[i].text
        final_data['fee'] = fee[i].text
        final_data['duration'] = duration[i].text
        i=i+1
        j=j+2
        my_coll.insert_one(final_data)
        d.append(final_data)
    print(d)
    driver.close()