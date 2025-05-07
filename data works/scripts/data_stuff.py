import util 
import pandas as pd
from opportunity_districts import black_opportunity_districts
from political_parties import party_district_counts
from population_density import avg_pop_density
import json

OPP_DISTRICTS = 1
AVG_POP_DENSITY = 2
DEMOCRAT_COUNT = 3
REPUBLICAN_COUNT = 4
X = 5
Y = 6

def create_JSON_file(dict_input, file_name):
    #upload the dictionary to a JSON file
    with open(f"data works\Actual Data\{file_name}.json", "w") as json_file:
        json.dump(dict_input, json_file, indent=4)

def map_percentile(map_data, data_range):
    max_map = data_range[1]
    min_map = data_range[0]
    
    resulting_distance = (map_data - min_map) / (max_map - min_map)

    return resulting_distance
    
def make_anchor_points(ranges: list[tuple[int, int]], anchor_names: list[str]):
    results = dict()
    length = len(anchor_names)
    for i in range(length):
        # get the (x, y) points for the anchor points
        anchor_points = dict()
        anchor_points[f"Min: {ranges[i + 1][0]}"] = util.cluster_anchor_point(i + 1, -1.0, -1.0)
        anchor_points[f"Max: {ranges[i + 1][1]}"] = util.cluster_anchor_point(i + 1, 1.0, 1.0)
        # add to results dictionary
        results[anchor_names[i]] = anchor_points
        
    # write to json file
    create_JSON_file(results, "anchor_points")

def map_point(map_data_row, ranges):
    op_radius = map_percentile(map_data_row[OPP_DISTRICTS], ranges[OPP_DISTRICTS])
    avg_pop_radius = map_percentile(map_data_row[AVG_POP_DENSITY] // 100000, ranges[AVG_POP_DENSITY])
    dem_radius = map_percentile(map_data_row[DEMOCRAT_COUNT], ranges[DEMOCRAT_COUNT])
    rep_radius = map_percentile(map_data_row[REPUBLICAN_COUNT], ranges[REPUBLICAN_COUNT])
    
    total_weight = op_radius + avg_pop_radius + dem_radius + rep_radius
    
    op_point = util.anchor_point(OPP_DISTRICTS, op_radius, total_weight)
    avg_pop_point = util.anchor_point(AVG_POP_DENSITY, avg_pop_radius, total_weight)
    dem_point = util.anchor_point(DEMOCRAT_COUNT, dem_radius, total_weight)
    rep_point = util.anchor_point(REPUBLICAN_COUNT, rep_radius, total_weight)
    
    
    avg_xValue = (op_point[0] + avg_pop_point[0] + dem_point[0] + rep_point[0]) / 4
    avg_yValue = (op_point[1] + avg_pop_point[1] + dem_point[1] + rep_point[1]) / 4 
    
    return (round(avg_xValue, 2) , round(avg_yValue, 2))


def cluster_map_point(map_data_row, ranges, section: int):
    op_radius = map_percentile(map_data_row[OPP_DISTRICTS], ranges[OPP_DISTRICTS])
    avg_pop_radius = map_percentile(map_data_row[AVG_POP_DENSITY] // 100000, ranges[AVG_POP_DENSITY])
    dem_radius = map_percentile(map_data_row[DEMOCRAT_COUNT], ranges[DEMOCRAT_COUNT])
    rep_radius = map_percentile(map_data_row[REPUBLICAN_COUNT], ranges[REPUBLICAN_COUNT])
    
    weights = [0, op_radius, avg_pop_radius, dem_radius, rep_radius]
    # double the weight of the section we are looking at
    weights[section] *= 2
    total_weight = sum(weights)
    
    op_point = util.cluster_anchor_point(OPP_DISTRICTS, op_radius * weights[OPP_DISTRICTS], total_weight)
    avg_pop_point = util.cluster_anchor_point(AVG_POP_DENSITY, avg_pop_radius* weights[AVG_POP_DENSITY], total_weight)
    dem_point = util.cluster_anchor_point(DEMOCRAT_COUNT, dem_radius* weights[DEMOCRAT_COUNT], total_weight)
    rep_point = util.cluster_anchor_point(REPUBLICAN_COUNT, rep_radius * weights[REPUBLICAN_COUNT], total_weight)
    
    avg_xValue = (op_point[0] + avg_pop_point[0] + dem_point[0] + rep_point[0]) 
    avg_yValue = (op_point[1] + avg_pop_point[1] + dem_point[1] + rep_point[1]) 
    
    return (round(avg_xValue, 2) , round(avg_yValue, 2))

def cluster_avg_calculation(cluster_dict, map_data, ranges, section: int):
    cluster_measures = dict()
    for cluster, map_indices in cluster_dict.items():
        x_sum = 0
        y_sum = 0
        
        for map_index in map_indices:
            x, y = cluster_map_point(map_data[map_index], ranges, section)
            
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
    opporutunity_districts_dict = dict()
    avg_pop_dict = dict()
    democrat_dict = dict()
    republician_dict = dict()
    
    #go thru each row in the dataframe
    while row < len(df):    
        #get the cluster values for the current map
        opporutunity_districts = black_opportunity_districts(df, num_districts, row)
        avg_pop_den = avg_pop_density(df, num_districts, row)
        democrat_maps, republician_maps = party_district_counts(df, num_districts, row)
        
        #add the values to the dictionaries
        util.add_to_dict(opporutunity_districts_dict, opporutunity_districts, cur_map)
        util.add_to_dict(avg_pop_dict, int(avg_pop_den // 100000), cur_map)
        util.add_to_dict(democrat_dict, democrat_maps, cur_map)
        util.add_to_dict(republician_dict, republician_maps, cur_map)
        
        #add to the entire data to the list 
        data_entry = [cur_map, opporutunity_districts, round(avg_pop_den, 2), democrat_maps, republician_maps]
        map_data.append(data_entry)
        
        #move row to the next map
        row += num_districts
        cur_map += 1
    
    op_range = (min(opporutunity_districts_dict), max(opporutunity_districts_dict))
    avg_pop_range = (min(avg_pop_dict), max(avg_pop_dict))
    dem_range = (min(democrat_dict), max(democrat_dict))
    rep_range = (min(republician_dict), max(republician_dict))
    # the first tuple is added bc for consisitency with the constants 
    ranges = [(0,0), op_range, avg_pop_range, dem_range, rep_range]
    make_anchor_points(ranges, ["Opportunity Districts", "Average Population Density", "Democrat Districts", "Republician Districts"])
    
    for map_row in map_data:
        xValue, yValue = map_point(map_row, ranges)
        map_row.append(xValue)
        map_row.append(yValue)
    
    measures_dict = dict()
    measures_dict["Opportunity Districts"] = cluster_avg_calculation(opporutunity_districts_dict, map_data, ranges, OPP_DISTRICTS)
    measures_dict["Average Population Density"] = cluster_avg_calculation(avg_pop_dict, map_data, ranges, AVG_POP_DENSITY)
    measures_dict["Democrat Districts"] = cluster_avg_calculation(democrat_dict, map_data, ranges, DEMOCRAT_COUNT)
    measures_dict["Republician Districts"] = cluster_avg_calculation(republician_dict, map_data, ranges, REPUBLICAN_COUNT)
    
    map_df = pd.DataFrame(map_data, columns=["map_id", "opportunity_districts", 
                                             "avg_population_density", "democrat_count", "republican_count", 
                                             "X Value", "Y Value"])
    map_df.to_csv("data works\Actual Data\map_data.csv", index = False)
        
    create_JSON_file(opporutunity_districts_dict, "opportunity_districts")
    create_JSON_file(avg_pop_dict, "avg_population_density")
    create_JSON_file(democrat_dict, "democrat_count")
    create_JSON_file(republician_dict, "republican_count")
    create_JSON_file(measures_dict, "cluster_placements")
    
    print("Data collection complete!")
    
if __name__ == "__main__":
    file_path = "data works\Actual Data\output.csv"
    create_collection_data(file_path)
    
    
