import pandas as pd
import json
import util

def avg_pop_density(df , num_districts : int, row : int):
    pop_density = 0 
    
    #look at the districts in the map
    for index in range(num_districts):
        total_population = df.iloc[row + index]["RacialDemographic.TOTAL"]
        area = df.iloc[row + index]["area"]
        pop_density += total_population/area
    
    return pop_density / num_districts

def pop_density_dict(file_path):
    df = pd.read_csv(file_path) 
    density_dict = dict()

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        map_pop_density = avg_pop_density(df, num_districts, row)
        
        util.add_to_dict(density_dict, map_pop_density // 100000, cur_map)
       
        #move row to the next map
        row += num_districts
        cur_map+=1
        
    return density_dict

if __name__ == "__main__":
    file_path = "data works\Actual Data\output.csv"
    density_dict = pop_density_dict(file_path)
    
    #upload the dictionary to a JSON file
    with open("data works\Actual Data\population_density_data.json", "w") as json_file:
        json.dump(density_dict, json_file, indent=4)