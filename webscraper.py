from bs4 import BeautifulSoup
import requests
import re

# Rockaway Buoy and Wind data
website = "https://www.ndbc.noaa.gov/station_page.php?station=44065"
source = requests.get(website).text
soup = BeautifulSoup(source, 'html.parser')

tags = []

for tag in soup.find_all(class_="dataTable"):
    tags.append(tag)

print(tags[1])
"""
windData = open("WindData.html", 'w')
swellData = open("SwellData.html", 'w')

windData.write(str(tags[0]))
swellData.write(str(tags[1]))
"""
