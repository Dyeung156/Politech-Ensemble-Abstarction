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
RADIUS = 5
ANGLE = 6


#Description: determine the angle for where the cluster will eventually go in the front end 
#Parameters: section - the section of the map that we are looking at (1-8)
#            is_negative - if the distance is negative or not (True or False)
#Returns: the angle of the cluster in degrees (float)
def get_map_angle(section: int, is_negative: bool):
    section_start = 45 * (section - 1)
    if is_negative:
        section_start += 180
        
    return section_start + 22.5


def map_percentile(map_data, data_dict: dict):
    max_map = max(data_dict)
    min_map = min(data_dict)
    
    resulting_distance = (map_data - min_map) / (max_map - min_map)

    return resulting_distance
    
#Description: determine the placement of the map in the front end visual
#Parameters: map_data_row (List) - the row of data for the map 
#            op_dict - opportunity districts dictionary
#            apd_dict - average population density dictionary
#            dem_dict - democrat dictionary
#            rep_dict - republican dictionary
#Returns: the distance and angle of the map in the front end visual (tuple)
def data_placement(map_data_row, op_dict, apd_dict, dem_dict, rep_dict):
    op_percent = map_percentile(map_data_row[OPP_DISTRICTS], op_dict) 
    pop_percent = map_percentile(int(map_data_row[AVG_POP_DENSITY] // 100000), apd_dict)
    dem_percent = map_percentile(map_data_row[DEMOCRAT_COUNT], dem_dict)
    rep_percent = map_percentile(map_data_row[REPUBLICAN_COUNT], rep_dict)
    
    # will use percentiles as weights for the angle average
    weighted_total = op_percent + pop_percent + dem_percent + rep_percent
    
    op_angle = get_map_angle(OPP_DISTRICTS, op_percent < 0.5) * (op_percent / weighted_total)
    pop_angle = get_map_angle(AVG_POP_DENSITY, pop_percent < 0.5) * (pop_percent / weighted_total)
    dem_angle = get_map_angle(DEMOCRAT_COUNT, dem_percent < 0.5) * (dem_percent / weighted_total)
    rep_angle = get_map_angle(REPUBLICAN_COUNT, rep_percent < 0.5) * (rep_percent / weighted_total)
    
    avg_percent = (op_percent + pop_percent + dem_percent + rep_percent) / 4
    weighted_avg_angle = (op_angle + pop_angle + dem_angle + rep_angle) 
    
    return (round(avg_percent, 2) , round(weighted_avg_angle, 2))
       
def create_JSON_files(op_dict, apd_dict, dem_dict, rep_dict):
    #upload the dictionary to a JSON file
    with open("data works\Actual Data\\black_opportunity_districts.json", "w") as json_file:
        json.dump(op_dict, json_file, indent=4)
        
    #upload the dictionary to a JSON file
    with open("data works\Actual Data\population_density_data.json", "w") as json_file:
        json.dump(apd_dict, json_file, indent=4)
    
    #upload the democrat dictionary to a JSON file 
    with open("data works\Actual Data\democrat_clusters.json", "w") as json_file:
        json.dump(dem_dict, json_file, indent=4)
    
    #upload the republician dictionary to a JSON file 
    with open("data works\Actual Data\\republican_clusters.json", "w") as json_file:
        json.dump(rep_dict, json_file, indent=4)

def cluster_avg_calculation(cluster_dict, map_data):
    cluster_measures = dict()
    for cluster, map_indices in cluster_dict.items():
        radius_sum = 0
        angle_sum = 0
        
        for map_index in map_indices:
            radius_sum += map_data[map_index][RADIUS]
            angle_sum += map_data[map_index][ANGLE]
        
        # store the avg radius and angle for the cluster
        cluster_measures[cluster] = (radius_sum / len(map_indices), angle_sum / len(map_indices))
        
    cluster_dict["Cluster Measures"] = cluster_measures

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
        
    for map_row in map_data:
        radius, angle = data_placement(map_row, opporutunity_districts_dict, avg_pop_dict, democrat_dict, republician_dict)
        map_row.append(radius)
        map_row.append(angle)
        
    cluster_avg_calculation(opporutunity_districts_dict, map_data)
    cluster_avg_calculation(avg_pop_dict, map_data)
    cluster_avg_calculation(democrat_dict, map_data)
    cluster_avg_calculation(republician_dict, map_data)
    
    map_df = pd.DataFrame(map_data, columns=["map_id", "opportunity_districts", 
                                             "avg_population_density", "democrat_count", "republican_count", 
                                             "radius", "angle"])
    map_df.to_csv("data works\Actual Data\map_data.csv", index = False)
        
    create_JSON_files(opporutunity_districts_dict, avg_pop_dict, democrat_dict, republician_dict)
    print("Data collection complete!")
    
if __name__ == "__main__":
    file_path = "data works\Actual Data\output.csv"
    create_collection_data(file_path)
    
    
