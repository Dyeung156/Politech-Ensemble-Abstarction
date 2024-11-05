import pandas as pd
import json
# #open up JSON file
# with open("Georgia-1000.json", "r") as json_file:
#     json_data = json.load(json_file)
# #skip annoying index
# json_data = json_data["plans"]


# file_path = "georgia_gerrychain_0.csv"
# data = pd.read_csv(file_path)

# print(data.head(), "\n")
# print(data["RacialDemographic.TOTAL"])


#plans -> map -> "districts" -> specific district -> values
# print(json_data[0]["districts"][0]["HVAP"])
# print(json_data[1]["districts"][0]["HVAP"], "\n")



#Description: returns a set of maps for each minority group that contains an opportunity district for that minority group
#parameters: file_path (str) - path to the csv file 
#returns: dict - keys (minority groups), value (maps with opporuntiy districts with that minority group)
def get_opportunity_districts(file_path):
    df = pd.read_csv(file_path) 
    indexes = dict() 
    minorities = ["RacialDemographic.HISPA","RacialDemographic.BLACK","RacialDemographic.NATIV","RacialDemographic.ASIAN","RacialDemographic.HAWAI"]
    # intiailize the dictionary 
    for m in minorities:
        indexes[m] = set() 

    row = 0
    cur_map = 0 
    while row < len(df): 
        for _ in range(14):
            total_population = df.iloc[row]["RacialDemographic.TOTAL"]
            for m in minorities: 
                minority_population = df.iloc[row][m] 
                if (minority_population/total_population) >= 0.5: 
                    indexes[m].add(cur_map) 
            row+=1
        cur_map+=1
    return indexes

opportunity_districts = get_opportunity_districts("../output.csv")

minorities = ["RacialDemographic.HISPA","RacialDemographic.BLACK","RacialDemographic.NATIV","RacialDemographic.ASIAN","RacialDemographic.HAWAI"]

for m in minorities:
    print(m, len(opportunity_districts[m]))
