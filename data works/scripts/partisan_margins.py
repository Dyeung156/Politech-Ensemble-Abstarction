from enum import Enum
import pandas as pd
import json
import os
import util
from statistics import median

PARTIES = ["(2020, <Office.PRES: 'Presidential'>, <Party.DEM: 'Democratic'>)", 
                "(2020, <Office.PRES: 'Presidential'>, <Party.REP: 'Republican'>)"]
# OLD_PARTIES = ["(2016, <Office.PRES: 'Presidential'>, <Party.DEM: 'Democratic'>)", 
#                 "(2016, <Office.PRES: 'Presidential'>, <Party.REP: 'Republican'>)"]

DEM = 0
REP = 1
 
def district_margin(df , row : int) -> float:
    dem_voters: float = df.iloc[row][PARTIES[DEM]] 
    rep_voters: float = df.iloc[row][PARTIES[REP]]
    margin: float = (dem_voters - rep_voters) / (dem_voters + rep_voters)
    return margin

def margin_median(df , num_districts : int, row : int) -> float:
    margin_values: list[float] = []
    for index in range(num_districts):
        margin_values.append(district_margin(df, row + index))
    return round(median(margin_values), 2)

def create_margins_dict(file_path):
    df = pd.read_csv(file_path) 

    row: int = 0
    cur_map: int = 0 
    num_districts: int = util.get_num_districts(file_path)
    margins_dict: dict[int, float] = dict()
    
    #go thru each row in the dataframe
    while row < len(df):    
        median_margin: float = margin_median(df, num_districts, row)
        util.add_to_dict(margins_dict, median_margin, cur_map)
        
        #move row to the next map
        row += num_districts
        cur_map += 1
        
    return margins_dict

def make_JSON():
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(script_dir, 'Actual Data', 'output.csv')
    margins_dict: dict[int, float] = create_margins_dict(file_path)
    
    #upload the margins dictionary to a JSON file 
    json_path = os.path.join(script_dir, 'Actual Data', 'margins.json')
    with open(json_path, "w") as json_file:
        json.dump(margins_dict, json_file, indent=4)
    
if __name__ == "__main__":
    make_JSON()