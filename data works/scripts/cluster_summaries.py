import util 
import pandas as pd
import json

OPP_DISTRICTS = 1
AVG_POP_DENSITY = 2
DEMOCRAT_COUNT = 3
REPUBLICAN_COUNT = 4

# data works\Actual Data\map_data.csv
PREFIX = "data works\Actual Data"

def update_range(section: int, incoming_value: int, ranges: list[ list[int] ]) -> None:
    old_min: int = ranges[section][0]
    ranges[section][0] = min(incoming_value, old_min)
    
    old_max: int = ranges[section][1]
    ranges[section][1] = max(incoming_value, old_max)

def cluster_summary(index_list: list[int], df: pd.DataFrame):
    # extra [0,0] and 0.0 at the start is to remain consistent with the other script
    value_ranges: list[ list[int] ] = [[0,0], [100,0], [100,0], [100,0], [100,0]]
    avg_values: list[float] = [0.0, 0.0, 0.0, 0.0, 0.0]
    for index in index_list:
        # update range values
        for section in range(1, 5):
            # get the map data for the index
            map_data = df.iloc[index, section]
            
            if section == AVG_POP_DENSITY:
                map_data /= 100000
            
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
    file_name = "data works\Actual Data\map_data.csv"
    df = pd.read_csv(file_name)

    range_dict = dict()
    avg_dict = dict()
    
    range_values, avg_values = summary_calculation(f"{PREFIX}\\opportunity_districts.json", df)
    range_dict["Opportunity Districts"] = range_values
    avg_dict["Opportunity Districts"] = avg_values
    
    range_values, avg_values = summary_calculation(f"{PREFIX}\\avg_population_density.json", df)
    range_dict["Average Population Density"] = range_values
    avg_dict["Average Population Density"] = avg_values
    
    range_values, avg_values = summary_calculation(f"{PREFIX}\democrat_count.json", df)
    range_dict["Democrat Districts"] = range_values
    avg_dict["Democrat Districts"] = avg_values
    
    range_values, avg_values = summary_calculation(f"{PREFIX}\\republican_count.json", df)
    range_dict["Republican Districts"] = range_values
    avg_dict["Republican Districts"] = avg_values
    
    with open("data works\Actual Data\cluster_ranges.json", "w") as file:
        json.dump(range_dict, file, indent = 4)
        
    with open("data works\Actual Data\cluster_avg.json", "w") as file:
        json.dump(avg_dict, file, indent = 4)