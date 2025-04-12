import pandas as pd
import json
import util

def minority_districts(df , num_districts : int, row : int):
    district_counts = 0
    
    #look at the districts in the map
    for index in range(num_districts):
        total_population = df.iloc[row + index]["RacialDemographic.TOTAL"]
        
        #see if it's an minority district 
        white_population = df.iloc[row + index]["RacialDemographic.WHITE"] 
        if (white_population/total_population) <= 0.5: 
            district_counts += 1
    
    return district_counts

#Description: returns a tuple with the dictonaries for each ethnic group percents in the map
#parameters: file_path (str) - path to the csv file 
#returns: tuple (hispanic, black, asian) - dictionaries with the average percents of each group in the map
def group_percent_dicts(file_path):
    df = pd.read_csv(file_path) 
    map_dict = dict()

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        minority_map = minority_districts(df, num_districts, row)
        
        util.add_to_dict(map_dict, minority_map, cur_map)
       
        #move row to the next map
        row += num_districts
        cur_map+=1
        
    return map_dict
    
def make_JSON():
    file_path = "data works/output.csv"
    map_dict= group_percent_dicts(file_path)
    
    #upload the dictionary to a JSON file
    with open("data works/ethnic_group_majority_data.json", "w") as json_file:
        json.dump(map_dict, json_file, indent=4)

        
if __name__ == "__main__":
    make_JSON()
        


        
        
        
        