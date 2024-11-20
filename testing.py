import pandas as pd
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()
THRESHOLD = float(os.getenv("THRESHOLD"))

#dictionary to hold map indices 
map_indices = dict()

#Description: returns the number of districts in a map 
#parameters: file_path (str) - path to the csv file 
#returns: int - the number of districts in a map
def get_num_districts(file_path):
    df = pd.read_csv(file_path) 
    
    length = len(df)
    #go thru the dataframe until the district number resets (starts at 1)
    for row_index in range(1, length):
        if df.iloc[row_index]["District"] == 1:
            #the dataframe is 0-indexed so the current row index would suffice
            return row_index
        
#Description: returns a set of maps for each minority group that contains an opportunity district for that minority group
#parameters: file_path (str) - path to the csv file 
#returns: dict - keys (minority groups), value (maps with opporuntiy districts with that minority group)
def opportunity_district_maps(file_path):
    df = pd.read_csv(file_path) 
    indexes = dict() 
    minorities = ["RacialDemographic.HISPA","RacialDemographic.BLACK","RacialDemographic.ASIAN"]
    # intiailize the dictionary 
    for m in minorities:
        indexes[m] = set() 

    row = 0
    cur_map = 0 
    num_districts = get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        #look at every district in the map 
        for _ in range(num_districts):
            total_population = df.iloc[row]["RacialDemographic.TOTAL"]
            
            #check for each ethnic group for possible opportunity district
            for m in minorities: 
                minority_population = df.iloc[row][m] 
                if (minority_population/total_population) >= THRESHOLD: 
                    indexes[m].add(cur_map) 
                    
            row+=1
        cur_map+=1
    return indexes
    
if __name__ == "__main__":
    file_path = "output.csv"
    opportunity_districts = opportunity_district_maps(file_path)

    minorities = ["RacialDemographic.HISPA","RacialDemographic.BLACK","RacialDemographic.ASIAN"]

    for m in minorities:
        print(m, len(opportunity_districts[m]))
        
    
