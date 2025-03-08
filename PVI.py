import pandas as pd
import json
import util

PARTIES = ["(2020, <Office.PRES: 'Presidential'>, <Party.DEM: 'Democratic'>)", "(2020, <Office.PRES: 'Presidential'>, <Party.REP: 'Republican'>)"]
DEMOCRATIC = 0
REPUBLICIAN = 1

#D +2.1 (2016), D +4.4 (2020) , R +1.6 (2024)
# (2.1 * 0.25) + (4.4 * 0.75) = 3.825
NATIONAL_MARGIN = 3.825 / 100 #in DEM favor

#source for national margin
#https://www.cnn.com/election/2016/results/president
#https://www.cnn.com/election/2020/results/president
#https://www.cnn.com/election/2024/results/president?election-data-id=2024-PG&election-painting-mode=projection-with-lead&filter-key-races=false&filter-flipped=false&filter-remaining=false

# #map tuple
# def create_map_tuple(df , num_districts : int, row : int):
#     district_counts = [0, 0]
    
#     #look at the districts in the map
#     for index in range(num_districts):
#         dem_voters = df.iloc[row + index][PARTIES[DEMOCRATIC]] 
#         rep_voters = df.iloc[row + index][PARTIES[REPUBLICIAN]]
        
#         if dem_voters > rep_voters:
#             district_counts[DEMOCRATIC] += 1
#         else:
#             district_counts[REPUBLICIAN] += 1
        
#     return tuple(district_counts)

#the weighted PVI for the map
def calculate__PVI(df , num_districts : int, row : int):
    weighted_PVI = 0
    state_voters = 0
    
    #look at the districts in the map
    for index in range(num_districts):
        #get the number of voters for dem, rep, and district voters
        dem_voters = df.iloc[row + index][PARTIES[DEMOCRATIC]] 
        rep_voters = df.iloc[row + index][PARTIES[REPUBLICIAN]]
        district_voters = dem_voters + rep_voters
        
        #add to the state voter count
        state_voters += district_voters
        
        #get the district margin first 
        PVI = (dem_voters - rep_voters) / district_voters
        #subtract the national margin
        PVI -= NATIONAL_MARGIN
        
        #weighted_PVI += PVI * district_voters
        weighted_PVI += PVI
        
    return float(round(weighted_PVI / num_districts, 3))

def make_PVI_dict(file_path):
    df = pd.read_csv(file_path) 

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    result_dict = dict()
    
    #go thru each row in the dataframe
    while row < len(df):    
        PVI_value = calculate__PVI(df, num_districts, row)
        
        if PVI_value in result_dict:
            result_dict[PVI_value].append(cur_map)
        else:
            result_dict[PVI_value] = [cur_map]
        
        #move row to the next map
        row += num_districts
        cur_map += 1
        
    return result_dict

# #create a list to describe map data (based on PVI)
# def political_party_maps(file_path):
#     df = pd.read_csv(file_path) 
#     maps_info = list()

#     row = 0
#     cur_map = 0 
#     num_districts = util.get_num_districts(file_path)

#     #go thru each row in the dataframe
#     while row < len(df): 
#         #create the map tuple for each map and add it to the list
#         maps_info.append( (cur_map, create_map_tuple(df, num_districts, row)) )
        
#         #move row to the next map
#         row += num_districts
#         cur_map += 1
        
#     return maps_info

#Description: uploads map data to a JSON file in a nested dict
#parameters: maps (list) - list is in the format (int, tuple)
#returns: indices_dict (dict) - nested dict where each key is a level in the map tuple
def upload_maps(maps):
    #dictionary to hold map indices 
    indices_dict = dict()
    
    

    #go thru each map
    for map in maps:
        map_index = map[0]
        
        
            

    #upload the dictionary to a JSON file 
    with open("avg_PVI_data.json", "w") as json_file:
        json.dump(indices_dict, json_file, indent=4)

    return indices_dict

def controller_function():
    return

if __name__ == "__main__":
    file_path = "output.csv"
    political_maps = make_PVI_dict(file_path)

    print()
    # for key, item in political_maps.items():
    #     print(f"{key}: {item}")
        
    #upload_maps(political_maps)
    
    # with open("avg_PVI_data.json", "r") as json_file:
    #     data = json.load(json_file)
        
    # util.convert_json_keys(data, 3)
    
    # for map in political_maps:
    #     print(map)

    # for dem_index in data.keys():
    #     for rep_index in data[dem_index].keys():
    #         print(f"({dem_index}, {rep_index}): {len(data[dem_index][rep_index])}")
    