import pandas as pd
import json

with open("Georgia-1000.json", "r") as json_file:
    json_data = json.load(json_file)
    
#plans -> map -> "districts" -> specific district -> values
print(json_data["plans"][0]["districts"][0]["HVAP"])