import pandas as pd
from dotenv import load_dotenv
import os
import json

import util

# Load environment variables from the .env file
load_dotenv()
THRESHOLD = float(os.getenv("THRESHOLD"))

ethnic_groups = ["RacialDemographic.HISPA","RacialDemographic.BLACK"]
HISPANIC = 0
BLACK = 1
WHITE = 2

#Description: returns a tuple that describes the map through opportunity districts. The tuple format is:
#             (hispanic districts, black districts, white districts)
#Parameters: df (Object) - dataframe containing the ensemble
#            num_districts (int) - the number of districts in a map
#            row (int) - the first row in df for the map 
#returns: the map tuple that describe the map
def create_map_tuple(df , num_districts : int, row : int):
    district_counts = [0, 0 ,0]
    
    #look at the districts in the map
    for index in range(num_districts):
        length = len(ethnic_groups)
        total_population = df.iloc[row + index]["RacialDemographic.TOTAL"]
        
        #see if it's an opportunity district for any group
        for group_index in range(0, length):
            minority_population = df.iloc[row + index][ethnic_groups[group_index]] 
            if (minority_population/total_population) >= THRESHOLD: 
                district_counts[group_index] += 1
                break
            #if not opportunity district for minority -> white district 
            district_counts[WHITE] += 1
    
    return tuple(district_counts)

#Description: returns a string representation of the map tuple
#Parameters: map_tuple (tuple) - the map tuple that describes the map
#returns: str - string representation of the map tuple
#         format: "hispanic-black-white"
def map_tuple_to_str(map_tuple):
    return f"{map_tuple[HISPANIC]}-{map_tuple[BLACK]}-{map_tuple[WHITE]}"

#Description: returns a dict describing the ensemble based on opportunity districts
#parameters: file_path (str) - path to the csv file 
#returns: dict - key = str of the map tuple (hispanic districts, black districts, white districts)
#                value = list of the mpa indices has the map tuple values 
def opportunity_district_maps(file_path):
    df = pd.read_csv(file_path) 
    maps_info = dict()

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    max_hispanic = 0
    max_black = 0
    max_white = 0
    
    #go thru each row in the dataframe
    while row < len(df): 
        map_tuple = create_map_tuple(df, num_districts, row)
        
        if map_tuple[HISPANIC] > max_hispanic:
            max_hispanic = map_tuple[HISPANIC]
        if map_tuple[BLACK] > max_black:
            max_black = map_tuple[BLACK]
        if map_tuple[WHITE] > max_white:
            max_white = map_tuple[WHITE]
        
        str_tuple = map_tuple_to_str(map_tuple)
        
        
        if str_tuple not in maps_info:
            maps_info[str_tuple] = [cur_map]
        else:
            maps_info[str_tuple].append(cur_map)
        
        #move row to the next map
        row += num_districts
        cur_map+=1
        
    maps_info["max"] = [max_hispanic, max_black, max_white]
    return maps_info
    
if __name__ == "__main__":
    file_path = "data works/output.csv"
    opportunity_maps = opportunity_district_maps(file_path)

    #upload the dictionary to a JSON file
    with open("data works/opportunity_district_data.json", "w") as json_file:
        json.dump(opportunity_maps, json_file, indent=4)
        
    # with open("data works/opportunity_district_data.json", "r") as json_file:
    #     data = json.load(json_file)
        
    # for key, value in data.items():
    #     print(key)
    #     if key == "max":
    #         print(value)

        
        
        
        