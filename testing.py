import pandas as pd
import json
# #open up JSON file
# with open("Georgia-1000.json", "r") as json_file:
#     json_data = json.load(json_file)
# #skip annoying index
# json_data = json_data["plans"]


file_path = "georgia_gerrychain_0.csv"
data = pd.read_csv(file_path)

print(data.head(), "\n")
print(data["RacialDemographic.TOTAL"])


#plans -> map -> "districts" -> specific district -> values
# print(json_data[0]["districts"][0]["HVAP"])
# print(json_data[1]["districts"][0]["HVAP"], "\n")

