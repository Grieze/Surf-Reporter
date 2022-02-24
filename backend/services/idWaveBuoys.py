from bs4 import BeautifulSoup
import requests

REAL_TIME_DATA_LIST = 'https://www.ndbc.noaa.gov/data/realtime2/'
DIF_STATION_LIST = 'https://sdf.ndbc.noaa.gov/stations.shtml'
SEARCH_START_INDEX = 3
STATION_ID_LENGTH = 5
STATION_ID_COLUMN_INDEX = 1
validBuoys = []
res = requests.get(REAL_TIME_DATA_LIST).text
bs = BeautifulSoup(res, "html.parser")
table = bs.find("table")
rows=list()
for row in table.findAll("tr"):
   rows.append(row.findAll("td"))
# 5 data extensions that show if buoy collects wave data or not:
# data_spec, spec, swdir, swdir2, swr1, swr2, 
for index in range(SEARCH_START_INDEX, (len(rows)-1)):
    text = (rows[index][STATION_ID_COLUMN_INDEX]).text
    if (text.__contains__("data_spec") or 
        text.__contains__("spec") or 
        text.__contains__("swdir") or 
        text.__contains__("swdir2") or 
        text.__contains__("swr1") or 
        text.__contains__("swr2")):
        if (text[0:STATION_ID_LENGTH] in validBuoys):
            continue
        else:
            # print(text[0:STATION_ID_LENGTH])
            validBuoys.append(text[0:STATION_ID_LENGTH])
print("length validBuoys:", len(validBuoys))

SENSOR_COLUMN = 5
ID_COLUMN = 0
res = requests.get(DIF_STATION_LIST).text
bs = BeautifulSoup(res, "html.parser")
table = bs.findAll("tr", class_="stndata")
waveBuoys = list()
for row in table:
    struct = row.findAll("td")
    if struct[SENSOR_COLUMN].__contains__("Waves"):
        waveBuoys.append(struct[ID_COLUMN].text)
print("length waveBuoys:",len(waveBuoys))

diff = list(set(waveBuoys) - set(validBuoys))
print(len(diff))