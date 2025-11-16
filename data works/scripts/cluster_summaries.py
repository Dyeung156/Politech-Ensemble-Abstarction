import util 
import pandas as pd
import json
import os

OPP_DISTRICTS = 1
DEMOCRAT_COUNT = 2
MARGINAL_COUNT = 4   
script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PREFIX = os.path.join(script_dir, 'Actual Data')

def update_range(section: int, incoming_value: float, ranges: list[ list[float] ]) -> None:
    old_min: float = ranges[section][0]
    ranges[section][0] = min(incoming_value, old_min)
    
    old_max: float = ranges[section][1]
    ranges[section][1] = max(incoming_value, old_max)

def cluster_summary(index_list: list[int], df: pd.DataFrame):
    # extra [0,0] and 0.0 at the start is to remain consistent with the other script
    # Columns: 0=map_id, 1=opportunity_districts, 2=democrat_count, 3=republican_count, 4=median_margin
    # We read columns 1, 2, and 4 (indices 1, 2, 4)
    # Initialize ranges: [min, max] - use inf/-inf to ensure first value updates both
    value_ranges: list[ list[float] ] = [
        [0, 0],  # placeholder at index 0
        [float('inf'), float('-inf')],  # section 1: opportunity_districts
        [float('inf'), float('-inf')],  # section 2: democrat_count  
        [float('inf'), float('-inf')]   # section 3: median_margin (can be negative)
    ]
    avg_values: list[float] = [0.0, 0.0, 0.0, 0.0]
    columns_to_read = [OPP_DISTRICTS, DEMOCRAT_COUNT, MARGINAL_COUNT]  # [1, 2, 4]
    
    for index in index_list:
        # update range values for each of the 3 columns we care about
        for section_idx, column_idx in enumerate(columns_to_read, start=1):
            # get the map data for the index
            map_data = df.iloc[index, column_idx]
            
            # Keep as float for median_margin, convert to int for counts (but store as float in ranges)
            if column_idx == MARGINAL_COUNT:
                map_data = float(map_data)  # median_margin is a float
            else:
                map_data = float(int(map_data))  # counts are ints, but store as float for consistency
            
            # update values
            update_range(section_idx, map_data, value_ranges)
            avg_values[section_idx] += map_data
    
    divisor = len(index_list)
    for index in range(len(avg_values)):
        if divisor > 0:
            avg_values[index] /= divisor
        avg_values[index] = round(avg_values[index], 2)
            
    return (value_ranges[1::], avg_values[1::])

def summary_calculation(file_name: str, df):
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(script_dir, 'Actual Data', f'{file_name}.json')
    with open(json_path, 'r') as json_file:
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
    
    range_values, avg_values = summary_calculation('opportunity_districts', df)
    range_dict["Opportunity Districts"] = range_values
    avg_dict["Opportunity Districts"] = avg_values
    
    range_values, avg_values = summary_calculation('democrat_count', df)
    range_dict["Democrat Districts"] = range_values
    avg_dict["Democrat Districts"] = avg_values
    
    range_values, avg_values = summary_calculation('median_margin', df)
    range_dict["Median Margins"] = range_values
    avg_dict["Median Margins"] = avg_values
    
    with open(os.path.join(PREFIX, 'cluster_ranges.json'), "w") as file:
        json.dump(range_dict, file, indent = 4)
        
    with open(os.path.join(PREFIX, 'cluster_avg.json'), "w") as file:
        json.dump(avg_dict, file, indent = 4)