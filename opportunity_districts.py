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

#Description: returns a list of each map and a tuple to describe it
#parameters: file_path (str) - path to the csv file 
#returns: list(tuple) - each tuple is (map number, map tuple)
def opportunity_district_maps(file_path):
    df = pd.read_csv(file_path) 
    maps_info = list()

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        #create the map tuple for each map and add it to the list
        maps_info.append( (cur_map, create_map_tuple(df, num_districts, row)) )
        
        #move row to the next map
        row += num_districts
        cur_map+=1
        
    return maps_info

#Description: uploads map data to a JSON file in a nested dict
#parameters: maps (list) - list is in the format (int, tuple)
#returns: indices_dict (dict) - nested dict where each key is a level in the map tuple
def upload_maps(maps):
    #dictionary to hold map indices 
    indices_dict = dict()

    #go thru each map
    for map in maps:
        map_index = map[0]
        hispanic_value = map[1][HISPANIC]
        black_value = map[1][BLACK]
        white_value = map[1][WHITE]
        
        #check if the dict for the Hispanic value exists yet
        if hispanic_value not in indices_dict:
            indices_dict[hispanic_value] = dict()
        
        #check if the nested dict for Black value exists yet
        if black_value not in indices_dict[hispanic_value]:
            indices_dict[hispanic_value][black_value] = dict()
            
        #check if the white level (the actual list of indices) exists yet
        if white_value not in indices_dict[hispanic_value][black_value]:
            indices_dict[hispanic_value][black_value][white_value] = list()
            
        #add the map index to the list
        indices_dict[hispanic_value][black_value][white_value].append(map_index)

    #upload the dictionary to a JSON file
    with open("opportunity_district_data.json", "w") as json_file:
        json.dump(indices_dict, json_file, indent=4)

    return indices_dict
    
if __name__ == "__main__":
    file_path = "output.csv"
    opportunity_maps = opportunity_district_maps(file_path)

    # for map in opportunity_maps:
    #     print(map)
        
    upload_maps(opportunity_maps)
    
    with open("opportunity_district_data.json", "r") as json_file:
        data = json.load(json_file)
        
    util.convert_json_keys(data, 3)

    for his_index in data.keys():
        for black_index in data[his_index].keys():
            for asian_index in data[his_index][black_index].keys():
                print(f"({his_index}, {black_index}, {asian_index}): {len(data[his_index][black_index][asian_index])}")
        
        
        