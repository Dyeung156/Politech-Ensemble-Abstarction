import pandas as pd
import json

#open up JSON file
with open("Georgia-1000.json", "r") as json_file:
    json_data = json.load(json_file)
#skip annoying index
json_data = json_data["plans"]

def get_map(map : int):
    return json_data[map]

def get_HVAP(district):
    return district["HVAP"]

def get_WVAP(district):
    return district["WVAP"]

def get_BVAP(district):
    return district["BVAP"]

def get_AminVAP(district):
    return district["AMINVAP"]

def get_AsianVAP(district):
    return district["ASIANVAP"]

def get_NHPIVAP(district):
    return district["NHPIVAP"]

#plans -> map -> "districts" -> specific district -> values
print(json_data[0]["districts"][0]["HVAP"])
print(json_data[1]["districts"][0]["HVAP"], "\n")
print(f"Function returned: {get_HVAP(json_data[1]["districts"][0])}")