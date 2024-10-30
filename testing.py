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

def get_total_district_pop(district):
    return get_HVAP(district) + get_WVAP(district) + get_BVAP(district) + get_AsianVAP(district) + get_AminVAP(district) + get_NHPIVAP(district)

def checking_something():
    for map in json_data:
        for district in map["districts"]:
            total = get_total_district_pop(district)
            if get_AminVAP(district) / total > 10.0:
                return True
            
    return False

#plans -> map -> "districts" -> specific district -> values
print(json_data[0]["districts"][0]["HVAP"])
print(json_data[1]["districts"][0]["HVAP"], "\n")
print(f"Function returned: {checking_something()}")
print(f"len of data is {len(json_data)}")