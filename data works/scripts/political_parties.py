import pandas as pd
import json
import util

PARTIES = ["(2020, <Office.PRES: 'Presidential'>, <Party.DEM: 'Democratic'>)", 
            "(2020, <Office.PRES: 'Presidential'>, <Party.REP: 'Republican'>)"]
DEM = 0
REP = 1

def party_district_counts(df , num_districts : int, row : int):
    democrat_counts = 0
    republician_counts = 0
    
    #look at the districts in the map
    for index in range(num_districts):
        dem_voters = df.iloc[row + index][PARTIES[DEM]] 
        rep_voters = df.iloc[row + index][PARTIES[REP]]
        
        if dem_voters > rep_voters:
            democrat_counts += 1
        else:
            republician_counts += 1
        
    return democrat_counts, republician_counts

def political_parties_dict(file_path):
    df = pd.read_csv(file_path) 

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    republician_dict: dict[int, int] = dict()
    democratic_dict: dict[int, int] = dict()
    
    #go thru each row in the dataframe
    while row < len(df):    
        democrat_maps, republician_maps = party_district_counts(df, num_districts, row)
        
        util.add_to_dict(democratic_dict, democrat_maps, cur_map)
        util.add_to_dict(republician_dict, republician_maps, cur_map)
        
        #move row to the next map
        row += num_districts
        cur_map += 1
        
    return democratic_dict, republician_dict

def make_JSON():
    file_path = "data works\Actual Data\output.csv"
    democratic_dict, republician_dict = political_parties_dict(file_path)
    
    #upload the democrat dictionary to a JSON file 
    with open("data works\Actual Data\democrat_clusters.json", "w") as json_file:
        json.dump(democratic_dict, json_file, indent=4)
    
    #upload the republician dictionary to a JSON file 
    with open("data works\Actual Data\\republican_clusters.json", "w") as json_file:
        json.dump(republician_dict, json_file, indent=4)

if __name__ == "__main__":
    make_JSON()



    