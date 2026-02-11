import pandas as pd
import json
import util

from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()
THRESHOLD = float(os.getenv("THRESHOLD"))

ethnic_groups = ["RacialDemographic.HISPA","RacialDemographic.BLACK", "RacialDemographic.ASIAN"]
# HISPANIC = 0
BLACK = 1
# ASIAN = 2

def black_opportunity_districts(df , num_districts : int, row : int):
    district_counts = 0
    
    #look at the districts in the map
    for index in range(num_districts):
        total_population = df.iloc[row + index]["RacialDemographic.TOTAL"]
        
        #see if it's an opportunity district 
        minority_population = df.iloc[row + index][ethnic_groups[BLACK]] 
        if (minority_population/total_population) >= THRESHOLD: 
            district_counts += 1
    
    return district_counts

def opportunity_districts__dicts(file_path):
    df = pd.read_csv(file_path) 
    black_dict = dict()

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        black_opportunity = black_opportunity_districts(df, num_districts, row)
        
        util.add_to_dict(black_dict, black_opportunity, cur_map)
       
        #move row to the next map
        row += num_districts
        cur_map+=1
        
    return black_dict
    
def make_JSON():
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(script_dir, 'Actual Data', 'output.csv')
    black_dict = opportunity_districts__dicts(file_path)
    
    #upload the dictionary to a JSON file
    json_path = os.path.join(script_dir, 'Actual Data', 'black_opportunity_districts.json')
    with open(json_path, "w") as json_file:
        json.dump(black_dict, json_file, indent=4)

if __name__ == "__main__":
    make_JSON()
        


        
        
        
        