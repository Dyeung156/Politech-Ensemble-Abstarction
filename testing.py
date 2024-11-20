import pandas as pd
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()
THRESHOLD = float(os.getenv("THRESHOLD"))

minorities = ["RacialDemographic.HISPA","RacialDemographic.BLACK","RacialDemographic.ASIAN"]

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

#Description: returns a tuple that describes the map through opportunity districts. The tuple format is:
#             (hispanic districts, black districts, asian districts)
#Parameters: df (Object) - dataframe containing the ensemble
#            num_districts (int) - the number of districts in a map
#            row (int) - the first row in df for the map 
#returns: the map tuple that describe the map
def create_map_tuple(df , num_districts : int, row : int):
    district_counts = [0, 0 ,0]
    total_population = df.iloc[row]["RacialDemographic.TOTAL"]
    
    #look at the districts in the map
    for index in range(num_districts):
        #see if it's an opportunity district for any group 
        length = len(minorities)
        for group_index in range(0, length):
            minority_population = df.iloc[row + index][minorities[group_index]] 
            if (minority_population/total_population) >= THRESHOLD: 
                district_counts[group_index] += 1
    
    return tuple(district_counts)

#Description: returns a list of each map and a tuple to describe it
#parameters: file_path (str) - path to the csv file 
#returns: list(tuple) - each tuple is (map number, map tuple)
def opportunity_district_maps(file_path):
    df = pd.read_csv(file_path) 
    maps_info = list()

    row = 0
    cur_map = 0 
    num_districts = get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        #create the map tuple for each map and add it to the list
        maps_info.append( (cur_map, create_map_tuple(df, num_districts, row)) )
        
        #move row to the next map
        row += num_districts
        cur_map+=1
        
    return maps_info
    
if __name__ == "__main__":
    file_path = "output.csv"
    opportunity_maps = opportunity_district_maps(file_path)

    for map in opportunity_maps:
        print(map)
    # for m in minorities:
    #     print(m, len(opportunity_districts[m]))
        
    
