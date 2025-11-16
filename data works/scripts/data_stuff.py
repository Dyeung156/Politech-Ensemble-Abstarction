import util 
import pandas as pd
import json
import os

from opportunity_districts import black_opportunity_districts
from political_parties import party_district_counts
from partisan_margins import margin_median

OPP_DISTRICTS = 1
DEMOCRAT_COUNT = 2
REPUBLICAN_COUNT = 3
MARGIN_COUNT = 4
X = 5
Y = 6


def create_JSON_file(dict_input, file_name):
    #upload the dictionary to a JSON file
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(script_dir, 'Actual Data', f'{file_name}.json')
    with open(json_path, "w") as json_file:
        json.dump(dict_input, json_file, indent=4)

#Description: calculates the percentile of the data
#Parameters: map_data - the data to calculate the percentile of
#            data_range - the range of the data
#Returns: the percentile of the data (float)
def map_percentile(map_data, data_range) -> float:
    max_map = data_range[1]
    min_map = data_range[0]
    
    resulting_distance = (map_data - min_map) / (max_map - min_map)
    
    # Clamp to [0, 1] to ensure valid percentile
    return max(0.0, min(1.0, resulting_distance))

#Description: creates the anchor points for the map and writes them to a JSON file
#Parameters: ranges - the ranges of the data
#            anchor_names - the names of the anchors
#Returns: none
def make_anchor_points(ranges: list[tuple[int, int]], anchor_names: list[str]):
    results = dict()
    length = len(anchor_names)
    for i in range(length):
        # get the (x, y) points for the anchor points
        anchor_points = dict()
        anchor_points[f"Min: {ranges[i + 1][0]}"] = util.cluster_anchor_point(i, -1.0, -1.0)
        anchor_points[f"Max: {ranges[i + 1][1]}"] = util.cluster_anchor_point(i, 1.0, 1.0)
        # add to results dictionary
        results[anchor_names[i]] = anchor_points
        
    # write to json file
    create_JSON_file(results, "anchor_points")

#Description: calculates the coordinates for a map 
#Parameters: map_data_row - the row of the map data
#            ranges - the ranges of the data
#Returns: the coordinates for the map (tuple[float, float])
def map_coordinates(map_data_row, ranges) -> tuple[float, float]:
    op_radius = map_percentile(map_data_row[OPP_DISTRICTS], ranges[OPP_DISTRICTS])
    dem_radius = map_percentile(map_data_row[DEMOCRAT_COUNT], ranges[DEMOCRAT_COUNT])
    margin_radius = map_percentile(map_data_row[MARGIN_COUNT], ranges[3])
    
    total_weight = op_radius + dem_radius + margin_radius
    
    # need the subtractions since the section input is 0 based and the constants are 1 based
    op_point: tuple[float, float] = util.trait_coordinates(OPP_DISTRICTS - 1, op_radius, total_weight)
    dem_point: tuple[float, float] = util.trait_coordinates(DEMOCRAT_COUNT - 1, dem_radius, total_weight)
    margin_point: tuple[float, float] = util.trait_coordinates(MARGIN_COUNT - 2, margin_radius, total_weight)
    
    avg_xValue: float = (op_point[0] + dem_point[0] + margin_point[0]) / 3
    avg_yValue: float = (op_point[1] + dem_point[1] + margin_point[1]) / 3 
    
    return (round(avg_xValue, 2) , round(avg_yValue, 2))

def cluster_map_point(map_data_row, ranges, trait: int):
    op_radius = map_percentile(map_data_row[OPP_DISTRICTS], ranges[OPP_DISTRICTS])
    dem_radius = map_percentile(map_data_row[DEMOCRAT_COUNT], ranges[DEMOCRAT_COUNT])
    margin_radius = map_percentile(map_data_row[MARGIN_COUNT], ranges[3])
    
    weights = [0, op_radius, dem_radius, margin_radius]
    # double the weight of the section we are looking at
    weights[trait] *= 2
    total_weight = sum(weights)
    
    #TODO: if this looks werid, try using the trait coordinates function instead
    # need the subtractions since the section input is 0 based and the constants are 1 based
    op_point = util.cluster_anchor_point(OPP_DISTRICTS - 1, op_radius * weights[OPP_DISTRICTS], total_weight)
    dem_point = util.cluster_anchor_point(DEMOCRAT_COUNT - 1, dem_radius* weights[DEMOCRAT_COUNT], total_weight)
    margin_point = util.cluster_anchor_point(2, margin_radius * weights[3], total_weight)
    
    avg_xValue = (op_point[0] + dem_point[0] + margin_point[0]) / 3
    avg_yValue = (op_point[1] + dem_point[1] + margin_point[1]) / 3
    
    return (round(avg_xValue, 2) , round(avg_yValue, 2))

#Description: calculates the coordinates for clusters for a given trait
#Parameters: cluster_dict - the dictionary of the clusters for the trait
#            map_data - a list holding all the map data
#            ranges - the ranges of the data
#            trait - the trait of the cluster
#Returns: the coordinates for the cluster (tuple[float, float])
def cluster_trait_coordinates(cluster_dict, map_data, ranges, trait: int) -> dict[str, tuple[float, float]]:
    cluster_measures = dict()
    for cluster, map_indices in cluster_dict.items():
        x_sum = 0
        y_sum = 0
        
        for map_index in map_indices:
            x, y = cluster_map_point(map_data[map_index], ranges, trait)
            
            x_sum += x
            y_sum += y
        
        # store the avg X and Y values for the cluster
        cluster_measures[cluster] = (x_sum / len(map_indices), y_sum / len(map_indices))
    
    return cluster_measures

def create_collection_data(file_path):
    df = pd.read_csv(file_path) 

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    map_data = []
    opporutunity_districts_dict: dict[int, int] = dict()
    democrat_dict: dict[int, int] = dict()
    republician_dict: dict[int, int] = dict()
    margin_dict: dict[float, int] = dict()
    
    #go thru each row in the dataframe and update the dictionaries
    while row < len(df):    
        #get the cluster values for the current map
        opporutunity_districts = black_opportunity_districts(df, num_districts, row)
        democrat_maps, republician_maps = party_district_counts(df, num_districts, row)
        median_margin = margin_median(df, num_districts, row)

        #add the values to the dictionaries
        util.add_to_dict(opporutunity_districts_dict, opporutunity_districts, cur_map)
        util.add_to_dict(democrat_dict, democrat_maps, cur_map)
        util.add_to_dict(republician_dict, republician_maps, cur_map)
        util.add_to_dict(margin_dict, median_margin, cur_map)
        
        #add to the entire data to the list 
        data_entry = [cur_map, opporutunity_districts, democrat_maps, republician_maps, median_margin]
        map_data.append(data_entry)
        
        #move row to the next map
        row += num_districts
        cur_map += 1
    
    op_range = (min(opporutunity_districts_dict), max(opporutunity_districts_dict))
    dem_range = (min(democrat_dict), max(democrat_dict))
    margin_range = (min(margin_dict), max(margin_dict))
    # the empty tuples added for consisitency with the map data csv format
    ranges = [(0,0), op_range, dem_range, margin_range]
    make_anchor_points(ranges, ["Opportunity Districts", "Democratic - Republican Districts", "Median Margins"])
    
    # calculate (x, y) for each map 
    for map_row in map_data:
        xValue, yValue = map_coordinates(map_row, ranges)
        map_row.append(xValue)
        map_row.append(yValue)
    
    # calculate the average (x, y) for each cluster coordinates
    measures_dict = dict()
    measures_dict["Opportunity Districts"] = cluster_trait_coordinates(opporutunity_districts_dict, map_data, ranges, OPP_DISTRICTS)
    measures_dict["Democrat Districts"] = cluster_trait_coordinates(democrat_dict, map_data, ranges, DEMOCRAT_COUNT)
    measures_dict["Median Margins"] = cluster_trait_coordinates(margin_dict, map_data, ranges, 3)
    
    map_df = pd.DataFrame(map_data, columns=["map_id", "opportunity_districts", 
                                             "democrat_count", "republican_count", "median_margin", 
                                             "X Value", "Y Value"])
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    csv_path = os.path.join(script_dir, 'Actual Data', 'map_data.csv')
    map_df.to_csv(csv_path, index = False)
        
    create_JSON_file(opporutunity_districts_dict, "opportunity_districts")
    create_JSON_file(democrat_dict, "democrat_count")
    create_JSON_file(republician_dict, "republican_count")
    create_JSON_file(margin_dict, "median_margin")
    create_JSON_file(measures_dict, "cluster_placements")
    
    print("Data collection complete!")
    
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(script_dir, 'Actual Data', 'output.csv')
    create_collection_data(file_path)
    
    
