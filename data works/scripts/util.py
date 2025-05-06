import pandas as pd
import math

#Description: returns the number of districts in a map 
#parameters: file_path (str) - path to the csv file 
#returns: int - the number of districts in a map
def get_num_districts(file_path) -> int:
    df = pd.read_csv(file_path) 
    
    length = len(df)
    #go thru the dataframe until the district number resets (starts at 1)
    for row_index in range(1, length):
        if df.iloc[row_index]["District"] == 1:
            #the dataframe is 0-indexed so the current row index would suffice
            return row_index   

#Description: logic for adding a value to a dictionary
#parameters: dictionary (dict) - the dictionary to add to
#            key (str) - the key to add the value to
#            value (int) - the value to add to the dictionary
#returns: none
def add_to_dict(dictionary, key, value):
    if key in dictionary:
        dictionary[key].append(value)
    else:
        dictionary[key] = [value]
        
#Description: determine the angle for where the cluster will eventually go in the front end 
#Parameters: section - the section of the map that we are looking at (1-8)
#            is_negative - if the distance is negative or not (True or False)
#Returns: the angle of the cluster in degrees (float)
def get_map_angle(section: int, is_negative: bool):
    section_start = 45 * (section - 1)
    if is_negative:
        section_start += 180
        
    return section_start + 22.5

CENTER = (150, 150)
RADIUS = 175

def anchor_point(section: int, radius_percent: float, total_weight: float) -> tuple: 
    angle = get_map_angle(section, radius_percent < 0.5) 
    angle *= radius_percent / total_weight
    
    xValue = CENTER[0] + RADIUS * radius_percent * math.cos(math.radians(angle))
    yValue = CENTER[1] + RADIUS * radius_percent * math.sin(math.radians(angle))
    
    return (xValue , yValue )

def cluster_anchor_point(section: int, radius_percent: float, total_weight):
    angle = get_map_angle(section, radius_percent < 0.5) 
    
    xValue = CENTER[0] + RADIUS  * math.cos(math.radians(angle))
    yValue = CENTER[1] + RADIUS  * math.sin(math.radians(angle))
    
    weight = radius_percent / total_weight
    return (xValue * weight, yValue * weight )
