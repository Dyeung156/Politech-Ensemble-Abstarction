import util 
import pandas as pd
import json
import os

OPP_DISTRICTS = 1
DEMOCRAT_COUNT = 2
REPUBLICAN_COUNT = 3   
script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PREFIX = os.path.join(script_dir, 'Actual Data')

def update_range(section: int, incoming_value: int, ranges: list[ list[int] ]) -> None:
    old_min: int = ranges[section][0]
    ranges[section][0] = min(incoming_value, old_min)
    
    old_max: int = ranges[section][1]
    ranges[section][1] = max(incoming_value, old_max)

def cluster_summary(index_list: list[int], df: pd.DataFrame):
    # extra [0,0] and 0.0 at the start is to remain consistent with the other script
    value_ranges: list[ list[int] ] = [[0,0], [100,0], [100,0], [100,0]]
    avg_values: list[float] = [0.0, 0.0, 0.0, 0.0]
    for index in index_list:
        # update range values
        for section in range(1, 4):
            # get the map data for the index
            map_data = df.iloc[index, section]
            
            map_data = int(map_data)
            # update values
            update_range(section, map_data , value_ranges)
            avg_values[section] += map_data
    
    divisor = len(index_list)
    for index in range(len(avg_values)):
        avg_values[index] /= divisor
        avg_values[index] = round(avg_values[index], 2)
            
    return (value_ranges[1::], avg_values[1::])

def summary_calculation(file_name: str, df):
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(script_dir, 'Actual Data', f'{file_name}.json')
    with open(file_name, 'r') as json_file:
        cluster_data = json.load(json_file)
        
        range_dict = dict()
        avg_dict = dict()
        for cluster_value, index_list in cluster_data.items():
            value_ranges , avg_values = cluster_summary(index_list, df)
            
            range_dict[cluster_value] = value_ranges
            avg_dict[cluster_value] = avg_values
            
    return (range_dict, avg_dict)
    
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_name = os.path.join(script_dir, 'Actual Data', 'map_data.csv')
    df = pd.read_csv(file_name)

    range_dict = dict()
    avg_dict = dict()
    
    range_values, avg_values = summary_calculation(os.path.join(PREFIX, 'opportunity_districts.json'), df)
    range_dict["Opportunity Districts"] = range_values
    avg_dict["Opportunity Districts"] = avg_values
    
    range_values, avg_values = summary_calculation(os.path.join(PREFIX, 'democrat_count.json'), df)
    range_dict["Democrat Districts"] = range_values
    avg_dict["Democrat Districts"] = avg_values
    
    range_values, avg_values = summary_calculation(os.path.join(PREFIX, 'republican_count.json'), df)
    range_dict["Republican Districts"] = range_values
    avg_dict["Republican Districts"] = avg_values
    
    with open(os.path.join(PREFIX, 'cluster_ranges.json'), "w") as file:
        json.dump(range_dict, file, indent = 4)
        
    with open(os.path.join(PREFIX, 'cluster_avg.json'), "w") as file:
        json.dump(avg_dict, file, indent = 4)