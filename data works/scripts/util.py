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
# TODO: can honestly just use defaultdict(list) instead of this function
def add_to_dict(dictionary, key, value):
    if key in dictionary:
        dictionary[key].append(value)
    else:
        dictionary[key] = [value]

NUM_ANCHORS = 3
ANGLE_INCREMENT = 180 / NUM_ANCHORS
#Description: determine the angle for where the section starts
#Parameters: section - the section of the map that we are looking at (0 to NUM_ANCHORS - 1)
#            is_negative - if the distance is negative or not (True or False)
#Returns: the angle of the section start in degrees (float)
def section_angle(section: int, is_negative: bool) -> float:
    section_start: float = ANGLE_INCREMENT * section
    if is_negative:
        section_start += 180
    return section_start

CENTER = (150, 150)
RADIUS = 175

def trait_coordinates(section: int, radius_percent: float, total_weight: float) -> tuple[float, float]: 
    angle = section_angle(section, radius_percent < 0.5) 
    # PS: if the points all cluttered togeteh agian, just revert this back to just angle *= radius_percent / total_weight
    section_end = angle + ANGLE_INCREMENT
    angle += (section_end - angle) * abs(0.5 - (radius_percent / total_weight))
    
    xValue: float = CENTER[0] + RADIUS * radius_percent * math.cos(math.radians(angle))
    yValue: float = CENTER[1] + RADIUS * radius_percent * math.sin(math.radians(angle))
    
    return (xValue , yValue )

#Description: determines the anchor point for a cluster
#Parameters: section - the section of the map that we are looking at (0 to NUM_ANCHORS - 1)
#            radius_percent - the percentage of the radius that the cluster is from the center
#            total_weight - the total weight of the clusters
#Returns: the anchor point for a cluster (tuple[float, float])
def cluster_anchor_point(section: int, radius_percent: float, total_weight) -> tuple[float, float]:
    #add the half of the angle increment to the section start to get the center of the section
    angle = section_angle(section - 1, radius_percent < 0.5) + (ANGLE_INCREMENT / 2)
    
    xValue = CENTER[0] + RADIUS  * math.cos(math.radians(angle))
    yValue = CENTER[1] + RADIUS  * math.sin(math.radians(angle))
    
    weight = radius_percent / total_weight
    return (xValue * weight, yValue * weight )
